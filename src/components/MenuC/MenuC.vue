<template>
  <div>
    <Menu
      v-if="menuList.length"
      :active-name="getMenuItem"
      :open-names="getMenuSub"
      theme="dark"
      width="auto"
      accordion
      :class="menuitemClasses"
      @on-select="SelectMenu"
      @on-open-change="OpenMenu"
    >
      <!--菜单循环-->
      <Submenu
        v-for="item in menuList"
        :name="item.title"
        :key="item.title"
      >
        <template slot="title">
          <Icon :type="item.icon"></Icon>
          <span>{{item.title}}</span>
        </template>
        <!--二级菜单-->
        <MenuItem
          v-for="list in item.children"
          :name="list.title"
          :key="list.title"
          :to="{path: `/${item.path}/${list.path}`}"
          class="side-item"
        >
          <span>
            <Icon :type="list.icon" color="#ccc"></Icon>
            {{list.title}}
          </span>
        </MenuItem>
      </Submenu>
    </Menu>
  </div>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  import { treeMenu } from '@/utils/menu'

  export default {
    props: {
      isCollapsed: Boolean
    },
    data () {
      return {
        parentName: JSON.parse(localStorage.getItem('menuSub'))
      }
    },
    beforeMount () {
      this.parentName = this.getMenuSub
      this.$store.dispatch('commitMenus')
    },
    methods: {
      ...mapMutations({
        setBreadParent: 'SETBREADPARENT',
        setBreadName: 'SETBREADNAME',
        setMenuSub: 'SETMENUSUB',
        setMenuItem: 'SETMENUITEM'
      }),
      // 菜单选择，设置缓存
      SelectMenu (e) {
        this.setMenuItem(e)
        this.setBreadName(e)
        this.setMenuSub(this.parentName)
        this.setBreadParent(this.parentName)
      },
      OpenMenu (e) {
        this.parentName = e
      }
    },
    computed: {
      ...mapGetters([
        'getBreadParent',
        'getBreadName',
        'getMenuSub',
        'getMenuItem',
        'getMenus'
      ]),
      // 菜单展开
      menuitemClasses () {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
        ]
      },
      menuList () {
        return treeMenu(this.getMenus)
      }
    }
  }
</script>

<style lang="stylus">
  /*二级菜单*/
  .menu-item
    span
      display inline-block
      overflow hidden
      width 120px
      text-overflow ellipsis
      white-space nowrap
      vertical-align bottom
      transition width .2s ease .2s

    i
      transform translateX(0px)
      transition font-size .2s ease, transform .2s ease
      vertical-align middle
      font-size 16px

  /*菜单收起时*/
  .collapsed-menu
    .ivu-menu-child-item-active
      .ivu-icon
        color #2d8cf0

    .ivu-menu-submenu-title
      padding 14px 16px

    .ivu-menu-submenu
      position relative

      &:hover
        .ivu-menu
          display block !important

      .ivu-menu-submenu-title-icon
        display none

    span
      width 0
      transition width .2s ease

    i
      transform translateX(5px)
      transition font-size .2s ease .2s, transform .2s ease .2s
      vertical-align middle
      font-size 22px

    .ivu-menu
      background #555
      position absolute
      display none
      top 0
      left 64px

      span
        width auto
</style>
