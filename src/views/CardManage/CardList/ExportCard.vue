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
      <FormItem label="张" prop="cardVolumeNumber">
        <Input v-model="formValidate.cardVolumeNumber" placeholder="请输入张数"/>
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
      listNum: Array,
      callback: Function
    },
    data () {
      return {
        // form表单
        formValidate: {
          basicsId: '',
          cardVolumeNumber: '',
        },
        // 表单验证
        ruleValidate: {
          basicsId: [
            { required: true, message: '请输入卡券名', trigger: 'blur' }
          ],
          cardVolumeNumber: [
            { required: true, message: '请输入张数', trigger: 'blur' }
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
      // 获取卡券信息列表
      getList () {
        getAllCardMessageList().then(res => {
          this.cardList = res.data.data
        })
      },
      // 提交表单
      modalOk () {
        this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            let activeId = this.listNum.filter(v => v.id === this.formValidate.basicsId)
            if (+activeId[0].sumUnused <= (+this.formValidate.cardVolumeNumber + 1)) {
              this.$Message.error('卡券不足，请重新生成卡券')
              return false
            }
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
      /**
       * 获取所选卡券
       * 设置导出卡券名称
       * @param data
       */
      setExcelName (data) {
        let dates = new Date()
        this.excelName = `${data.label}-${dates.getFullYear()}-${dates.getMonth() + 1}-${dates.getDay()}-${dates.getHours()}-${dates.getMinutes()}-${dates.getSeconds()}`
      },
      /**
       * 导出卡券
       * @param data
       * @returns {boolean}
       */
      exportCard (data) {
        let linkElement = document.createElement('a')
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
