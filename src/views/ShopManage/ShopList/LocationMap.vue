<template>
  <div class="location-map">
    <div ref="maps" id="container" style="width: 100%; height: 400px;margin-bottom: 20px;"></div>

    <Row type="flex" justify="end" :gutter="20">
      <Col>
        <Button type="text" @click="modalCancel">取消</Button>
      </Col>
      <Col>
        <Button type="primary" @click="modalOk">确定</Button>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    props: {
      callback: Function,
      markerValue: Object
    },
    data () {
      return {
        mapBox: '', // 地图盒子
        lnglatValue: this.markerValue.lnglat.lng ? this.markerValue : '', // 坐标轴
        mapScale: '', // 距离标记
        mapMarker: '' // 坐标标记
      }
    },
    mounted () {
      console.log(this.markerValue)
      const vm = this
      this.initMap()
      this.mapBox.on('click', e => {
        this.lnglatValue = e
        vm.setMarker(e)
        console.log(e)
      })
      if (this.lnglatValue) this.setMarker(this.lnglatValue)
    },
    methods: {
      initMap () {
        this.mapScale = new AMap.Scale({ visible: false })
        this.mapBox = new AMap.Map('container', {
          resizeEnable: true,
          zoom: 11
        })
        if (this.lnglatValue) this.mapBox.setCenter([this.lnglatValue.lnglat.lng, this.lnglatValue.lnglat.lat])
        this.mapBox.addControl(this.mapScale)
        this.mapScale.show()
      },
      setMarker (data) {
        const vm = this
        vm.mapBox.remove(vm.mapMarker)
        vm.mapMarker = new AMap.Marker({
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: [data.lnglat.lng, data.lnglat.lat]
        })
        vm.mapBox.add(vm.mapMarker)
      },
      modalOk () {
        this.callback(this.lnglatValue)
      },
      modalCancel () {
        this.callback()
      }
    },
    destroyed () {
      this.mapBox = null
    }
  }
</script>

<style scoped>

</style>
