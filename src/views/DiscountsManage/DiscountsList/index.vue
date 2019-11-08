<template>
  <div class="user-box">
    <!--搜索，新增-->
    <Row type="flex" justify="space-between">
      <Col>
        <SearchC @get-list="clickSearch"/>
      </Col>
      <Col>
        <Button size="default" type="primary" @click="showModal = true, showAdd = !showAdd">新增</Button>
      </Col>
    </Row>
    <!--table列表-->
    <div class="table-box">
      <Table
        stripe
        :columns="columns1"
        :data="data1"
        size="default"
        max-height="400"
        class="table"
      >
        <!--操作-->
        <template slot-scope="{row}" slot="action">
          <Tooltip content="编辑" placement="top" transfer>
            <div class="icons" @click="discountId = row.id, showModal = true, showEdit = !showEdit">
              <Icon type="md-create" size="16"></Icon>
            </div>

          </Tooltip>
          <Tooltip content="删除" placement="top" transfer>
            <div @click="discountId = row.id, showModal = true, showDel = !showDel">
              <Icon type="ios-trash" size="18"></Icon>
            </div>
          </Tooltip>
        </template>
      </Table>
    </div>
    <!--分页配置-->
    <PageM :total="total" :callback="setPage"/>
    <Modal
      v-model="showModal"
      :title="`${showAdd ? '新增' : showEdit ? '编辑' : '删除'}优惠信息`"
      :footer-hide="!showDel"
      @on-cancel="closeModal"
      @on-ok="showDel ? delDiscounts() : ''"
    >
      <!--新增优惠信息-->
      <AddDiscounts :callback="closeModal" v-if="showAdd"></AddDiscounts>
      <EditDiscounts :callback="closeModal" v-if="showEdit" :discount-id="discountId"></EditDiscounts>
      <!--删除优惠信息-->
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
  import AddDiscounts from '@/views/DiscountsManage/DiscountsList/AddDiscounts'
  import SearchC from '@/components/SearchC/SearchC' // 搜索框
  import PageM from '@/components/PageC/PageC' // 分页
  import { getDiscountsList, deleteDiscounts } from '@/api/discountsManage/DiscountsApi'
  import EditDiscounts from '@/views/DiscountsManage/DiscountsList/EditDiscounts'

  export default {
    data () {
      return {
        columns1: [
          {
            title: '优惠名',
            key: 'discountName',
            ellipsis: true,
            minWidth: 150,
            tooltip: true
          },
          {
            title: '优惠信息',
            key: 'discountDetails',
            ellipsis: true,
            minWidth: 150,
            tooltip: true
          },
          {
            title: '规则',
            key: 'discountRule',
            ellipsis: true,
            minWidth: 150,
            tooltip: true
          },
          {
            title: '备注',
            key: 'remarks',
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
            key: 'updataTime',
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
        total: 0,
        pages: {
          beginPage: 1,
          limit: 10
        },
        searchName: {},
        discountId: ''
      }
    },
    beforeMount () {
      this.getList()
    },
    methods: {
      getList () {
        getDiscountsList({
          ...this.pages,
          ...this.searchName
        }).then(res => {
          this.data1 = res.data.data
          this.total = res.data.total
        })
      },
      saveAdd () {
        this.showAdd = false
      },
      delDiscounts () {
        deleteDiscounts({
          id: this.discountId
        }).then(res => {
          if (+res.data.code === 0) {
            this.$Message.success('删除成功')
            this.closeModal()
          }
        })
      },
      closeModal () {
        this.showModal = false
        this.showAdd = false
        this.showEdit = false
        this.showDel = false
        this.getList()
      },
      setPage (data) {
        this.pages = data
      },
      clickSearch (data) {
        this.searchName = data
        this.getList()
      }
    },
    components: {
      EditDiscounts,
      AddDiscounts,
      SearchC,
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
