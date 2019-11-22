<template>
  <div class="add-user">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="上级菜单">
        <Input :value="menuData.data.title" disabled/>
      </FormItem>
      <FormItem label="地址" prop="path">
        <Input v-model="formValidate.path" placeholder="请输入地址名"/>
      </FormItem>
      <FormItem label="菜单名" prop="title">
        <Input v-model="formValidate.title" placeholder="请输入菜单名"/>
      </FormItem>
      <FormItem label="icon" prop="icon">
        <Input v-model="formValidate.icon" placeholder="请输入icon名"/>
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
  import { saveMenu } from '@/api/systemManage/menu'

  export default {
    props: {
      callback: Function,
      menuData: Object
    },
    data () {
      return {
        formValidate: {
          title: '',
          icon: '',
          path: ''
        },
        ruleValidate: {
          title: [
            { required: true, message: '请输入角色名', trigger: 'blur' }
          ],
        }
      }
    },
    beforeMount () {
      if (this.activeData && this.activeData.title) this.formValidate = this.activeData
    },
    methods: {
      modalOk () {
        this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            saveMenu({
              parentId: this.menuData.data.id,
              ...this.formValidate
            }).then(res => {
              if (+res.data.code === 0) {
                this.$Message.success('编辑成功!')
                this.$store.dispatch('commitMenus')
                this.$refs['formValidate'].resetFields()
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
