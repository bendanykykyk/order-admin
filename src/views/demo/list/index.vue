<template>
  <div class="list-container">
    <el-card>
      <!-- 搜索框 -->
      <search :query-params="searchObj" />
      <!-- 分页控件 -->
      <pagination
        :total="queryListResponse.total"
        :current-page.sync="listQuery.currentPage"
        :page-size.sync="listQuery.pageSize"
        @pagination="queryList"
      />
    </el-card>
  </div>
</template>
<script>
import Pagination from './components/Pagination.vue'
import Search from './content/Search.vue'

export default {
  name: 'List',
  components: {
    Pagination,
    Search
  },
  props: {},
  data() {
    return {
      // 搜索
      searchObj: {
        name: '',
        sex: ''
      },
      // 分页控件
      queryListResponse: {
        total: 100
      },
      listQuery: {
        currentPage: 1,
        pageSize: 20
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    queryList() {
      // console.log(this.listQuery, '发起查询啦')
    }
  }
}
</script>
<style lang="less" scoped></style>
