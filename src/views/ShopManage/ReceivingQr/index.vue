<template>
  <div class="receiving-box">
    <qrcode
      :value="price"
      errorCorrectionLevel="L"
      :maskPattern="7"
      :width="400"
      :height="400"
      type="image/png"
      :quality="1"
      :color="{dark: '#024e7c', light: '#eee'}"
    />
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
</style>
