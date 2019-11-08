<template>
  <div class="img-box">
    <Row type="flex" justify="start">
      <Col>
        <Row type="flex" justify="start">
          <Col
            class="upload-box img-content"
            v-for="(item, index) in imgUrl"
            :key="index"
          >
            <img v-if="item" :src="item" alt=""/>
            <div class="img-modal">
              <div class="img-btn" @click="showImg(index)">
                <Icon type="md-eye"></Icon>
              </div>
              <div class="img-btn" @click="delImg(index)">
                <Icon type="md-trash"></Icon>
              </div>
            </div>
          </Col>
        </Row>
      </Col>
      <Col>
        <Upload
          ref="upload"
          :format="['jpg','jpeg','png']"
          :max-size="2048"
          multiple
          action="/"
          :show-upload-list="false"
          :before-upload="beforeUpload"
          @on-progress="uploadProgress"
          v-show="imgUrl.length <= 5"
        >
          <div class="upload-box">
            <Icon type="ios-camera" size="30"></Icon>
          </div>
        </Upload>
      </Col>
    </Row>
    <Modal
      v-model="bigImg"
      footer-hide
      :closable="false"
    >
      <Row type="flex" justify="center">
        <Col>
          <img v-if="bigImg" :src="activeUrl" alt="">
        </Col>
      </Row>
    </Modal>
  </div>
</template>

<script>
  import { uploadCardImg, deleteShopImg } from '@/api/ShopApi'

  export default {
    props: {
      callback: Function,
      getImg: Array
    },
    data () {
      return {
        imgUrl: [],
        bigImg: false,
        activeUrl: ''
      }
    },
    watch: {
      'getImg': function () {
        if (this.getImg) this.imgUrl = this.getImg
      }
    },
    methods: {
      beforeUpload (data) {
        let file = new FormData()
        file.append('file', data)
        uploadCardImg(file).then(res => {
          this.imgUrl.push(res.data.data)
          this.callback(this.imgUrl)
        })
        return false
      },
      uploadProgress (event, file, fileList) {
        console.log(event, file, fileList)
      },
      showImg (inx) {
        this.activeUrl = this.imgUrl[inx]
        this.bigImg = true
      },
      delImg (inx) {
        deleteShopImg({
          url: this.imgUrl[inx]
        }).then(res => {
          if (+res.data.code === 0) {
            this.imgUrl.splice(inx, 1)
            this.callback(this.imgUrl)
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  .upload-box
    width 58px
    height 58px
    background #eee
    line-height 58px
    border 1px solid #e4e4e4
    text-align center
    margin 0 5px
    padding 3px

    &:hover
      background #e6e6e6
      border-color #e1e1e1

    img
      max-width: 100%;
      max-height 100%;

  .img-content
    position relative

    &:hover
      .img-modal
        opacity 1
        transition all linear .24s

    .img-modal
      left 0
      top 0
      right 0
      bottom 0
      position absolute
      z-index 2
      background rgba(0, 0, 0, .8)
      opacity 0
      transition all linear .24s

      .img-btn
        height 50%
        display flex
        flex-direction column
        justify-content center
        color #fff

        &:first-child
          border-bottom 1px solid #eee
</style>
