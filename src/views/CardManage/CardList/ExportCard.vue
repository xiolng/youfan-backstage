<template>
  <div class="add-user">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="卡券名" prop="cardName">
        <Select v-model="formValidate.cardName">
          <Option v-for="item in cardList" :key="item.id" :value="item.id">{{item.name}}</Option>
        </Select>
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
        <Button type="primary" @click="modalOk">导出</Button>
      </Col>
    </Row>
  </div>
</template>

<script>
  import { getAllCardMessageList } from '@/api/baseManage/CardMessageApi'

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
            { required: true, message: '请输入卡券名', trigger: 'change' }
          ],
          count: [
            { required: true, message: '请输入次数', trigger: 'blur change' }
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
            this.$Message.success('编辑成功!')
            this.exportCard({
              link: '2323',
              name: 'iiii'
            })
            console.log(333)
            this.callback()
          } else {
            this.$Message.error('请输入完整信息!')
          }
        })
      },
      modalCancel () {
        this.$refs['formValidate'].resetFields()
      },
      exportCard (data) {
        console.log(111)
        let linkElement = document.createElement('a')
        console.log(linkElement)
        linkElement.setAttribute('href', data.link)
        linkElement.setAttribute('download', data.name)
        linkElement.click()
        linkElement = null
        return true
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
