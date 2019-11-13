<template>
  <div class="user-box">
    <Dropdown>
      <!--用户头像-->
      <Avatar size="default" :style="{background: iconBg}">{{userName && userName.split('')[0].toLocaleUpperCase()}}
      </Avatar>
      <!--用户名称-->
      <span class="name-txt">{{userName}}</span>
      <Icon type="md-arrow-dropdown" size="18"></Icon>
      <!--选择列表-->
      <DropdownMenu slot="list">
        <DropdownItem>
          <div @click="outLogin">
            退出
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
  import { getUserDetail, setOutLogin } from '@/api/login'

  export default {
    data () {
      return {
        userName: '',
        iconBg: ''
      }
    },
    beforeMount () {
      this.setBg()
      // 获取用户详情
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      if (!userInfo || !userInfo.userName) this.getUserInfo()
    },
    methods: {
      // 获取用户详情
      getUserInfo () {
        getUserDetail().then(res => {
          localStorage.setItem('userInfo', JSON.stringify(res.data.data))
          this.userName = res.data.data.username
        })
      },
      // 目前没有图片,模拟背景色
      setBg () {
        let r = Math.floor(Math.random() * 255)
        let g = Math.floor(Math.random() * 255)
        let b = Math.floor(Math.random() * 255)
        this.iconBg = `rgb(${r},${g},${b})`
      },
      // 退出登录
      outLogin () {
        setOutLogin().then(res => {
          if (+res.data.code === 0) {
            localStorage.clear()
            this.$router.push('/signin')
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus">

  .user-box
    margin-right 20px
    cursor default

    .name-txt
      margin 0 10px

</style>
