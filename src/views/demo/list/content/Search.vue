<template>
  <div class="search-container flex-wrap title-text-color">
    <!-- 搜索条件的样式，之后就根据自己业务，来写 -->
    <div class="d-flex item ">
      <span class="title-width title-margin-right flex-ja-c">名称</span>
      <el-input v-model="queryParams.name" />
    </div>
    <div class="d-flex item ">
      <span class="title-width title-margin-right flex-ja-c">性别</span>
      <el-input v-model="queryParams.sex" />
    </div>

    <!-- 按钮组 -->
    <div class="d-flex item">
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
      <el-button type="primary">
        上传
        <i class="el-icon-upload el-icon--right" />
      </el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Search',
  components: {},
  props: {
    queryParams: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {}
}
</script>
<style lang="scss" scoped></style>
