<template>
  <div class="screen-box">
    <Tooltip :content="isFull ? '退出全屏' : '全屏'" placement="bottom" v-if="showFullScreenBtn" @keyup.27="handleFullscreen">
      <Icon @click.native="handleFullscreen" :type="isFull ? 'md-contract' : 'md-expand'" :size="23"></Icon>
    </Tooltip>
  </div>
</template>

<script>
  export default {
    computed: {
      // 低版本ie不显示全屏按钮
      showFullScreenBtn () {
        return window.navigator.userAgent.indexOf('MSIE') < 0
      }
    },
    data () {
      return {
        isFull: false,
      }
    },
    beforeMount () {
      const vm = this
      window.onresize = function () {
        if (vm.getFullScreen()) {
          vm.$set(vm, 'isFull', false)
          return false
        }
        vm.$set(vm, 'isFull', true)
      }
    },
    methods: {
      handleFullscreen () {
        if (this.getFullScreen()) {
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen()
          } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen()
          } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
          }
        } else {
          if (document.cancelFullScreen) {
            document.cancelFullScreen()
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
          }
        }
      },
      getFullScreen () {
        return (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement)
      }
    }
  }
</script>

<style scoped lang="stylus">

  .screen-box
    display inline-block

</style>
