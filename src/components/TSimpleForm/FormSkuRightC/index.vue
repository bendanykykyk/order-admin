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
    <!-- eslint-disable-next-line vue/no-parsing-error -->
    <el-button @click="handleAddBtnClick">添加权益</el-button>

    <t-table-list
      v-if="value.length > 0"
      style="margin-top:20px"
      :table-data="value"
      :table-columns="tableColumns"
      :table-op-columns="tableOpColumns"
    >
      <template v-slot:icon="data">
        <el-image
          style="width:100px;height:60px"
          fit="fit"
          :src="data.scope.row.icon"
        />
      </template>
    </t-table-list>

    <el-dialog
      :title="type === 'add' ? '新增' : '编辑'"
      :visible.sync="itemDialogShow"
    >
      <t-simple-form
        ref="form"
        :form-data="formData"
        :field-list="fieldList"
        :operator-list="operatorList"
        :rules="rules"
      />
    </el-dialog>
  </div>
</template>
<script>
import TSimpleForm from '@/components/FormView'
import TTableList from '@/components/TTableList'
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
      itemDialogShow: false,
      tableData: [],
      tableColumns: [
        {
          dataIndex: 'rightProductId',
          label: '权益产品编号'
        },

        {
          dataIndex: 'quantity',
          label: '数量'
        },
        {
          dataIndex: 'type',
          label: '类型',
          render: row => {
            const text = {
              2: '禅修禅旅',
              3: '福碑刻名',
              4: '祈福普佛',
              5: '尊享权益',
              6: '实物商品',
              7: '惠明禅茶'
            }[row.type]
            return text
          }
        },
        {
          dataIndex: 'timeLimit',
          label: '时间'
        }
      ],
      tableOpColumns: [
        {
          label: '操作列',
          dataIndex: 'a1',
          props: {
            // sortable: true
            width: '200',
            fixed: 'right'
          },
          btnGroup: [
            {
              label: '编辑',
              type: 'primary',
              icon: 'el-icon-edit',
              onClick: ({ index, row }) => {
                this.type = 'edit'
                this.formData = row
                this.itemDialogShow = true
              }
            },
            {
              type: 'danger',
              icon: 'el-icon-delete',
              label: '删除',
              onClick: ({ index, row }) => {
                const value = this.getValue()
                // value.push({ ...this.formData })
                value.splice(index, 1)
                this.$emit('change', value)
              }
            }
          ]
        }
      ],

      formData: {
        productId: '',
        quantity: '',
        type: '',
        originalPrice: '',
        stock: ''
      }, // 表单提交的数据
      fieldList: [
        {
          type: 'input',
          label: '权益产品编号',
          props: {
            clearable: true
          },
          key: 'rightProductId'
        },

        {
          type: 'input',
          label: '数量',
          props: {
            clearable: true
          },
          key: 'quantity'
        },
        {
          type: 'select',
          label: '类型',
          typeData: () => {
            return [
              { value: 2, label: '禅修禅旅' },
              { value: 3, label: '福碑刻名' },
              { value: 4, label: '祈福普佛' },
              { value: 5, label: '尊享权益' },
              { value: 6, label: '实物商品' },
              { value: 7, label: '惠明禅茶' }
            ]
          },
          props: {
            clearable: true
          },
          key: 'type'
        },
        {
          type: 'dateTimePicker',
          label: '时间',

          props: {
            type: 'year',
            'value-format': 'yyyy',
            clearable: true
          },
          key: 'timeLimit'
        }
      ],
      operatorList: [
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
      rules: {
        rightProductId: [
          { required: true, message: '请输入编号', trigger: 'change' }
        ],
        quantity: [
          { required: true, message: '请输入数量', trigger: 'change' }
        ],
        timeLimit: [
          { required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [{ required: true, message: '请输入类型', trigger: 'change' }]
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
    }
  },
  watch: {
    // itemDisplayShow: function(newVal, oldVal) {
    //   if (this.type === 'add' && newVal) {
    //     this.resetFields()
    //   }
    // }
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
      this.formData = this.$options.data.call(this).formData
      // this.formData = this.$options.data.call(this)
      this.itemDialogShow = true
    },
    submitForm() {
      this.formComp.validate(valid => {
        if (!valid) return
        const value = this.getValue()

        if (this.type === 'add') {
          value.push({ ...this.formData })
          this.resetFields()
        }

        this.$emit('change', value)
        this.itemDialogShow = false
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
    }
    // onInput(e) {
    //   this.$emit('input', e)
    // }
  }
}
</script>
<style lang="less" scoped></style>
