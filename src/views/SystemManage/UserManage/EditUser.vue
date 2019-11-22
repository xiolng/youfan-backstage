<template>
  <div class="add-user">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="用户名" prop="username">
        <Input v-model="formValidate.username" placeholder="请输入用户名"/>
      </FormItem>
      <FormItem label="电话" prop="phone">
        <Input v-model="formValidate.phone" placeholder="请输入电话"/>
      </FormItem>
      <FormItem label="角色" prop="roleId">
        <Select v-model="formValidate.roleId">
          <Option :value="item.id" v-for="item in roleList" :key="item.id">{{item.roleName}}</Option>
        </Select>
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
  import { getUserDetail, editUserDetail } from '@/api/systemManage/user' // 获取，编辑用户详情，
  import { getRoleList } from '@/api/systemManage/role' // 获取角色列表
  import { validPhone } from '@/utils' // 验证手机号码

  export default {
    props: {
      userId: String, // 编辑的用户id
      callback: Function // 成功返回
    },
    data () {
      /**
       * 检验手机号
       * @param rule
       * @param value
       * @param callback
       * @returns {*}
       */
      const validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'))
        } else {
          if (!validPhone(value)) {
            return callback(new Error('请输入正确手机号'))
          }
          callback()
        }
      }
      return {
        formValidate: {
          username: '',
          phone: '',
          roleId: []
        },
        ruleValidate: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { validator: validatePhone, trigger: 'change' }
          ],
          roleId: [
            { required: true, message: '请选择角色', trigger: 'change' }
          ],
        },
        roleList: []
      }
    },
    beforeMount () {
      this.getRole()
      // 获取用户详情
      getUserDetail({
        id: this.userId
      }).then(res => {
        this.formValidate = res.data.data
      })
    },
    methods: {
      // 获取角色列表
      getRole () {
        getRoleList().then(res => {
          this.roleList = res.data.data
        })
      },
      modalOk () {
        this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            editUserDetail({
              id: this.formValidate.id,
              username: this.formValidate.username,
              phone: this.formValidate.phone + '',
              roleId: [this.formValidate.roleId]
            }).then(res => {
              if (+res.data.code === 0) {
                this.$Message.success('编辑成功')
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
