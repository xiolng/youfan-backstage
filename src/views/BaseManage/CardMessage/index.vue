<template>
  <div class="card-box">
    <!--搜索，导入卡券-->
    <Row type="flex" justify="space-between">
      <Col>
        <SearchC @get-list="clickSearch"/>
      </Col>
      <Col>
        <Button size="default" type="primary" @click="showModal = true, showAdd = true">
          <Icon type="md-add"></Icon>
          新建
        </Button>
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
        ref="table"
      >
        <!--操作-->
        <template slot-scope="{row}" slot="action">
          <Tooltip content="编辑" placement="top" transfer>
            <div class="icons" @click="cardId = row.id, showModal = true, showEdit = !showEdit">
              <Icon type="md-create" size="16"></Icon>
            </div>

          </Tooltip>
          <Tooltip content="删除" placement="top" transfer>
            <div @click="cardId = row.id, showModal = true, showDel = !showDel">
              <Icon type="ios-trash" size="18"></Icon>
            </div>
          </Tooltip>
        </template>
      </Table>
    </div>
    <!--分页-->
    <Row type="flex" justify="space-between">
      <Col>
        <!--分页配置-->
        <PageM :total="total" :callback="setPage"/>
      </Col>
    </Row>

    <!--增删改弹窗-->
    <Modal
      v-model="showModal"
      :title="`${showAdd ? '新增' : showEdit ? '编辑' : '删除'}卡券`"
      :footer-hide="!showDel"
      @on-cancel="closeModal"
      @on-ok="showDel ? delCard() : ''"
    >
      <!--编辑卡券-->
      <AddCardMessage :callback="closeModal" v-if="showAdd"></AddCardMessage>
      <EditCardMessage :card-id="cardId" :callback="closeModal" v-if="showEdit"></EditCardMessage>
      <!--删除卡券-->
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
  import AddCardMessage from '@/views/BaseManage/CardMessage/AddCardMessage'
  import EditCardMessage from '@/views/BaseManage/CardMessage/EditCardMessage'
  import SearchC from '@/components/SearchC/SearchC' // 搜索框
  import PageM from '@/components/PageC/PageC' // 分页
  import { getCardMessageList, deleteCardMessage } from '@/api/baseManage/CardMessageApi'

  export default {
    data () {
      return {
        columns1: [
          {
            title: '卡券名',
            key: 'name',
            ellipsis: true,
            minWidth: 150,
            tooltip: true
          },
          {
            title: '价格',
            key: 'price',
            ellipsis: true,
            minWidth: 150,
            tooltip: true
          },
          {
            title: '次数',
            key: 'discountsNumber',
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
            title: '创建时间',
            key: 'createTime',
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
            title: '更新时间',
            key: 'updateTime',
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
        showModal: false,
        showAdd: false,
        showEdit: false,
        showDel: false,
        cardId: '',
        total: 0,
        pages: {
          beginPage: 1,
          limit: 10
        },
        searchName: {}
      }
    },
    beforeMount () {
      this.getList()
    },
    methods: {
      // 获取列表
      getList () {
        getCardMessageList({
          ...this.pages,
          ...this.searchName
        }).then(res => {
          this.data1 = res.data.data
          this.total = res.data.total
        })
      },
      // 保存增删改
      saveAdd () {
        this.showAdd = false
      },
      // 删除列表
      delCard () {
        deleteCardMessage({ id: this.cardId }).then(res => {
          if (+res.data.code === 0) {
            this.$Message.success('删除成功')
            this.closeModal()
          }
        })
      },
      // 设置分页
      setPage (data) {
        this.pages = data
        this.getList()
      },
      // 关闭弹窗
      closeModal () {
        this.showModal = false
        this.showAdd = false
        this.showEdit = false
        this.showDel = false
        this.getList()
      },
      // 搜索关键字
      clickSearch (data) {
        this.searchName = data
        this.getList()
      }
    },
    components: {
      AddCardMessage,
      EditCardMessage,
      SearchC,
      PageM
    }
  }
</script>

<style scoped lang="stylus">
  .card-box

    .table-box
      margin 20px 0
      /*table展示*/

      /deep/ .table
        width calc(100vw - 280px) !important
        min-width 930px !important

      .icons
        margin-right 10px

    // 上传加载

    .spin-box
      position fixed
      left 0
      right 0
      top 0
      bottom 0
      z-index 999

      .progress-box
        width 50vw
</style>
