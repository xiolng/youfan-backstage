<template>
  <div class="add-user">
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
      <FormItem label="营业时间">
        <TimePicker
          :value="businessHoursValue"
          @on-change="changeTime"
          format="HH:mm" type="timerange"
          placement="bottom-end"
          placeholder="请输入营业时间"
          :editable="false"
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
    <Row type="flex" justify="end" :gutter="20">
      <Col>
        <Button type="text" @click="modalCancel">取消</Button>
      </Col>
      <Col>
        <Button type="primary" @click="modalOk">确定</Button>
      </Col>
    </Row>
    <!--定位--弹窗-->
    <Modal v-model="showMap" title="位置选择" footer-hide>
      <LocationMap
        v-if="showMap"
        :marker-value="{
          lnglat:{
            lng: formValidate.longitude,
            lat:formValidate.latitude
          }
        }"
        :callback="setMaps"
      ></LocationMap>
    </Modal>
  </div>
</template>

<script>
  import LocationMap from '@/views/ShopManage/ShopList/LocationMap' // 定位弹窗
  import { editShopDetail, getShopDetail } from '@/api/ShopApi'
  import { getAllDiscounts } from '@/api/discountsManage/DiscountsApi' // 优惠信息
  import { validatePhone } from '@/utils'

  export default {
    props: {
      shopId: String,
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
          discountId: []
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
        // 地图弹窗
        showMap: false,
        // 营业时间
        businessHours: {
          beginTime: '',
          endTime: ''
        },
        // 营业时间选择
        businessHoursValue: [],
        // 优惠列表
        discountList: [],
      }
    },
    beforeMount () {
      this.getDetail()
      this.getList()
    },
    methods: {
      // 优惠信息
      getList () {
        getAllDiscounts().then(res => {
          this.discountList = res.data.data
        })
      },
      // 商铺详情
      getDetail () {
        getShopDetail({ id: this.shopId }).then(res => {
          const data = res.data.data
          for (let i in this.formValidate) {
            this.formValidate[i] = data[i]
            this.businessHours[i] = data[i]
          }
          this.businessHoursValue = [data.beginTime, data.endTime]
        })
      },
      // 保存修改
      modalOk: function () {
        if (!this.formValidate.longitude) {
          this.$Message.error('请选择定位')
          return false
        }
        this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            for (let i in this.businessHours) {
              this.formValidate[i] = this.businessHours[i]
            }
            editShopDetail({
              id: this.shopId,
              ...this.formValidate
            }).then(res => {
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
      // 选择营业时间
      changeTime (data) {
        this.businessHoursValue = data
        this.businessHours.beginTime = data[0]
        this.businessHours.endTime = data[1]
      },
      modalCancel () {
        this.$refs['formValidate'].resetFields()
        this.callback()
      },
      // 设置地图
      setMaps (data) {
        if (data) {
          this.formValidate.latitude = data.lnglat.lat
          this.formValidate.longitude = data.lnglat.lng
        }
        this.showMap = false
      }
    },
    components: {
      LocationMap
    }
  }
</script>

<style scoped>

</style>
