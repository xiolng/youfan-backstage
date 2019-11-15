<template>
  <div class="Equity-box">
    <!--搜索，新增-->
    <Row type="flex" justify="space-between">
      <Col>
        <SearchC @get-list="clickSearch"/>
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
        class="table"
      >
        <!--操作-->
        <template slot-scope="{row}" slot="action">
          <Tooltip content="编辑" placement="top" transfer>
            <div class="icons" @click="EquityId = row.id, showModal = true, showEdit = true">
              <Icon type="md-create" size="16"></Icon>
            </div>

          </Tooltip>
          <Tooltip content="删除" placement="top" transfer>
            <div @click="EquityId = row.id, showModal = true, showDel = !showDel">
              <Icon type="ios-trash" size="18"></Icon>
            </div>
          </Tooltip>
        </template>
      </Table>
    </div>
    <!--分页配置-->
    <PageM :total="total" :callback="setPage"/>
    <Modal
      width="552"
      v-model="showModal"
      :title="`${showAdd ? '新增' : showEdit ? '编辑' : '删除'}权益券`"
      :footer-hide="!showDel"
      @on-cancel="closeModal"
      @on-ok="showDel ? delEquity() : ''"
    >
      <!--新增权益券-->
      <AddEquity :callback="closeModal" v-if="showAdd"></AddEquity>
      <EditEquity :equity-id="EquityId" :callback="closeModal" v-if="showEdit"></EditEquity>
      <!--删除权益券-->
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
  import AddEquity from '@/views/EquityManage/EquityList/AddEquity'
  import EditEquity from '@/views/EquityManage/EquityList/EditEquity'
  import SearchC from '@/components/SearchC/SearchC' // 搜索框
  import PageM from '@/components/PageC/PageC' // 分页
  import { getEquityList, deleteEquity } from '@/api/EquityApi'

  export default {
    data () {
      return {
        columns1: [
          {
            title: '权益券名',
            key: 'equityName',
            ellipsis: true,
            minWidth: 150,
            tooltip: true
          },
          {
            title: '关联商铺',
            key: 'shopName',
            ellipsis: true,
            minWidth: 130,
            render (h, params) {
              return h('Tooltip', {
                props: {
                  transfer: true,
                  maxWidth: 300,
                  theme: 'light'
                }
              }, [
                h('template', {
                    slot: 'content',
                  },
                  [
                    h('div', {
                      style: {
                        height: '300px',
                        overflow: 'hidden',
                        overflowY: 'auto'
                      }
                    }, params.row.shopName.map(v => h('Tag', {
                      props: {
                        // type: 'border',
                        color: 'warning'
                      }
                    }, v)))
                  ]
                ),
                h('div', {
                  style: {
                    maxWidth: '130px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }
                }, [
                  params.row.shopName.map(v => h('span', `${v},`))
                ])
              ])
            }
          },
          {
            title: '权益详情',
            key: 'equityDetails',
            ellipsis: true,
            minWidth: 150,
            tooltip: true
          },
          {
            title: '库存',
            key: 'stock',
            minWidth: 100
          },
          {
            title: '价格',
            key: 'price',
            minWidth: 100,
          },
          {
            title: '已售',
            key: 'salesCount',
            minWidth: 100,
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
        EquityId: ''
      }
    },
    beforeMount () {
      this.getList()
    },
    methods: {
      // 获取列表
      getList () {
        getEquityList({
          ...this.pages,
          ...this.searchName
        }).then(res => {
          this.data1 = res.data.data
          this.total = res.data.total
        })
      },
      // 删除列表
      delEquity () {
        deleteEquity({ id: this.EquityId }).then(res => {
          if (+res.data.code === 0) {
            this.$Message.success('删除成功')
            this.closeModal()
          }
        })
      },
      // 跳转分页
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
      // 搜索
      clickSearch (data) {
        this.searchName = data
        this.pages.beginPage = 1
        this.getList()
      }
    },
    components: {
      AddEquity,
      EditEquity,
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
