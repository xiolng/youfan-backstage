<template>
  <div class="screen-box">
    <Tooltip :content="isFull ? '退出全屏' : '全屏'" placement="bottom" v-if="showFullScreenBtn">
      <Icon @click.native="handleFullscreen" :type="isFull ? 'md-contract' : 'md-expand'" :size="23"></Icon>
    </Tooltip>
  </div>
</template>

<script>
  export default {
    computed: {
      showFullScreenBtn () {
        return window.navigator.userAgent.indexOf('MSIE') < 0
      }
    },
    data () {
      return {
        isFull: false
      }
    },
    methods: {
      handleFullscreen () {
        if (!document.fullscreenElement &&
          !document.mozFullScreenElement && !document.webkitFullscreenElement) {
          this.isFull = true
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen()
          } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen()
          } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
          }
        } else {
          this.isFull = false
          if (document.cancelFullScreen) {
            document.cancelFullScreen()
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
          }
        }
      }
    }
  }
</script>

<style scoped lang="stylus">

  .screen-box
    display inline-block

</style>
