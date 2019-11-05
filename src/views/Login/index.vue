<template>
  <div class="login-box">
    <div class="login-module">
      <div class="login-title">
        <Row type="flex" justify="center">
          <Col>登 录</Col>
        </Row>
      </div>
      <div class="login-content">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="用户名" prop="userName">
            <Input v-model="formValidate.userName" placeholder="请输入用户名">
              <Icon type="ios-person-outline" slot="prepend" size="18"></Icon>
            </Input>
          </FormItem>
          <FormItem label="密码" prop="password">
            <Input type="password" v-model="formValidate.password" placeholder="请输入密码">
              <Icon type="ios-lock-outline" slot="prepend" size="18"></Icon>
            </Input>
          </FormItem>
        </Form>
      </div>
      <div class="login-footer">
        <Row type="flex" justify="center">
          <Col span="24">
            <Button type="primary" @click="handleSubmit('formValidate')" long>登录</Button>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
  import { setLogin } from '@/api/login'

  export default {
    data () {
      return {
        formValidate: {
          userName: '',
          password: '',
        },
        ruleValidate: {
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
        }
      }
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            setLogin(this.formValidate).then(res => {
              if (+res.data.code === 0) {
                this.$Message.success('编辑成功!')
                this.$refs[name].resetFields()
                this.$router.push('/')
              }
            })
          } else {
            this.$Message.error('请输入完整信息!')
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  .login-box
    display flex
    align-items center
    justify-content center
    position relative
    width 100%
    background #f9f9f9

    .login-module
      min-width 300px
      background #fff
      padding 20px
      box-shadow 0 0 8px rgba(0, 0, 0, .2)
      border 1px solid #ccc
      border-radius 10px
      margin-top -10%

      .login-title
        padding-bottom 20px
        color #2d8cf0
        font-size 20px
        position relative

        .icon-login
          position absolute
          left 50%
          top -20px
</style>
