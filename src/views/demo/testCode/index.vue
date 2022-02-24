<template>
  <div>
    <el-button @click="$router.push('/redirect' + $route.path)">
      刷新页面
    </el-button>
    <el-button @click="test">点我触发事件</el-button>
    <!-- 红 -->
    <div v-for="(item, index) in redArr" :key="index">
      <div>信息1 <el-input v-model="item.message" /></div>
      <div>信息2 <el-input v-model="item.selectMessage" /></div>
    </div>
    <div />
  </div>
</template>
<script>
export default {
  name: 'Index',
  components: {},
  props: {},
  data() {
    return {
      redNormVos: [],
      redArr: []
    }
  },
  computed: {},
  watch: {},
  created() {
    this.handleAjaxRequest()
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    handleAjaxRequest() {
      setTimeout(() => {
        this.redNormVos = [
          {
            colorType: 1,
            createTime: '2022-01-20 10:16:47',
            fahuiId: 22,
            id: 202,
            level: 2,
            normType: 30,
            num: 5,
            packageId: 43,
            paiweiId: 18,
            skuId: '4077b04b-b420-4288-aa17-c1fca3c3fee7',
            type: '红牌位（大）',
            typeSize: '1'
          },
          {
            colorType: 1,
            createTime: '2022-01-20 10:16:47',
            fahuiId: 22,
            id: 204,
            level: 2,
            normType: 30,
            num: 5,
            packageId: 43,
            paiweiId: 16,
            skuId: 'aed8e40a-dee5-43fa-bdf2-7642f345902c',
            type: '红牌位（小）',
            typeSize: '2'
          },
          {
            colorType: 1,
            createTime: '2022-01-20 10:16:47',
            fahuiId: 22,
            id: 205,
            level: 2,
            normType: 30,
            num: 5,
            packageId: 43,
            paiweiId: 18,
            skuId: 'bdfe78f4-5b6e-4398-85db-4d79a993c30a',
            type: '红牌位（大）',
            typeSize: '1'
          },
          {
            colorType: 1,
            createTime: '2022-01-20 10:16:47',
            fahuiId: 22,
            id: 207,
            level: 2,
            normType: 30,
            num: 5,
            packageId: 43,
            paiweiId: 16,
            skuId: '3dbd88f9-4c86-430a-b97a-fa2e1ebf940e',
            type: '红牌位（小）',
            typeSize: '2'
          }
        ].forEach(item => {
          this.redArr.push({
            selectMessage: '',
            message: '',
            paiweiId: item.paiweiId
          })
        })
      }, 200)
    },
    test() {
      //   this.queue(
      //     this.doThingA,
      //     this.doThingB,
      //     this.doThingC,
      //     this.doThingC,
      //     this.doThingB
      //   )

      this.callback()
    },

    // doThingA(callback = () => {}) {
    //   setTimeout(() => {
    //     console.log(`a 完成了`)
    //     return callback
    //   }, Math.random() * 2000)
    // },
    // doThingB(callback = () => {}) {
    //   setTimeout(() => {
    //     console.log(`b 完成了`)
    //     return callback
    //   }, Math.random() * 2000)
    // },
    // doThingC(callback = () => {}) {
    //   setTimeout(() => {
    //     console.log(`c 完成了`)
    //     return callback
    //   }, Math.random() * 2000)
    // },
    callback() {
      //   this.doThingA(() => {
      //     this.doThingB(() => {
      //       this.doThingC(() => {})
      //     })
      //   })
      this.doThingA()
        .then(this.doThingB)
        .then(this.doThingC)
        .then(this.doThingA)
        .then(this.doThingB)
    },
    doThingA(callback = () => {}) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(`a 完成了`)
          resolve('a成功了')
        }, Math.random() * 2000)
      })
    },
    doThingB(res) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(`b 完成了`)
          resolve('b成功了')
        }, Math.random() * 2000)
      })
    },
    doThingC(callback = () => {}) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(`c 完成了`)
          resolve('c成功了')
        }, Math.random() * 2000)
      })
    },
    queue(...rest) {
      let seq = new Promise(resolve => {
        resolve('开始')
      })
      rest.forEach(item => {
        seq = seq.then(item)
      })
      return seq
    }
  }
}
</script>
<style lang="less" scoped></style>
