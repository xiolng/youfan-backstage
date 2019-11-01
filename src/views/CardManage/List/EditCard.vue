<template>
  <div class="add-user">
    <Modal
      :value="isShow"
      title="编辑卡券"
      footer-hide
      @on-cancel="modalCancel"
    >
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="卡券名" prop="cardName">
          <Input v-model="formValidate.cardName" placeholder="请输入卡券名"/>
        </FormItem>
        <FormItem label="价格" prop="price">
          <Input v-model="formValidate.price" placeholder="请输入价格"/>
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
          cardName: '',
          price: '',
          count: '',
        },
        ruleValidate: {
          cardName: [
            { required: true, message: '请输入卡券名', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请输入价格', trigger: 'blur' }
          ],
          count: [
            { required: true, message: '请输入次数', trigger: 'blur' }
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
