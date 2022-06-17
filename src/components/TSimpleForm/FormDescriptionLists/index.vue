<template>
  <div class="form-description">
    <div v-for="(parentItem, index) in value" :key="index">
      <span>第{{ index + 1 }}次下单</span>
      <div
        v-for="(childrenItem, childrenIndex) in parentItem.product_list"
        :key="childrenIndex"
      >
        <el-descriptions v-bind="$attrs" v-on="$listeners">
          <el-descriptions-item
            v-for="(key, itemIndex) in Object.keys(childrenItem)"
            :key="itemIndex"
            :label="computedKeyName(key)"
          >
            {{ childrenItem[key] }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FormDescriptionLists',
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
          name: '名称',
          address: '地址',
          mobile: '手机号',
          region: '地区',
          fullName: '姓名',
          userIdCard: '身份证',
          travelTime: '禅旅日期',
          count: '数量',
          user_select_count: '用户选择数量'
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
<style lang="scss" scoped>
::v-deep .el-descriptions--medium.is-bordered .el-descriptions-item__cell {
  width: 50%;
}
</style>
