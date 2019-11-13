<template>
  <div class="page-box">
    <!--分页-->
    <Page
      :total="total"
      show-sizer
      :current="pages.current"
      show-total
      :page-size="pages.limit"
      @on-change="setCurrent"
      @on-page-size-change="setLimit"
    />
  </div>
</template>

<script>
  export default {
    props: {
      total: Number,
      callback: Function
    },
    data () {
      return {
        pages: {
          current: 1,
          limit: 10
        },
        callData: {
          beginPage: 1,
          limit: 10
        }
      }
    },
    methods: {
      // 设置分页
      setCurrent (data) {
        this.pages.current = data
        this.callData.beginPage = data
        this.callback(this.callData)
      },
      // 每页数量
      setLimit (data) {
        this.pages.limit = data
        this.callData.limit = data
        this.callback(this.callData)
      }
    }
  }
</script>

<style scoped>

</style>
