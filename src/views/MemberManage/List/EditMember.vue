<template>
  <div class="add-user">
    <!--编辑会员信息-->
    <Modal
      :value="isShow"
      title="编辑会员"
      footer-hide
      @on-cancel="modalCancel"
    >
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="会员名" prop="memberName">
          <Input v-model="formValidate.memberName" placeholder="请输入会员名"/>
        </FormItem>
        <FormItem label="卡券" prop="coupon">
          <Input v-model="formValidate.coupon" placeholder="请输入卡券"/>
        </FormItem>
        <FormItem label="次数" prop="count">
          <Input v-model="formValidate.count" placeholder="请输入次数"/>
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
          memberName: '',
          coupon: '',
          count: '',
        },
        ruleValidate: {
          memberName: [
            { required: true, message: '请输入会员名', trigger: 'blur' }
          ],
          coupon: [
            { required: true, message: '请输入卡券', trigger: 'change' }
          ],
          count: [
            { required: true, message: '请输入次数', trigger: 'change' }
          ],
        }
      }
    },
    methods: {
      modalOk () {
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
