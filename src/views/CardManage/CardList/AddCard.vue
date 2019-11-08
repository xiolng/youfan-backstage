<template>
  <div class="add-user">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="卡券名" prop="basicsId">
        <Select v-model="formValidate.basicsId">
          <Option v-for="item in cardList" :key="item.id" :value="item.id">{{item.name}}</Option>
        </Select>
      </FormItem>
      <FormItem label="张" prop="cardVolumeNumber">
        <Input v-model="formValidate.cardVolumeNumber" placeholder="请输入张数"/>
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
  import { getAllCardMessageList } from '@/api/baseManage/CardMessageApi'
  import { createCard } from '@/api/CardManageApi'

  export default {
    props: {
      show: Boolean,
      callback: Function
    },
    data () {
      return {
        formValidate: {
          basicsId: '',
          cardVolumeNumber: '',
        },
        ruleValidate: {
          basicsId: [
            { required: true, message: '请输入卡券名', trigger: 'change' }
          ],
          cardVolumeNumber: [
            { required: true, message: '请输入张数', trigger: 'blur change' }
          ],
        },
        cardList: []
      }
    },
    beforeMount () {
      this.getList()
    },
    methods: {
      getList () {
        getAllCardMessageList().then(res => {
          this.cardList = res.data.data
        })
      },
      modalOk () {
        this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            createCard(this.formValidate).then(res => {
              if (+res.data.code === 0) {
                this.$Message.success('生成卡券成功!')
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
