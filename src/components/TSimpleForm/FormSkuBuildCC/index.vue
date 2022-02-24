<template>
  <div class="form-input">
    <!-- <el-input
      :value="value"
      :placeholder="placeholderComp"
      :disabled="isDisabled(item)"
      v-bind="$attrs"
      v-on="$listeners"
      @input="onInput"
    /> -->
    <el-button @click="handleAddBtnClick">添加规格</el-button>

    <t-table-list
      v-if="value.length > 0"
      style="margin-top:20px"
      :table-opts="tableOpts"
      :table-data="value"
      :table-columns="tableColumns"
      :table-op-columns="tableOpColumns"
    >
      <template v-slot:smallImg="data">
        <el-image
          v-if="data.scope.row.smallImg"
          style="width:100px;height:60px"
          fit="fit"
          :src="data.scope.row.smallImg"
        />
      </template>
      <template v-slot:largeImg="data">
        <el-image
          v-if="data.scope.row.largeImg"
          style="width:100px;height:60px"
          fit="fit"
          :src="data.scope.row.largeImg"
        />
      </template>
    </t-table-list>
    <!-- eslint-disable-next-line vue/no-parsing-error -->
    <!-- 一级规格弹出 -->
    <el-dialog title="一级规格" :visible.sync="firstItemDialogShow">
      <t-simple-form
        ref="form"
        :form-data="firstFormData"
        :field-list="firstFieldList"
        :operator-list="firstOperatorList"
        :rules="firstRules"
        v-on="$listeners"
      />
    </el-dialog>
    <!-- eslint-disable-next-line vue/no-parsing-error -->
    <!-- 二级规格弹出 -->
    <el-dialog title="二级规格" :visible.sync="secondItemDialogShow">
      <t-simple-form
        ref="form2"
        :form-data="secondFormData"
        :field-list="secondFieldList"
        :operator-list="secondOperatorList"
        :rules="secondRules"
      />
    </el-dialog>
  </div>
</template>
<script>
import TSimpleForm from '@/components/FormView'
import TTableList from '@/components/TTableList'

