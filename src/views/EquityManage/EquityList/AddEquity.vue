<template>
  <div class="add-shop">
    <div class="add-box">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="权益券名" prop="equityName">
          <Input v-model="formValidate.equityName" placeholder="请输入权益券名"/>
        </FormItem>
        <FormItem label="库存" prop="stock">
          <Input v-model="formValidate.stock" placeholder="请输入库存"/>
        </FormItem>
        <FormItem label="次数" prop="number">
          <Input v-model="formValidate.number" placeholder="请输入次数"/>
        </FormItem>
        <FormItem label="关联商铺">
          <Transfer
            :titles="['未选择商铺','已选择商铺']"
            filterable
            :data="shopList"
            :target-keys="formValidate.shopId"
            :list-style="{height: '300px'}"
            @on-change="handleChange"></Transfer>
        </FormItem>
        <FormItem label="价格" prop="price">
          <Input v-model="formValidate.price" placeholder="请输入价格"/>
        </FormItem>
        <FormItem label="封面">
          <Upload
            v-show="!formValidate.coverPath"
            action="/"
            :before-upload="updateCover"
          >
            <Button
              type="primary"
              size="small"
            >
              上传封面
            </Button>
          </Upload>
          <div class="logo-box" v-if="formValidate.coverPath" @click="formValidate.coverPath = ''">
            <img :src="formValidate.coverPath" alt="" width="50" height="50"/>
            <div class="del-txt">删除</div>
          </div>
        </FormItem>
        <FormItem label="权益详情">
          <Input
            type="textarea"
            v-model="formValidate.equityDetails"
            placeholder="请输入权益券详情"
            :autosize="{minRows:2,maxRows:6}"
          />
        </FormItem>
      </Form>
    </div>
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
  import { saveEquity, uploadCardImg } from '@/api/EquityApi'
  import { getShopListAll } from '@/api/ShopApi'

  export default {
    props: {
      callback: Function
    },
    data () {
      return {
        // 表单
        formValidate: {
          equityName: '',
          stock: '',
          price: '',
          shopId: [],
          imageUrl: [],
          equityDetails: '',
          coverPath: '',
          number: ''
        },
        // 表单验证
        ruleValidate: {
          equityName: [
            { required: true, message: '请输入权益券名', trigger: 'blur' }
          ],
          stock: [
            { required: true, message: '请输入库存', trigger: 'blur' },
          ],
          number: [
            { required: true, message: '请输入次数', trigger: 'blur' },
          ],
          price: [
            { required: true, message: '请输入价格', trigger: 'blur' }
          ],
        },
        // 关联商铺
        shopList: []
      }
    },
    beforeMount () {
      this.getList()
    },
    methods: {
      // 获取关联商铺
      getList () {
        getShopListAll().then(res => {
          const data = res.data.data
          data.map(v => {
            v.key = v.id
            v.label = v.shopName
          })
          this.shopList = data
        })
      },
      // 保存修改
      modalOk () {
        this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            saveEquity(this.formValidate).then(res => {
              if (+res.data.code === 0) {
                this.$Message.success('编辑成功!')
                this.callback()
              }
            })
          } else {
            this.$Message.error('请输入完整信息!')
          }
        })
      },
      getImg (data) {
        this.formValidate.imageUrl = data
      },
      modalCancel () {
        this.$refs['formValidate'].resetFields()
        this.callback()
      },
      updateCover (data) {
        let file = new FormData()
        file.append('file', data)
        uploadCardImg(file).then(res => {
          this.formValidate.coverPath = res.data.data
        })
        return false
      },
      handleChange (newTargetKeys, direction, moveKeys) {
        this.formValidate.shopId = newTargetKeys
      }
    },
  }
</script>

<style scoped lang="stylus">
  .add-box
    max-height 500px
    overflow hidden
    overflow-y auto

  .logo-box
    width 50px
    height 50px
    position relative

    &:hover
      .del-txt
        opacity 1
        transition all linear .24s

    .del-txt
      left 0
      top 0
      right 0
      bottom 0
      position absolute
      z-index 2
      text-align center
      line-height 50px
      background rgba(0, 0, 0, .8)
      color #cccccc
      opacity 0
      transition all linear .24s
</style>
