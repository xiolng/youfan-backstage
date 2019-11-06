<template>
  <div class="role-box">
    <!--搜索，新增-->
    <Row type="flex" justify="space-between">
      <Col>
        <SearchM @get-list="clickSearch"/>
      </Col>
      <Col>
        <Button size="default" type="primary" @click="showModal = !showModal,showAdd = !showAdd">新增</Button>
      </Col>
    </Row>
    <!--table列表-->
    <div class="table-box">
      <Table
        stripe
        :columns="columns1"
        :data="data1"
        size="default"
        class="table"
      >
        <!--操作-->
        <div slot="action" slot-scope="{row}">
          <Tooltip content="编辑" placement="top" transfer>
            <div class="icons" @click="editRole(row)">
              <Icon type="md-create" size="16"></Icon>
            </div>

          </Tooltip>
          <Tooltip content="删除" placement="top" transfer>
            <div @click="removeRole(row)">
              <Icon type="ios-trash" size="18"></Icon>
            </div>
          </Tooltip>
        </div>
      </Table>
    </div>
    <!--分页配置-->
    <PageM :total="total" :callback="setPage"/>

    <Modal
      v-model="showModal"
      :title="`${showAdd ? '新增' : showEdit ? '编辑' : '删除'}角色`"
      :footer-hide="!showDel"
      @on-cancel="closeModal"
      @on-ok="showDel ? delRole() : ''"
    >
      <!--添加角色-->
      <AddRole :callback="saveAdd" v-if="showAdd"></AddRole>
      <!--编辑用户-->
      <EditRole :callback="saveAdd" :role-id="roleId" v-if="showEdit"></EditRole>
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
  import AddRole from '@/views/SystemManage/RoleManage/AddRole' // 新增角色
  import EditRole from '@/views/SystemManage/RoleManage/EditRole' // 编辑角色
  import PageM from '@/components/PageC/PageC' // 分页
  import SearchM from '@/components/SearchC/SearchC' // 搜索框
  import { getRolePage, deleteRole } from '@/api/systemManage/role' // 接口

  export default {
    data () {
      return {
        columns1: [
          {
            title: '角色',
            key: 'roleName',
            ellipsis: true,
            minWidth: 150,
            tooltip: true
          },
          {
            title: '更新时间',
            key: 'updateTime',
            ellipsis: true,
            minWidth: 150,
            tooltip: true
          },
          {
            title: '创建时间',
            key: 'createTime',
            ellipsis: true,
            minWidth: 150,
            tooltip: true
          },
          {
            title: '创建人',
            key: 'createBy',
            ellipsis: true,
            minWidth: 150,
            tooltip: true
          },
          {
            title: '更新人',
            key: 'updateBy',
            ellipsis: true,
            minWidth: 150,
            tooltip: true
          },
          {
            title: '操作',
            key: 'action',
            slot: 'action',
            fixed: 'right',
            minWidth: 100
          }
        ],
        data1: [],
        showAdd: false, // 显示新增
        showEdit: false, // 显示编辑
        showDel: false, // 显示删除
        showModal: false, // 显示弹窗
        roleId: '', // 编辑某个id
        total: 0, // 总条数
        pages: 10, // 分页配置
        searchName: {}, // 搜索关键字
        removeRoleId: '' // 删除 id
      }
    },
    mounted () {
      this.getList()
    },
    methods: {
      /**
       * 获取角色列表
       * @param pages 当前页数
       * @param roleName 角色名
       */
      getList (pages = { beginPage: 1, limit: 10 }, roleName) {
        getRolePage({
          ...pages,
          ...roleName
        }).then(res => {
          this.data1 = res.data.data
          this.total = res.data.total
        })
      },
      /**
       * 跳转页
       * @param data
       */
      setPage (data) {
        this.pages = data
        this.getList(this.pages, this.searchName)
      },
      /**
       * 搜索关键字
       */
      clickSearch (data) {
        this.searchName = data
        this.getList(this.pages, this.searchName)
      },
      /**
       * 编辑角色
       * @param row 当前编辑角色信息
       */
      editRole (row) {
        this.roleId = row.id
        if (this.roleId) {
          this.showModal = true
          this.showEdit = true
        }
      },
      /**
       * 保存 新增编辑角色
       */
      saveAdd () {
        this.showModal = false
        this.showAdd = false
        this.showEdit = false
        this.getList()
      },
      /**
       * 删除角色
       * @param row 删除角色的信息
       */
      removeRole (row) {
        this.removeRoleId = row.id
        this.showModal = true
        this.showDel = true
      },
      delRole () {
        deleteRole({
          id: this.removeRoleId
        }).then(res => {
          if (+res.data.code === 0) {
            this.getList()
            this.$Message.success('删除成功')
            this.showDel = false
          }
        })
      },
      /**
       * 关闭弹窗
       */
      closeModal () {
        this.showModal = false
        this.showAdd = false
        this.showEdit = false
        this.showDel = false
      }
    },
    components: {
      AddRole,
      EditRole,
      SearchM,
      PageM
    }
  }
</script>

<style scoped lang="stylus">
  .table-box
    margin 20px 0

    /deep/ .table
      width calc(100vw - 280px) !important
      min-width 930px !important

    .icons
      margin-right 10px
</style>
