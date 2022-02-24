<template>
  <div class="form-switch">
    <!-- <el-input
      :value="value"
      :placeholder="placeholderComp"
      :disabled="isDisabled(item)"
      v-bind="$attrs"
      v-on="$listeners"
      @input="onInput"
    /> -->
    <el-switch
      :value="value"
      :disabled="isDisabled(item)"
      v-bind="$attrs"
      active-color="#13ce66"
      inactive-color="#ff4949"
      v-on="$listeners"
      @change="onChange"
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
      type: [String, Number, Boolean],
      default: false
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
    onChange(e) {
      this.$emit('change', e)
    }
  }
}
</script>
<style lang="less" scoped></style>
