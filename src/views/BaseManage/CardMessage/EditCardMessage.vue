<template>
  <div class="add-user">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="卡券名" prop="name">
        <Input v-model="formValidate.name" placeholder="请输入卡券名"/>
      </FormItem>
      <FormItem label="价格" prop="price">
        <Input v-model="formValidate.price" placeholder="请输入价格"/>
      </FormItem>
      <FormItem label="张" prop="discountsNumber">
        <Input v-model="formValidate.discountsNumber" placeholder="请输入张数"/>
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
  </div>
</template>

<script>
  import { getCardMessageDetail, editCardMessageDetail } from '@/api/baseManage/CardMessageApi'

  export default {
    props: {
      cardId: String,
      callback: Function
    },
    data () {
      return {
        // form表单
        formValidate: {
          name: '',
          price: '',
          discountsNumber: '',
        },
        // 表单验证
        ruleValidate: {
          name: [
            { required: true, message: '请输入卡券名', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请输入价格', trigger: 'blur' }
          ],
          discountsNumber: [
            { required: true, message: '请输入张数', trigger: 'blur' }
          ],
        }
      }
    },
    beforeMount () {
      this.getDetail()
    },
    methods: {
      // 获取详情
      getDetail () {
        getCardMessageDetail({ id: this.cardId }).then(res => {
          const data = res.data.data
          for (let i in this.formValidate) {
            this.formValidate[i] = data[i]
          }
        })
      },
      // 表单提交
      modalOk () {
        this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            editCardMessageDetail({
              id: this.cardId,
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
      modalCancel () {
        this.$refs['formValidate'].resetFields()
        this.callback()
      }
    }
  }
</script>

<style scoped>

</style>
