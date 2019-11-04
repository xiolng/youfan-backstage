<template>
  <div class="add-user">
    <Modal
      :value="isShow"
      title="新增优惠信息"
      footer-hide
      @on-cancel="modalCancel"
    >
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="优惠名" prop="discountsName">
          <Input v-model="formValidate.discountsName" placeholder="请输入优惠名"/>
        </FormItem>
        <FormItem label="y优惠信息" prop="discountsMessage">
          <Input v-model="formValidate.discountsMessage" placeholder="请输入y优惠信息"/>
        </FormItem>
        <FormItem label="更新时间" prop="upDate">
          <Input v-model="formValidate.upDate" placeholder="请输入更新时间"/>
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
          discountsName: '',
          discountsMessage: '',
          upDate: '',
        },
        ruleValidate: {
          discountsName: [
            { required: true, message: '请输入优惠名', trigger: 'blur' }
          ],
          discountsMessage: [
            { required: true, message: '请输入优惠信息', trigger: 'change' }
          ],
          upDate: [
            { required: true, message: '请输入更新时间', trigger: 'change' }
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
