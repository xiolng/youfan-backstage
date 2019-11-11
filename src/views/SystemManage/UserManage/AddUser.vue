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
  import { saveUser } from '@/api/systemManage/user' // 保存x新增用户
  import { getRoleList } from '@/api/systemManage/role' // 获取角色列表
  import { validPhone } from '@/utils' // 验证手机号码

  export default {
    props: {
      callback: Function // 返回操作成功
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
        /**
         * 表单
         */
        formValidate: {
          username: '',
          roleId: [],
          phone: ''
        },
        // 表单验证
        ruleValidate: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { validator: validatePhone, trigger: 'change blur' }
          ],
          roleId: [
            { required: true, message: '请选择角色', trigger: 'change' }
          ],
        },
        roleList: [] // 角色列表
      }
    },
    beforeMount () {
      this.getRole()
    },
    methods: {
      /**
       * 获取角色列表
       */
      getRole () {
        getRoleList().then(res => {
          this.roleList = res.data.data
        })
      },
      /**
       * 新增用户
       */
      modalOk () {
        this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            this.formValidate.phone = this.formValidate.phone + ''
            saveUser({
              ...this.formValidate,
              roleId: [this.formValidate.roleId]
            }).then(res => {
              if (+res.data.code === 0) {
                this.$Message.success('新增成功')
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
