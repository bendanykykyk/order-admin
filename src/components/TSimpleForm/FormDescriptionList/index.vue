<template>
  <div class="form-description">
    <!-- <el-input
      :value="value"
      :placeholder="placeholderComp"
      :disabled="isDisabled(item)"
      v-bind="$attrs"
      v-on="$listeners"
      @input="onInput"
    /> -->
    <el-descriptions v-bind="$attrs" v-on="$listeners">
      <el-descriptions-item
        v-for="(key, index) in Object.keys(value)"
        :key="index"
        :label="computedKeyName(key)"
      >
        {{ value[key] }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>
<script>
export default {
  name: 'FormDescriptionList',
  components: {},
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    value: {
      type: Object,
      default() {
        return {}
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
        : `请输入${this.item.label}`
    },
    isDisabled() {
      return item => {
        if (typeof item.disabled === 'boolean') {
          return item.disabled
        } else if (typeof item.disabled === 'function') {
          // console.log('111')

          return item.disabled()
        } else {
          return false
        }
      }
    },
    computedKeyName() {
      return function(key) {
        const text = {
          id: '编号',
          name: '姓名',
          address: '地址',
          mobile: '手机号',
          region: '地区',
          fullName: '姓名',
          userIdCard: '身份证',
          travelTime: '禅旅日期'
        }[key]
        return text
      }
    }
  },
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    // onInput(e) {
    //   this.$emit('input', e)
    // }
  }
}
</script>
<style lang="less" scoped></style>
