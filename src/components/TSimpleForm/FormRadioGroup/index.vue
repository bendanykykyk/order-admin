<template>
  <div class="form-radio-group">
    <el-radio-group
      :value="value"
      :placeholder="placeholderComp"
      v-bind="$attrs"
      v-on="$listeners"
      @change="handleEvent"
    >
      <el-radio
        v-for="radioItem in item.typeData()"
        :key="radioItem.value"
        :label="radioItem.value"
      >
        {{ radioItem.label }}
      </el-radio>
    </el-radio-group>
  </div>
</template>
<script>
export default {
  name: 'FormSelect',
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
