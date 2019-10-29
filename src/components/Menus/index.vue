<template>
  <div>
    <Menu
      :active-name="getMenuItem"
      :open-names="getMenuSub"
      theme="dark"
      width="auto"
      accordion
      :class="menuitemClasses"
      @on-select="SelectMenu"
      @on-open-change="OpenMenu"
    >
      <Submenu v-for="item in routes[0].children" :name="item.name" :key="item.name">
        <template slot="title">
          <Icon :type="item.icon"></Icon>
          {{item.name}}
        </template>
        <MenuItem v-for="list in item.children" :name="list.name" :key="list.name" :to="{name: list.name}">
          {{list.name}}
        </MenuItem>
      </Submenu>
    </Menu>
  </div>
</template>

<script>
  import routes from '@/router'
  import { mapMutations, mapGetters } from 'vuex'

  export default {
    props: {
      isCollapsed: Boolean
    },
    data () {
      return {
        routes,
        parentName: JSON.parse(localStorage.getItem('menuSub'))
      }
    },
    created () {
    },
    methods: {
      ...mapMutations({
        setBreadParent: 'SETBREADPARENT',
        setBreadName: 'SETBREADNAME',
        setMenuSub: 'SETMENUSUB',
        setMenuItem: 'SETMENUITEM',
      }),
      SelectMenu (e) {
        this.setMenuItem(e)
        this.setBreadName(e)
        this.setMenuSub(this.parentName)
        this.setBreadParent(this.parentName)
      },
      OpenMenu (e) {
        if (e.length >= 1) {
          this.parentName = e
        }
      }
    },
    computed: {
      ...mapGetters([
        'getBreadParent',
        'getBreadName',
        'getMenuSub',
        'getMenuItem'
      ]),
      menuitemClasses () {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
        ]
      },
    }
  }
</script>

<style scoped lang="stylus">
  .menu-icon
    transition all .3s

  .rotate-icon
    transform rotate(-90deg)

  .menu-item
    span
      display inline-block
      overflow hidden
      width 69px
      text-overflow ellipsis
      white-space nowrap
      vertical-align bottom
      transition width .2s ease .2s

    i
      transform translateX(0px)
      transition font-size .2s ease, transform .2s ease
      vertical-align middle
      font-size 16px

  .collapsed-menu
    span
      width 0px
      transition width .2s ease

    i
      transform translateX(5px)
      transition font-size .2s ease .2s, transform .2s ease .2s
      vertical-align middle
      font-size 22px
</style>
