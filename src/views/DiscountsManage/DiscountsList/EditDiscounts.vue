<template>
  <div class="add-user">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="优惠名" prop="discountName">
        <Input v-model="formValidate.discountName" placeholder="请输入优惠名"/>
      </FormItem>
      <FormItem label="优惠信息" prop="discountDetails">
        <Input v-model="formValidate.discountDetails" placeholder="请输入优惠信息"/>
      </FormItem>
      <FormItem label="优惠规则">
        <Input v-model="formValidate.discountRule" placeholder="请输入优惠规则"/>
      </FormItem>
      <FormItem label="优惠备注">
        <Input v-model="formValidate.remarks" placeholder="请输入优惠备注"/>
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
  import { editDiscountsDetail, getDiscountsDetail } from '@/api/discountsManage/DiscountsApi'

  export default {
    props: {
      discountId: String,
      callback: Function
    },
    data () {
      return {
        // form表单
        formValidate: {
          discountName: '',
          discountDetails: '',
          discountRule: '',
          remarks: '',
        },
        // 表单验证
        ruleValidate: {
          discountName: [
            { required: true, message: '请输入优惠名', trigger: 'blur' }
          ],
          discountDetails: [
            { required: true, message: '请输入优惠信息', trigger: 'blur' }
          ]
        }
      }
    },
    beforeMount () {
      this.getDetail()
    },
    methods: {
      // 获取详情
      getDetail () {
        getDiscountsDetail({
          id: this.discountId
        }).then(res => {
          const data = res.data.data
          for (let i in this.formValidate) {
            this.formValidate[i] = data[i]
          }
        })
      },
      modalOk () {
        this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            editDiscountsDetail({
              id: this.discountId,
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
