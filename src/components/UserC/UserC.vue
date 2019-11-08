<template>
  <div class="user-box">
    <Dropdown>
      <Avatar size="default" :style="{background: iconBg}">{{userName && userName.split('')[0].toLocaleUpperCase()}}
      </Avatar>
      <span class="name-txt">{{userName}}</span>
      <Icon type="md-arrow-dropdown" size="18"></Icon>
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
      getUserDetail().then(res => {
        this.userName = res.data.data.username
      })
    },
    methods: {
      setBg () {
        let r = Math.floor(Math.random() * 255)
        let g = Math.floor(Math.random() * 255)
        let b = Math.floor(Math.random() * 255)
        this.iconBg = `rgb(${r},${g},${b})`
      },
      outLogin () {
        setOutLogin().then(res => {
          if (+res.data.code === 0) {
            localStorage.clear()
            this.$router.push('/')
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
