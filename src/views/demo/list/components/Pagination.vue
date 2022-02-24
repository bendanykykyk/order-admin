<template>
  <el-pagination
    :layout="layout"
    :page-sizes="pageSizes"
    :total="total"
    :page-size.sync="pageSizeComp"
    :current-page.sync="currentPageComp"
    v-bind="$attrs"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>
<script>
export default {
  name: 'Pagination',
  components: {},
  props: {
    total: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    }
  },
  computed: {
    currentPageComp: {
      get() {
        return this.currentPage
      },
      set(val) {
        this.$emit('update:currentPage', val)
      }
    },
    pageSizeComp: {
      get() {
        return this.pageSize
      },
      set(val) {
        this.$emit('update:pageSize', val)
      }
    }
  },
  methods: {
    handleSizeChange() {
      // 这样写是有bug的，会查询两次，比如你先选了第五页，然后选择30条，他会自动帮你切换页数，这样就会查询2次
      // this.$emit('update:page-size', val)
      this.$emit('pagination')
    },
    handleCurrentChange() {
      // this.$emit('update:current-page', val)
      this.$emit('pagination')
    }
  }
}
</script>
<style lang="less" scoped></style>
