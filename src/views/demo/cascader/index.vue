<template>
  <div>
    {{ value }}
    <el-cascader v-model="value" :clearable="true" :props="casProps" :options="firstOptions" />
  </div>
</template>
<script>
export default {
  name: 'Cascader',
  components: {},
  props: {},
  data() {
    return {
      firstOptions: [],
      value: [],
      casProps: {
        value: 'value',
        label: 'label',
        checkStrictly: true,

        lazy: true, // 此处必须为true
        lazyLoad: (node, resolve) => {
          const { level, data } = node
          // 支持多层级查询
          if (level === 0) {
            this.queryListAll()
          } else if (level === 1) {
            // 进行查询
            this.queryGoods(data, resolve)
          } else if (level === 2) resolve()
          //   if (node.data.projectId) this.getChildProject(node.data, resolve)
        }
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    queryListAll() {
      setTimeout(() => {
        this.firstOptions = [
          { label: '水果', value: 1 },
          { label: '蔬菜', value: 2 }
        ]
      }, 1000)
    },
    queryGoods(data, resolve) {
      setTimeout(() => {
        const result1 = [
          { label: '香蕉', value: 3 },
          { label: '苹果 ', value: 4 }
        ]
        const result2 = [
          { label: '菠菜', value: 5 },
          { label: '芹菜 ', value: 6 }
        ]

        if (data.value === 1) {
          resolve(result1)
        } else if (data.value === 2) {
          resolve(result2)
        }
      }, 1000)
    }
  }
}
</script>
<style lang="less" scoped></style>
