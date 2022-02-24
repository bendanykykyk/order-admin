<template>
  <div class="form-date-time-picker">
    <el-date-picker
      :value="value"
      :placeholder="placeholderComp"
      v-bind="$attrs"
      v-on="$listeners"
      @change="handleEvent"
    />
  </div>
</template>
<script>
export default {
  name: 'FormDateTimePicker',
  components: {},
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    value: {
      type: [String, Date],
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
