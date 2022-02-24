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
  name: 'FormSkuCC',
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
            width: '200',
            fixed: 'right'
          },
          btnGroup: [
            {
              label: '编辑',
              type: 'primary',
              icon: 'el-icon-edit',
              onClick: ({ $index, row }) => {
                this.type = 'edit'
                this.formData = row
                this.itemDialogShow = true
              }
            },
            {
              type: 'danger',
              icon: 'el-icon-delete',
              label: '删除',
              onClick: ({ $index, row }) => {
                const value = this.getValue()
                // value.push({ ...this.formData })
                value.splice($index, 1)
                this.$emit('change', value)
              }
            }
          ]
        }
      ],

      formData: {
        attribute: '',
        currentPrice: '',
        icon: '',
        originalPrice: '',
        stock: ''
      }, // 表单提交的数据
      fieldList: [
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
        attribute: [
          { required: true, message: '请输入规格属性', trigger: 'change' }
        ],
        icon: [{ required: true, message: ' ', trigger: 'change' }],
        currentPrice: [
          { required: true, message: '请输入价格', trigger: 'change' }
        ],
        originalPrice: [
          { required: true, message: '请输入市场价', trigger: 'change' }
        ],
        stock: [{ required: true, message: '请输入库存', trigger: 'change' }]
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
