<template>
  <div class="receiving-box" ref="receiving">
    <qrcode
      :value="price"
      errorCorrectionLevel="H"
      :maskPattern="7"
      :width="400"
      :height="400"
      type="image/png"
      :quality="1"
      :color="{dark: '#024e7c', light: '#eee'}"
    />
    <Divider></Divider>
    <Button type="warning" @click="downloadReceiving">
      <Icon type="md-download"></Icon>
      下载
    </Button>
  </div>
</template>

<script>
  import Qrcode from 'vue-qrcode'

  export default {
    data () {
      return {
        price: '321'
      }
    },
    methods: {
      downloadReceiving () {
        let img = this.$refs.receiving.childNodes[0].src
        let downloadBtn = document.createElement('a')
        downloadBtn.setAttribute('href', img)
        downloadBtn.setAttribute('download', '收款码')
        downloadBtn.click()
        img = null
        downloadBtn = null
      }
    },
    components: {
      Qrcode
    }
  }
</script>

<style scoped lang="stylus">
  .receiving-box
    display flex
    justify-content center
    align-items center
    height 100%
    flex-direction column
</style>
