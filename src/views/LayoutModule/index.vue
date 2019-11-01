<template>
  <div id="layouts">
    <Layout>
      <!--左侧 侧边栏-->
      <Sider ref="side1" hide-trigger collapsible v-model="isCollapsed">
        <!--logo-->
        <!--logo-->
        <div class="logo-box">
          <img src="../../assets/logo.png" alt="">
        </div>
        <!--菜单-->
        <Menus :is-collapsed="isCollapsed"/>
      </Sider>
      <Layout>
        <!--头部信息-->
        <Header :style="{padding: 0}" class="layout-header-bar">
          <Row type="flex" justify="space-between" align="middle">
            <Col>
              <!--收起菜单，面包屑-->
              <Row type="flex" justify="start">
                <Col>
                  <!--trigger--menu-->
                  <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu"
                        size="24"></Icon>
                </Col>
                <Col>
                  <!--面包屑-->
                  <Breadcrumbs/>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row type="flex" justify="end" :gutter="20">
                <Col>
                  <!--全屏-->
                  <FullScreen/>
                </Col>
                <Col>
                  <!--用户-->
                  <Users/>
                </Col>
              </Row>
            </Col>
          </Row>
        </Header>
        <Content class="layouts-content">
          <router-view/>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
  import Menus from '@/components/Menus'
  import Breadcrumbs from '@/components/Breadcrumbs'
  import FullScreen from '@/components/FullScreen'
  import Users from '@/components/Users'

  export default {
    data () {
      return {
        isCollapsed: false
      }
    },
    computed: {
      // 收起菜单
      rotateIcon () {
        return [
          'menu-icon',
          this.isCollapsed ? 'rotate-icon' : ''
        ]
      },
    },
    methods: {
      // 绑定收起菜单按钮
      collapsedSider () {
        this.$refs.side1.toggleCollapse()
      }
    },
    components: {
      Menus,
      Breadcrumbs,
      FullScreen,
      Users
    }
  }
</script>

<style scoped lang="stylus">
  #layouts
    border 1px solid #d7dde4
    background #f5f7f9
    position relative
    border-radius 4px
    overflow hidden
    display flex
    width 100%
    min-width 1200px
    min-height 100vh

    .layout-header-bar
      background #fff
      box-shadow 0 1px 1px rgba(0, 0, 0, .1)

    .layout-logo-left
      width 90%
      height 30px
      background #5b6270
      border-radius 3px
      margin 15px auto

    .menu-icon
      transition all .3s

    .rotate-icon
      transform rotate(-90deg)

    .logo-box
      height 64px
      line-height 64px
      text-align center
      border-bottom 1px solid #999
      box-shadow 0 1px 1px rgba(255, 255, 255, .1)

      img
        height 70%
        vertical-align middle

    .layouts-content
      min-width 920px
      margin 20px
      background #fff
      padding 20px

</style>
