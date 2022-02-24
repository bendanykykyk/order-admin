<template>
  <div>
    <el-button type="primary" @click="handleBtnClick">
      获取经纬度
    </el-button>

    <!-- <el-dialog title="提示" :visible.sync="dialogVisible" width="70%">
      <div class="search-container">
        <el-input
          v-model="keyword"
          placeholder="请输入内容"
          class="search-input"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="handleSearchButtonClick"
          />
        </el-input>
      </div>

      <div id="container" />
    </el-dialog> -->
    <div id="container" />
  </div>
</template>
<script>
// 获取AMap
// const AMap = window.AMap
// window.AMap && (const map = new window.AMap.Map(this.$ref["map-container"]));

import AMapLoader from '@amap/amap-jsapi-loader'
export default {
  name: 'FormAliMap',
  components: {},
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    // [x,y]
    value: {
      type: Array,
      default() {
        return ['', '']
      }
    }
  },
  data() {
    return {
      map: null
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {
    AMapLoader.load({
      key: 'b609198c045e3ab731d50d39b12bcaa', // 申请好的Web端开发者Key，首次调用 load 时必填
      // version: '1.4.15', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      AMapUI: {
        // 是否加载 AMapUI，缺省不加载
        version: '1.1', // AMapUI 缺省 1.1
        plugins: [] // 需要加载的 AMapUI ui插件
      },
      Loca: {
        // 是否加载 Loca， 缺省不加载
        version: '1.3.2' // Loca 版本，缺省 1.3.2
      }
    })
      .then(AMap => {
        console.log(AMap)
        this.$nextTick(() => this.initMap(AMap))
      })
      .catch(e => {
        console.error(e)
      })
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    initMap(AMap) {
      this.map = new AMap.Map('container')
      // 或者使用 $refs 获取节点
      // this.map = new AMap.Map(this.$refs.container);
    },

    handleBtnClick() {
      // 初始化地图
      // this.mapInit(this.Lng, this.Lat)
      // // 创建初始marker
      // this.markInit(this.Lng, this.Lat)
      // // 添加至地图
      // this.addMarker(this.map, this.marker)
      // this.$emit('OnLngAndLatChange', this.Lng, this.Lat)
      // 显示弹窗
      this.dialogVisible = true
    }
    // // 创建mark，并且初始化
    // markInit(lng, la) {
    //   this.marker = new window.AMap.Marker({
    //     // position: new AMap.LngLat(lng, la) // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
    //     position: [lng, la] // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
    //   })
    // },
    // // 初始化map信息
    // mapInit(lng, la) {
    //   this.map = new window.AMap.Map('container', {
    //     // 116.098722,40.069725
    //     zoom: 11, // 级别
    //     center: [lng, la] // 中心点坐标
    //     // viewMode: "3D" //使用3D视图
    //   })
    //   // 开启鼠标点击获取经纬度事件
    //   this.clickMapByMouse()
    // },
    // // 获取鼠标点击的经纬度
    // clickMapByMouse() {
    //   const that = this
    //   // 为地图注册click事件获取鼠标点击出的经纬度坐标
    //   this.map.on('click', function(e) {
    //     that.removeMarkder(that.map, that.marker)
    //     // 新建图标
    //     that.markInit(e.lnglat.getLng(), e.lnglat.getLat())
    //     // that.$message(e.lnglat.getLng() + "," + e.lnglat.getLat());
    //     // 添加图标至地图
    //     that.addMarker(that.map, that.marker)
    //     // 存储经纬度
    //     that.Lng = e.lnglat.getLng()
    //     that.Lat = e.lnglat.getLat()
    //     that.$emit('OnLngAndLatChange', that.Lng, that.Lat)
    //   })
    // },
    // // 新增marker
    // addMarker(map, marker) {
    //   map.add(marker)
    // },
    // // 删除marker
    // removeMarkder(map, marker) {
    //   map.remove(marker)
    // },
    // // 点击中文地址转经纬度
    // handleSearchButtonClick() {
    //   this.addressToLngLat(this.keyword)
    // },
    // addressToLngLat(keyword) {
    //   const that = this
    //   var geocoder = new window.AMap.Geocoder({
    //     // city: "010", //城市，默认：“全国”
    //     // radius: 1000000000 //范围，默认：500
    //   })
    //   // 地理编码,返回地理编码结果
    //   geocoder.getLocation(keyword, function(status, result) {
    //     if (status === 'complete' && result.info === 'OK') {
    //       //  未来优
    //       const location = result.geocodes[0].location
    //       console.log(result)
    //       //   that.searchLng = String(location.lng);
    //       //   that.searchLat = String(location.lat);
    //       // 删除现存的点，新增搜出的点
    //       // that.$message(location.lng + "," + location.lat);
    //       that.removeMarkder(that.map, that.marker)
    //       that.markInit(location.lng, location.lat)
    //       that.addMarker(that.map, that.marker)
    //       // 存储经纬度
    //       that.Lng = location.lng
    //       that.Lat = location.lat
    //       that.$emit('OnLngAndLatChange', that.Lng, that.Lat)
    //       // 调整地图中心点
    //       that.map.setCenter([location.lng, location.lat])
    //     } else {
    //       console.log(result)
    //       that.$message.error('地址输入不准确或者不在可查询范围内')
    //     }
    //   })
    // }
  }
}
</script>
<style lang="scss" scoped>
#container {
  width: 500px;
  height: 400px;
}
.search-container {
  display: flex;
  .search-input {
    width: 40%;
    margin: 20px 20px;
  }
}
</style>
