<template>
  <div class="add-shop">
    <div class="add-box">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="商铺名" prop="shopName">
          <Input v-model="formValidate.shopName" placeholder="请输入商铺名"/>
        </FormItem>
        <FormItem label="联系电话" prop="phone">
          <Input v-model="formValidate.phone" placeholder="请输入联系电话"/>
        </FormItem>
        <FormItem label="优惠信息">
          <Select
            v-model="formValidate.discountId"
            multiple
            filterable
            placeholder="请输入名称搜索或者选择"
          >
            <Option
              v-for="item in discountList"
              :key="item.id"
              :value="item.id"
            >{{item.discountName}}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="地址" prop="addressDetails">
          <Input v-model="formValidate.addressDetails" placeholder="请输入地址"/>
        </FormItem>
        <FormItem label="LOGO">
          <Upload
            v-show="!formValidate.shopLogo"
            action="/"
            :before-upload="updateLogo"
          >
            <Button
              type="primary"
              size="small"
            >
              上传logo
            </Button>
          </Upload>
          <div class="logo-box" v-if="formValidate.shopLogo" @click="formValidate.shopLogo = ''">
            <img :src="formValidate.shopLogo" alt="" width="50" height="50"/>
            <div class="del-txt">删除</div>
          </div>
        </FormItem>
        <FormItem label="描述">
          <Input v-model="formValidate.shopSketch" placeholder="请输入描述"/>
        </FormItem>
        <FormItem label="详情图片">
          <UploadImg :callback="getImg"></UploadImg>
        </FormItem>
        <FormItem label="详情">
          <Input
            type="textarea"
            v-model="formValidate.shopDesc"
            placeholder="请输入商铺详情"
            :autosize="{minRows:2,maxRows:6}"
          />
        </FormItem>
        <FormItem label="营业时间">
          <TimePicker
            @on-change="changeTime"
            format="HH:mm"
            type="timerange"
            placement="top"
            placeholder="请输入营业时间"
            transfer
          ></TimePicker>
        </FormItem>
        <FormItem label="定位">
          <Button
            :type="formValidate.longitude ? 'primary':'warning'"
            @click="showMap = !showMap"
            size="small"
          >
            {{formValidate.longitude ? '已定位':'未定位'}}
          </Button>
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
    <!--定位-->
    <Modal v-model="showMap" title="位置选择" footer-hide>
      <LocationMap v-if="showMap" :callback="setMaps" :marker-value="locationData"></LocationMap>
    </Modal>
  </div>
</template>

<script>
  import LocationMap from '@/views/ShopManage/ShopList/LocationMap'
  import UploadImg from '@/views/ShopManage/ShopList/UploadImg'
  import { saveShop, uploadCardImg } from '@/api/ShopApi'
  import { getAllDiscounts } from '@/api/discountsManage/DiscountsApi'
  import { validatePhone } from '@/utils'

  export default {
    props: {
      callback: Function
    },
    data () {
      return {
        // 表单
        formValidate: {
          shopName: '',
          phone: '',
          addressDetails: '',
          latitude: '',
          longitude: '',
          beginTime: '',
          endTime: '',
          discountId: [],
          shopDesc: '',
          imageUrl: [],
          shopSketch: '',
          shopLogo: ''
        },
        // 表单验证
        ruleValidate: {
          shopName: [
            { required: true, message: '请输入商铺名', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入联系电话', trigger: 'blur' },
            { validator: validatePhone, trigger: 'change' }
          ],
          addressDetails: [
            { required: true, message: '请输入地址', trigger: 'blur' }
          ],
        },
        // 显示定位弹窗
        showMap: false,
        // 营业时间
        businessHours: {
          beginTime: '',
          endTime: ''
        },
        // 优惠信息
        discountList: [],
        // 定位数据
        locationData: {
          lnglat: {
            lng: '',
            lat: ''
          }
        }
      }
    },
    beforeMount () {
      this.getList()
    },
    methods: {
      // 获取优惠信息
      getList () {
        getAllDiscounts().then(res => {
          this.discountList = res.data.data
        })
      },
      // 保存修改
      modalOk () {
        this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            for (let i in this.businessHours) {
              this.formValidate[i] = this.businessHours[i]
            }
            saveShop(this.formValidate).then(res => {
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
        console.log(this.formValidate)
      },
      // 选择营业时间
      changeTime (data) {
        this.businessHours.beginTime = data[0]
        this.businessHours.endTime = data[1]
      },
      modalCancel () {
        this.$refs['formValidate'].resetFields()
        this.callback()
      },
      updateLogo (data) {
        let file = new FormData()
        file.append('file', data)
        uploadCardImg(file).then(res => {
          this.formValidate.shopLogo = res.data.data
        })
        return false
      },
      // 设置定位
      setMaps (data) {
        if (data) {
          this.formValidate.latitude = data.lnglat.lat
          this.formValidate.longitude = data.lnglat.lng
          this.locationData = data
        }
        this.showMap = false
      }
    },
    components: {
      LocationMap,
      UploadImg
    }
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
