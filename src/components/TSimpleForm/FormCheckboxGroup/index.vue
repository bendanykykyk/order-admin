<template>
  <div class="form-checkbox-group">
    <el-checkbox-group
      :value="value"
      :placeholder="placeholderComp"
      v-bind="$attrs"
      v-on="$listeners"
      @change="handleEvent"
    >
      <el-checkbox
        v-for="checkboxItem in item.typeData()"
        :key="checkboxItem.value"
        :label="checkboxItem.value"
      >
        {{ checkboxItem.label }}
      </el-checkbox>
    </el-checkbox-group>
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
      type: Array,
      default() {
        return []
      }
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
      console.log(e)
      this.$emit('change', e)
    }
  }
}
</script>
<style lang="less" scoped></style>
