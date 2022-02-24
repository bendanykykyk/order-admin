<template>
  <div class="form-select">
    <el-select
      :value="value"
      :placeholder="placeholderComp"
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
  name: 'FormSelectTempleC',
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
        : `请选择${this.item.label}`
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
