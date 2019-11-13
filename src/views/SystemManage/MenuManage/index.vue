<template>
  <div class="menu-box">
    <!--菜单树-->
    <Tree
      :data="treeList"
      :render="renderContent"
      :arrow-size="20"
    ></Tree>
    <Modal
      v-model="showModal"
      :title="`${showAdd ? '新增' : showEdit ? '编辑' : '删除'}菜单`"
      :footer-hide="!showDel"
      @on-cancel="modalCancel"
      @on-ok="showDel ? delRole() : ''"
    >
      <!--添加菜单-->
      <AddMenu v-if="showAdd" :callback="addMenu" :menu-data="menuData"/>
      <EditMenu v-if="showEdit" :callback="addMenu" :menu-data="menuData"/>
      <!--删除角色-->
      <Row type="flex" justify="center" align="middle" :gutter="10" v-if="showDel">
        <Col>
          <Icon type="md-alert" color="#f90" size="30"></Icon>
        </Col>
        <Col>
          <span>确定删除吗 ？</span>
        </Col>
      </Row>
    </Modal>
  </div>
</template>

<script>
  import AddMenu from '@/views/SystemManage/MenuManage/AddMenu'
  import EditMenu from '@/views/SystemManage/MenuManage/EditMenu'
  import { deleteMenu, getMenuList } from '@/api/systemManage/menu'
  import {
    treeMenu, // 组合平级菜单数组
    rootFun, // 根级目录渲染
    renderContent // 树结构菜单按钮渲染
  } from '@/utils/menu'

  export default {
    data () {
      return {
        treeList: [
          {
            title: '菜单',
            expand: true,
            render: rootFun.bind(this),
            // 菜单列表
            children: []
          }
        ],
        showModal: false, // 弹窗组件，多个添加，编辑，删除，共用一个
        showAdd: false, // 添加弹窗
        showEdit: false, // 编辑弹窗
        showDel: false, // 删除弹窗
        menuData: {}, // 选中菜单内容
        renderContent: renderContent.bind(this) // 菜单列表 增删改 按钮
      }
    },
    beforeMount () {
      this.getList()
    },
    methods: {
      getList () {
        getMenuList().then(res => {
          this.treeList[0].children = treeMenu(res.data.data)
        })
      },
      // 添加菜单
      addMenu () {
        this.showModal = false
        this.showAdd = false
        this.showEdit = false
        this.showDel = false
        this.menuData = {}
        this.getList()
      },
      /**
       * 删除角色弹窗
       * @param data 获取删除id
       */
      removeRole (data) {
        this.removeRoleId = data.id
        this.showModal = true
        this.showDel = true
      },
      delRole () {
        deleteMenu({
          id: this.removeRoleId
        }).then(res => {
          if (+res.data.code === 0) {
            this.getList()
            this.$store.dispatch('commitMenus')
            this.$Message.success('删除成功')
            this.showDel = false
          }
        })
      },
      // 取消关闭弹窗
      modalCancel () {
        this.showModal = false
        this.showAdd = false
        this.showEdit = false
        this.showDel = false
        this.menuData = {}
      }
    },
    components: {
      AddMenu,
      EditMenu
    }
  }
</script>

<style scoped lang="stylus">
  .menu-box
    max-width 500px
    height 100%

  /deep/ .ivu-tree-children
    .ivu-tree-arrow
      margin-right 5px

      .ivu-icon
        font-size 20px
</style>
