<template>
  <div class="user-box">
    <Dropdown>
      <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" size="default"/>
      <span class="name-txt">xiolng</span>
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
      return {}
    }
  }
</script>

<style scoped lang="stylus">

  .user-box
    margin-right 20px
    .name-txt
      margin 0 10px

</style>
