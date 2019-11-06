<template>
  <div class="Shop-box">
    <!--搜索，新增-->
    <Row type="flex" justify="space-between">
      <Col>
        <SearchM @get-list="clickSearch"/>
      </Col>
      <Col>
        <Button size="default" type="primary" @click="showModal = true, showAdd = true">新增</Button>
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
            <div class="icons" @click="shopId = row.id, showModal = true, showEdit = true">
              <Icon type="md-create" size="16"></Icon>
            </div>

          </Tooltip>
          <Tooltip content="删除" placement="top" transfer>
            <div @click="shopId = row.id, showModal = true, showDel = !showDel">
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
      :title="`${showAdd ? '新增' : showEdit ? '编辑' : '删除'}商铺`"
      :footer-hide="!showDel"
      @on-cancel="closeModal"
      @on-ok="showDel ? delShop() : ''"
    >
      <!--新增商铺-->
      <AddShop :callback="closeModal" v-if="showAdd"></AddShop>
      <EditShop :shop-id="shopId" :callback="closeModal" v-if="showEdit"></EditShop>
      <!--删除商铺-->
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
  import AddShop from '@/views/ShopManage/ShopList/AddShop'
  import EditShop from '@/views/ShopManage/ShopList/EditShop'
  import SearchM from '@/components/SearchC/SearchC' // 搜索框
  import PageM from '@/components/PageC/PageC' // 分页
  import { getShopList, deleteShop } from '@/api/ShopApi'

  export default {
    data () {
      return {
        columns1: [
          {
            title: '商铺名',
            key: 'shopName',
            ellipsis: true,
            minWidth: 150,
            tooltip: true
          },
          {
            title: '联系电话',
            key: 'phone',
            ellipsis: true,
            minWidth: 150,
            tooltip: true
          },
          {
            title: '地址',
            key: 'addressDetails',
            ellipsis: true,
            minWidth: 150,
            tooltip: true
          },
          {
            title: '营业时间',
            key: 'beginTime',
            minWidth: 150,
            render (h, params) {
              return h('Tooltip', {
                props: {
                  content: `${params.row.beginTime} -- ${params.row.endTime}`,
                  transfer: true
                }
              }, [
                h('span', params.row.beginTime),
                h('span', ' -- '),
                h('span', params.row.endTime)
              ])
            }
          },
          {
            title: '优惠信息',
            key: 'discountName',
            ellipsis: true,
            minWidth: 150,
            tooltip: true,
            render (h, params) {
              return h('Tooltip', {
                  props: {
                    content: params.row.discountName.join(', '),
                    transfer: true
                  }
                },
                params.row.discountName.map(v => h('span', `${v},`))
              )
            }
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
        shopId: ''
      }
    },
    beforeMount () {
      this.getList()
    },
    methods: {
      // 获取列表
      getList () {
        getShopList({
          ...this.pages,
          ...this.searchName
        }).then(res => {
          this.data1 = res.data.data
          this.total = res.data.total
        })
      },
      // 删除列表
      delShop () {
        deleteShop({ id: this.shopId }).then(res => {
          if (+res.data.code === 0) {
            this.$Message.success('删除成功')
            this.closeModal()
          }
        })
      },
      // 跳转分页
      setPage (data) {
        this.pages = data
        this.getList(this.pages, this.searchName)
      },
      // 关闭弹窗
      closeModal () {
        this.showModal = false
        this.showAdd = false
        this.showEdit = false
        this.showDel = false
        this.getList()
      },
      // 搜索
      clickSearch (data) {
        this.searchName = data
        this.getList(this.pages, this.searchName)
      }
    },
    components: {
      AddShop,
      EditShop,
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
