<template>
  <div class="user-box">
    <Dropdown>
      <Avatar size="default" :style="{background: iconBg}">{{userName.split('')[0]}}</Avatar>
      <span class="name-txt">{{userName}}</span>
      <Icon type="md-arrow-dropdown" size="18"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem>退出</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        userName: 'Xiolng',
        iconBg: ''
      }
    },
    mounted () {
      this.setBg()
    },
    methods: {
      setBg () {
        let r = Math.floor(Math.random() * 255)
        let g = Math.floor(Math.random() * 255)
        let b = Math.floor(Math.random() * 255)
        this.iconBg = `rgb(${r},${g},${b})`
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
