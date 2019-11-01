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
      </Form>
      <Row type="flex" justify="end" :gutter="20">
        <Col>
          <Button type="text" @click="modalCancel">取消</Button>
        </Col>
        <Col>
          <Button type="primary" @click="modalOk">确定</Button>
        </Col>
      </Row>
    </Modal>
  </div>
</template>

<script>
  export default {
    props: {
      show: Boolean,
      callback: Function
    },
    data () {
      return {
        formValidate: {
          shopName: '',
          phone: '',
          address: '',
        },
        ruleValidate: {
          shopName: [
            { required: true, message: '请输入商铺名', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入联系电话', trigger: 'change' }
          ],
          address: [
            { required: true, message: '请输入地址', trigger: 'change' }
          ],
        }
      }
    },
    methods: {
      modalOk () {
        this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!')
            this.callback()
          } else {
            this.$Message.error('Fail!')
          }
        })
      },
      modalCancel () {
        this.$refs['formValidate'].resetFields()
        this.callback()
      }
    },
    computed: {
      isShow () {
        return this.show
      }
    }
  }
</script>

<style scoped>

</style>
