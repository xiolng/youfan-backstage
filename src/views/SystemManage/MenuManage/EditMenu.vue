<template>
  <div class="add-user">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="上级菜单">
        <Input :value="menuId.parent.title" disabled/>
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
  import { getMenuDetail, editMenuDetail } from '@/api/systemManage/menu'

  export default {
    props: {
      callback: Function,
      menuId: Object
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
    mounted () {
      this.getMenuDetils()
    },
    methods: {
      getMenuDetils () {
        getMenuDetail({
          id: this.menuId.id
        }).then(res => {
          this.formValidate = res.data.data
        })
      },
      modalOk () {
        this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            editMenuDetail({
              id: this.formValidate.id,
              parentId: this.formValidate.parentId,
              icon: this.formValidate.icon,
              path: this.formValidate.path
            }).then(res => {
              if (+res.data.code === 0) {
                this.$Message.success('Success!')
                this.$refs['formValidate'].resetFields()
                this.callback()
              }
            })
          } else {
            this.$Message.error('Fail!')
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
