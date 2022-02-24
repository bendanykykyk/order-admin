<template>
  <div class="form-input">
    <el-input
      :value="value"
      :placeholder="placeholderComp"
      :disabled="isDisabled(item)"
      v-bind="$attrs"
      @input="onInput"
    />
  </div>
</template>
<script>
export default {
  name: 'FormInput',
  components: {},
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    value: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {}
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
    onInput(e) {
      this.$emit('input', e)
    }
  }
}
</script>
<style lang="less" scoped></style>
