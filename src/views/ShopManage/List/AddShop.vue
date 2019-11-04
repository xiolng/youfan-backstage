<template>
  <div class="add-user">
    <Modal
      :value="isShow"
      title="新增商铺"
      footer-hide
      @on-cancel="modalCancel"
    >
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="商铺名" prop="shopName">
          <Input v-model="formValidate.shopName" placeholder="请输入商铺名"/>
        </FormItem>
        <FormItem label="联系电话" prop="phone">
          <Input v-model="formValidate.phone" placeholder="请输入联系电话"/>
        </FormItem>
        <FormItem label="地址" prop="address">
          <Input v-model="formValidate.address" placeholder="请输入地址"/>
        </FormItem>
        <FormItem label="定位">
          <Button
            :type="formValidate.center ? 'primary':'warning'"
            @click="showMap = !showMap"
            size="small"
          >
            {{formValidate.center ? '已定位':'未定位'}}
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
      <Modal v-model="showMap" title="位置选择" footer-hide>
        <LocationMap v-if="showMap" :callback="setMaps"></LocationMap>
      </Modal>
    </Modal>
  </div>
</template>

<script>
  import LocationMap from '@/views/ShopManage/List/LocationMap'
  import { validPhone } from '@/utils'

  export default {
    props: {
      show: Boolean,
      callback: Function
    },
    data () {
      /**
       * 检验手机号
       * @param rule
       * @param value
       * @param callback
       * @returns {*}
       */
      const validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'))
        } else {
          if (!validPhone(value)) {
            return callback(new Error('请输入正确手机号'))
          }
          callback()
        }
      }
      return {
        formValidate: {
          shopName: '',
          phone: '',
          address: '',
          center: ''
        },
        ruleValidate: {
          shopName: [
            { required: true, message: '请输入商铺名', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入联系电话', trigger: 'change' },
            { validator: validatePhone, trigger: 'change' }
          ],
          address: [
            { required: true, message: '请输入地址', trigger: 'change' }
          ],
        },
        showMap: false
      }
    },
    methods: {
      modalOk () {
        if (!this.formValidate.center) {
          this.$Message.error('请选择定位')
          return false
        }
        this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            this.$Message.success('编辑成功!')
            this.callback()
          } else {
            this.$Message.error('请输入完整信息!')
          }
        })
      },
      modalCancel () {
        this.$refs['formValidate'].resetFields()
        this.callback()
      },
      setMaps (data) {
        if (data) {
          this.formValidate.center = data
          console.log(data)
        }
        this.showMap = false
      }
    },
    computed: {
      isShow () {
        return this.show
      }
    },
    components: {
      LocationMap
    }
  }
</script>

<style scoped>

</style>
