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
    {{ value }}
    <el-dialog title="新增" :visible.sync="itemDialogShow">
      <slot name="dialogContent" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'FormSkuC',
  components: {},
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
      itemDialogShow: false,
      formData: {}, // 表单提交的数据
      fieldList: [
        {
          type: 'input',
          label: '摘要',
          props: {
            clearable: true
          },
          key: 'summary'
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
        tenantId: [{ required: true, message: '请选择寺院', trigger: 'change' }]
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
    }
  },
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    handleAddBtnClick() {
      this.itemDialogShow = true
    },
    onInput(e) {
      this.$emit('input', e)
    }
  }
}
</script>
<style lang="less" scoped></style>