import CardSku from '@/network/cardSku'
// import { checkInterNum, checkUrl } from '@/utils/validate'
export default {
  name: 'FormBuildSkuC',
  components: {
    TSimpleForm,
    TTableList
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    value: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      type: 'add',
      ajaxCardSkuList: [],

      firstItemDialogShow: false,
      secondItemDialogShow: false,
      tableOpts: {
        props: {
          // eslint-disable-next-line vue/no-parsing-error
          'row-key': 'skuId', // skuId是作为每行的唯一标识，自己定
          'tree-props': {
            children: 'buildCategorySkuList',
            hasChildren: 'hasChildren'
          } // 这里的children看接口数据怎么定
        },
        events: {
          'expand-change': row => {
            this.currentSkuObj = row
          }
        }
      },
      tableData: [],
      tableColumns: [
        {
          dataIndex: 'largeImg',
          label: '封面图',
          props: {
            width: 150
          },
          slotName: 'largeImg'
        },
        {
          dataIndex: 'smallImg',
          label: '内部小图',
          slotName: 'smallImg'
        },
        {
          dataIndex: 'title',
          label: '标题'
        },
        {
          dataIndex: 'type',
          label: '类型',
          render: row => {
            const text = {
              1: '有规格有随机金额无数量',
              2: '无随机金额，有规格，有数量',
              3: '无规格有数量'
            }[row.type]
            return text
          }
        },
        {
          dataIndex: 'servicePhone',
          label: '客服电话'
        },

        {
          dataIndex: 'amount',
          label: '金额'
        }
      ],
      tableOpColumns: [
        {
          label: '操作列',
          dataIndex: 'a1',
          props: {
            // sortable: true
            width: '240',
            fixed: 'right'
          },
          btnGroup: [
            {
              label: '新增子项',
              type: 'primary',
              icon: 'el-icon-plus',
              onClick: ({ $index, row }) => {
                this.type = 'add'
                // this.firstFormData = row
                this.secondItemDialogShow = true

                this.currentSkuIndex = $index
                this.currentSkuObj = { ...row }
              },

              display: scope => {
                return scope.row.level === 1 && scope.row.type !== 3
              }
            },
            {
              label: '编辑',
              type: 'primary',
              icon: 'el-icon-edit',
              onClick: ({ index, row }) => {
                this.type = 'edit'
                // this.formData = row
                this.secondFormData = { ...row }
                this.secondItemDialogShow = true
              },
              display: scope => {
                return scope.row.level === 2
              }
            },
            {
              type: 'danger',
              icon: 'el-icon-delete',
              label: '删除',
              onClick: ({ $index, row }) => {
                // 首先要找到父的index，value:[{skuId:'123',children:[]},{skuId:'123',children:[]}]
                const value = this.getValue()
                console.log(row)
                // 如果是一级规格
                if (row.level === 1) {
                  const parentIndex = value.findIndex(firstItem => {
                    return firstItem.skuId === row.skuId
                  })
                  // console.log(parentIndex);
                  value.splice(parentIndex, 1)
                  this.$emit('change', value)
                } else {
                  // 如果是二级规格

                  // 找到父的index
                  const parentIndex = value.findIndex(firstItem => {
                    return firstItem['buildCategorySkuList'].filter(
                      secondItem => {
                        return secondItem.skuId === row.skuId
                      }
                    )[0]
                  })

                  // 找到父规格对象
                  // const parentObj = value.filter(firstItem => {
                  //   return firstItem['children'].filter(secondItem => {
                  //     return secondItem.skuId === row.skuId
                  //   })[0]
                  // })[0]

                  // 找到该行在对应父规格下的index
                  console.log(value[parentIndex].buildCategorySkuList)
                  const childrenIndex = value[
                    parentIndex
                  ].buildCategorySkuList.findIndex(item => {
                    return item.skuId === row.skuId
                  })
                  console.log(childrenIndex)

                  // 对value进行处理，删除

                  value[parentIndex].buildCategorySkuList.splice(
                    childrenIndex,
                    1
                  )
                  // value[parentIndex].children.splice($index, 1)

                  this.$emit('change', value)
                }
              }
            }
          ]
        }
      ],

      firstFormData: {
        skuId: '', // 这个是唯一标识 ，必须有，要不然用不了el-table
        level: 1, // 1是父，2是子
        // 业务属性
        largeImg: '', //
        smallImg: '', // 价格
        title: '', // 库存
        unit: '',
        servicePhone: '',
        type: 1,
        amount: '',
        stock: '',
        status: 0,
        // icon: "",

        buildCategorySkuList: []
      },
      // 表单提交的数据
      firstFieldList: [
        {
          type: 'uploadSinglePicture',
          label: '封面',
          props: {
            // clearable: true
          },
          key: 'largeImg'
        },
        {
          type: 'uploadSinglePicture',
          label: '内部图片',
          props: {
            // clearable: true
          },
          key: 'smallImg'
        },

        {
          type: 'input',
          label: '标题',
          props: {
            clearable: true
          },
          key: 'title'
        },
        {
          type: 'input',
          label: '单位',
          props: {
            clearable: true
          },
          key: 'unit'
        },

        {
          type: 'input',
          label: '客服电话',
          props: {
            clearable: true
          },
          key: 'servicePhone'
        },
        {
          type: 'select',
          label: '类型',
          key: 'type',
          props: {
            clearable: true
          },
          typeData: () => {
            return [
              { value: 1, label: '有规格有随机金额无数量' },
              { value: 2, label: '无随机金额，有规格，有数量' },
              { value: 3, label: '无规格有数量' }
            ]
          }
        },
        {
          type: 'input',
          label: '金额',
          props: {
            clearable: true
          },
          key: 'amount',
          display: () => {
            return this.firstFormData.type === 3
          }
        },
        {
          type: 'input',
          label: '库存',
          props: {
            clearable: true
          },
          key: 'stock',
          display: () => {
            return this.firstFormData.type === 3
          }
        },
        //   {
        //   type: "select",
        //   label: "商品类型",
        //   typeData: () => {
        //     return [
        //       { value: 10, label: "无" },
        //       { value: 20, label: "实物" },
        //       { value: 30, label: "牌位" }
        //     ];
        //   },
        //   props: {
        //     clearable: true
        //   },
        //   key: "normType"
        // },
        {
          type: 'select',
          label: '状态',
          key: 'status',
          props: {
            clearable: true
          },
          typeData: () => {
            return [
              { value: 0, label: '开启' },
              { value: 1, label: '关闭' }
            ]
          }
        }
      ],
      firstOperatorList: [
        // {
        //   type: '',
        //   label: '返 回',
        //   func: () => {
        //     this.$router.back()
        //   }
        // },
        {
          type: 'primary',
          label: '提 交',
          func: this.submitForm
        }
      ],
      firstRules: {},

      currentSkuIndex: '',
      currentSkuObj: {},
      // 二级菜单
      secondFormData: {
        skuId: '',

        level: 2,
        // 业务属性
        amount: ''
      },
      secondFieldList: [
        // {
        //   type: "uploadSinglePicture",
        //   label: "图片",
        //   props: {
        //     // clearable: true
        //   },
        //   key: "icon"
        // },

        {
          type: 'input',
          label: '金额',
          props: {
            clearable: true
          },
          key: 'amount'
        }
      ],
      secondOperatorList: [
        {
          type: 'primary',
          label: '提 交',
          func: this.submitForm2
        }
      ],
      secondRules: {
        // number: [{ required: true, validator: checkUrl, trigger: 'blur' }]
        // number: [{ required: true, type: 'email', trigger: 'blur' }]
      }
    }
  },
  computed: {
    placeholderComp() {
      return this.item.props.placeholder
        ? this.item.props.placeholder
        : `请输入${this.item.label}`
    },
    isDisabled() {
      return item => {
        if (typeof item.disabled === 'boolean') {
          return item.disabled
        } else if (typeof item.disabled === 'function') {
          // console.log('111')

          return Boolean(item.disabled())
        } else {
          return false
        }
      }
    },
    formComp() {
      return this.$refs['form'].$refs['form']
    },
    formComp2() {
      return this.$refs['form2'].$refs['form']
    }
  },
  watch: {
    // itemDisplayShow: function(newVal, oldVal) {
    //   if (this.type === 'add' && newVal) {
    //     this.resetFields()
    //   }
    // }
    secondItemDialogShow: function(newVal, oldVal) {
      if (newVal === false) {
        this.$nextTick(() => {
          this.resetFields2()
        })
      }
    }
  },
  created() {
    this.queryCardSku()
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    handleExpend(row, status) {
      this.currentSkuObj = row
    },
    queryCardSku() {
      CardSku.queryList({ page: 0, pageSize: 0 }).then(res => {
        this.ajaxCardSkuList = res.data.list.map(x => {
          return { value: x.id, label: x.type }
        })
      })
    },
    getValue() {
      return this.value
    },
    handleAddBtnClick() {
      this.type = 'add'
      // console.log(this)
      // console.log()
      this.firstFormData = this.$options.data.call(this).firstFormData
      // this.firstFormData = this.$options.data.call(this)
      this.firstItemDialogShow = true
    },
    // 一级规格表单
    submitForm() {
      this.formComp.validate(valid => {
        if (!valid) return
        const value = this.getValue()

        if (this.type === 'add') {
          value.push({
            ...this.firstFormData,
            skuId: parseInt(Math.random() * 800000)
          })
          this.resetFields()
        }

        this.$emit('change', value)
        this.firstItemDialogShow = false
      })
    },
    // 二级规格表单
    submitForm2() {
      this.formComp2.validate(valid => {
        if (!valid) return

        const value = this.getValue()

        // 找到父的index
        const parentIndex = value.findIndex(firstItem => {
          return firstItem.skuId === this.currentSkuObj.skuId
        })
        if (this.type === 'add') {
          // 给对应父的对象的children里面添加值
          value[parentIndex].buildCategorySkuList.push({
            ...this.secondFormData,
            skuId: parseInt(Math.random() * 800000)
          })
        } else {
          // 找到子的index
          console.log('编辑')
          console.log(parentIndex)
          console.log(value[parentIndex].buildCategorySkuList)

          const childrenIndex = value[
            parentIndex
          ].buildCategorySkuList.findIndex(item => {
            return item.skuId === this.secondFormData.skuId
          })
          // value[parentIndex].children[childrenIndex] = {
          //   ...this.secondFormData
          // }
          this.$set(value[parentIndex].buildCategorySkuList, childrenIndex, {
            ...this.secondFormData
          })
        }

        this.$emit('change', value)
        this.secondItemDialogShow = false
        this.resetFields2()
      })
    },
    deleteData() {},
    // 重置表单
    resetFields() {
      return this.formComp.resetFields()
    },
    // 清空校验
    clearValidate() {
      return this.formComp.clearValidate()
    },
    // 重置表单
    resetFields2() {
      return this.formComp2.resetFields()
    },
    // 清空校验
    clearValidate2() {
      return this.formComp2.clearValidate()
    }
    // onInput(e) {
    //   this.$emit('input', e)
    // }
  }
}
</script>
<style lang="less" scoped></style>
