<template>
  <div class="user-box">
    <!--搜索，新增-->
    <Row type="flex" justify="space-between">
      <Col>
        <Input
          v-model="searchName"
          size="default"
          search
          enter-button="搜索"
          placeholder="请输入用户名。。。"
          @on-search="clickSearch"
          @on-enter="clickSearch"
        />
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
        max-height="520"
        class="table"
      >
        <!--操作-->
        <template slot-scope="{row}" slot="action">
          <Tooltip content="编辑" placement="top" transfer>
            <div class="icons" @click="editUser(row)">
              <Icon type="md-create" size="16"></Icon>
            </div>

          </Tooltip>
          <Tooltip content="删除" placement="top" transfer>
            <div @click="removeUser(row)">
              <Icon type="ios-trash" size="18"></Icon>
            </div>
          </Tooltip>
        </template>
      </Table>
    </div>
    <!--分页-->
    <Page
      :total="total"
      show-sizer
      :current="current"
      show-total
      @on-change="setPage"
      :page-size="limit"
      @on-page-size-change="setPageSize"
    />

    <Modal
      v-model="showModal"
      :title="`${showAdd ? '新增' : showEdit ? '编辑' : '删除'}用户`"
      :footer-hide="!showDel"
      @on-cancel="closeModal"
      @on-ok="showDel ? delUser() : ''"
    >
      <!--添加用户-->
      <AddUser :callback="saveAdd" v-if="showAdd"></AddUser>
      <!--编辑用户-->
      <EditUser :callback="saveAdd" :user-id="userId" v-if="showEdit"></EditUser>
      <!--删除用户-->
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
  import AddUser from '@/views/SystemManage/UserManage/AddUser' // 新增用户
  import EditUser from '@/views/SystemManage/UserManage/EditUser' // 编辑用户
  import { getUserList, deleteUser } from '@/api/systemManage/user' // 接口

  export default {
    data () {
      return {
        // 表格header
        columns1: [
          {
            title: '用户名',
            key: 'username',
            ellipsis: true,
            minWidth: 150,
            tooltip: true
          },
          {
            title: '角色',
            key: 'roleName',
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
            title: '更新时间',
            key: 'updateTime',
            ellipsis: true,
            minWidth: 150,
            tooltip: true
          },
          {
            title: '电话',
            key: 'phone',
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
            title: '操作',
            key: 'action',
            slot: 'action',
            fixed: 'right',
            minWidth: 100
          }
        ],
        data1: [], // 表格列表
        showAdd: false, // 显示新增
        showEdit: false, // 显示编辑
        showDel: false, // 显示删除
        showModal: false, // 显示弹窗
        userId: '', // 编辑某个id
        current: 1, // 当前页
        total: 1110, // 总条数
        limit: 10, // 每页条数
        searchName: '', // 搜索关键字
        removeUserId: '' // 删除 id
      }
    },
    mounted () {
      this.getList()
    },
    methods: {
      /**
       * 获取用户列表
       * @param beginPage 当前页数
       * @param limit 每页条数
       * @param username 用户名
       */
      getList (beginPage = 1, limit, username) {
        getUserList({
          beginPage,
          username,
          limit
        }).then(res => {
          this.data1 = res.data.data
          this.total = res.data.total
        })
      },
      /**
       * 跳转页
       * @param num
       */
      setPage (num) {
        this.getList(num, this.limit, this.searchName)
        this.current = num
      },
      /**
       * 每页条数
       * @param num
       */
      setPageSize (num) {
        this.getList(this.current, num, this.searchName)
      },
      /**
       * 搜索关键字
       */
      clickSearch () {
        this.getList(this.current, this.limit, this.searchName)
      },
      /**
       * 编辑用户
       * @param row 当前编辑用户信息
       */
      editUser (row) {
        this.userId = row.id
        if (this.userId) {
          this.showModal = true
          this.showEdit = true
        }
      },
      /**
       * 保存 新增编辑用户
       */
      saveAdd () {
        this.showModal = false
        this.showAdd = false
        this.showEdit = false
        this.getList()
      },
      /**
       * 删除用户
       * @param row 删除用户的信息
       */
      removeUser (row) {
        this.removeUserId = row.id
        this.showModal = true
        this.showDel = true
      },
      delUser () {
        deleteUser({
          id: this.removeUserId
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
      AddUser,
      EditUser
    }
  }
</script>

<style scoped lang="stylus">
  .table-box
    margin 20px 0

    /deep/ .table
      width calc(100vw - 280px) !important

    .icons
      margin-right 10px
</style>
