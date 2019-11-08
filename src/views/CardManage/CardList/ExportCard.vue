<template>
  <div class="add-user">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="卡券名" prop="basicsId">
        <Select
          v-model="formValidate.basicsId"
          @on-change="setExcelName"
          label-in-value
        >
          <Option v-for="item in cardList" :key="item.id" :value="item.id">{{item.name}}</Option>
        </Select>
      </FormItem>
      <FormItem label="次数" prop="cardVolumeNumber">
        <Input v-model="formValidate.cardVolumeNumber" placeholder="请输入次数"/>
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
  import { cardExport } from '@/api/CardManageApi'
  import { getAllCardMessageList } from '@/api/baseManage/CardMessageApi'

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
            { required: true, message: '请输入次数', trigger: 'blur change' }
          ],
        },
        cardList: [],
        excelName: ''
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
            cardExport(this.formValidate).then(res => {
              if (res.data) {
                this.exportCard({
                  link: res.data,
                  name: this.excelName
                })
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
      },
      setExcelName (data) {
        let dates = new Date()
        this.excelName = `${data.label}-${dates.getFullYear()}-${dates.getMonth() + 1}-${dates.getDay()}-${dates.getHours()}-${dates.getMinutes()}-${dates.getSeconds()}`
      },
      exportCard (data) {
        let linkElement = document.createElement('a')
        console.log(linkElement)
        linkElement.setAttribute('href', window.URL.createObjectURL(data.link))
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
