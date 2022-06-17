<template>
  <div class="form-select">
    <el-select
      :value="value"
      :placeholder="placeholderComp"
      :disabled="isDisabled(item)"
      v-bind="$attrs"
      v-on="$listeners"
      @change="handleEvent"
    >
      <el-option
        v-for="selectItem in item.typeData()"
        :key="selectItem.value"
        :label="selectItem.label"
        :value="selectItem.value"
      />
    </el-select>
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
        : `请选择${this.item.label}`
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
    handleEvent(e) {
      this.$emit('change', e)
    }
  }
}
</script>
<style lang="less" scoped></style>
