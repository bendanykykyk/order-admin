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
      >
      <template v-slot:icon="data">
        <el-image
          v-if="data.scope.row.icon"
          style="width:100px;height:60px"
          fit="fit"
          :src="data.scope.row.icon"
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
// import { checkInterNum, checkUrl } from '@/utils/validate'
export default {
  name: 'FormSkuC',
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
      firstItemDialogShow: false,
      secondItemDialogShow: false,
      tableOpts: {
        props: {
          // eslint-disable-next-line vue/no-parsing-error
          'row-key': 'skuId', // skuId是作为每行的唯一标识，自己定
          'tree-props': { children: 'children', hasChildren: 'hasChildren' } // 这里的children看接口数据怎么定
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
          dataIndex: 'attribute',
          label: '属性'
        },
        {
          dataIndex: 'icon',
          label: '图标',
          slotName: 'icon'
        },
        {
          dataIndex: 'originalPrice',
          label: '市场价'
        },
        {
          dataIndex: 'number',
          label: '数量'
        },
        {
          dataIndex: 'currentPrice',
          label: '价格'
        },
        {
          dataIndex: 'stock',
          label: '库存'
        }
      ],
      tableOpColumns: [
        {
          label: '操作列',
          dataIndex: 'a1',
          props: {
            // sortable: true
            width: '280',
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
                return scope.row.level === 1
              }
            },
            {
              label: '编辑',
              type: 'primary',
              icon: 'el-icon-edit',
              onClick: ({ index, row }) => {
                this.type = 'edit'

                if (row.level === 1) {
                  // this.formData = row
                  this.currentSkuObj = { ...row }
                  this.firstFormData = { ...row }
                  this.firstItemDialogShow = true
                } else if (row.level === 2) {
                  // this.formData = row
                  this.secondFormData = { ...row }
                  this.secondItemDialogShow = true
                }
              }
              // display: scope => {
              //   return scope.row.level === 2
              // }
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
                  value.splice($index, 1)
                  this.$emit('change', value)
                } else {
                  // 如果是二级规格

                  // 找到父的index
                  const parentIndex = value.findIndex(firstItem => {
                    return firstItem['children'].filter(secondItem => {
                      return secondItem.skuId === row.skuId
                    })[0]
                  })

                  // 找到父规格对象
                  // const parentObj = value.filter(firstItem => {
                  //   return firstItem['children'].filter(secondItem => {
                  //     return secondItem.skuId === row.skuId
                  //   })[0]
                  // })[0]

                  // 找到该行在对应父规格下的index
                  console.log(value[parentIndex].children)
                  const childrenIndex = value[parentIndex].children.findIndex(
                    item => {
                      return item.skuId === row.skuId
                    }
                  )
                  console.log(childrenIndex)

                  // 对value进行处理，删除

                  value[parentIndex].children.splice(childrenIndex, 1)
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
        attribute: '',
        currentPrice: '',
        icon: '',
        originalPrice: '',
        stock: '',
        children: []
      },
      // 表单提交的数据
      firstFieldList: [
        {
          type: 'input',
          label: '属性',
          props: {
            clearable: true
          },
          key: 'attribute'
        },
        {
          type: 'uploadSinglePicture',
          label: '图片',
          props: {
            // clearable: true
          },
          key: 'icon'
        },
        {
          type: 'input',
          label: '价格',
          props: {
            clearable: true
          },
          key: 'currentPrice'
        },
        {
          type: 'input',
          label: '市场价',
          props: {
            clearable: true
          },
          key: 'originalPrice'
        },
        {
          type: 'input',
          label: '库存',
          props: {
            clearable: true
          },
          key: 'stock'
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
        number: '',
        level: 2,
        attribute: '',
        currentPrice: '',
        icon: '',
        originalPrice: '',
        stock: ''
      },
      secondFieldList: [
        {
          type: 'input',
          label: '属性',
          props: {
            clearable: true
          },
          key: 'attribute'
        },
        {
          type: 'uploadSinglePicture',
          label: '图片',
          props: {
            // clearable: true
          },
          key: 'icon'
        },
        {
          type: 'input',
          label: '价格',
          props: {
            clearable: true
          },
          key: 'currentPrice'
        },
        {
          type: 'input',
          label: '市场价',
          props: {
            clearable: true
          },
          key: 'originalPrice'
        },
        {
          type: 'input',
          label: '数量',
          props: {
            clearable: true
          },
          key: 'number'
        },
        {
          type: 'input',
          label: '库存',
          props: {
            clearable: true
          },
          key: 'stock'
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
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
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
        } else if (this.type === 'edit') {
          const parentIndex = value.findIndex(firstItem => {
            return firstItem.skuId === this.currentSkuObj.skuId
          })

          // value[parentIndex] = { ...this.firstFormData }
          this.$set(value, parentIndex, this.firstFormData)
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
          value[parentIndex].children.push({
            ...this.secondFormData,
            skuId: parseInt(Math.random() * 800000)
          })
        } else {
          // 找到子的index

          const childrenIndex = value[parentIndex].children.findIndex(item => {
            return item.skuId === this.secondFormData.skuId
          })
          // value[parentIndex].children[childrenIndex] = {
          //   ...this.secondFormData
          // }
          this.$set(value[parentIndex].children, childrenIndex, {
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
