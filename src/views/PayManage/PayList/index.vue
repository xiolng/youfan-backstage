<template>
  <div class="user-box">
    <!--搜索-->
    <Row type="flex" justify="space-between">
      <Col>
        <SearchC @get-list="clickSearch"/>
      </Col>
      <Col>

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
      />
    </div>
    <!--分页配置-->
    <PageM :total="total" :callback="setPage"/>
  </div>
</template>

<script>
  import SearchC from '@/components/SearchC/SearchC' // 搜索框
  import PageM from '@/components/PageC/PageC' // 分页
  import { getPayList } from '@/api/payManage/PayList'

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
            title: '会员名',
            key: 'memberName',
            ellipsis: true,
            minWidth: 150,
            tooltip: true
          },
          {
            title: '优惠信息',
            key: 'discountName',
            ellipsis: true,
            minWidth: 150,
            tooltip: true
          },
          {
            title: '价格',
            key: 'payMoney',
            ellipsis: true,
            minWidth: 150,
            tooltip: true
          },
          {
            title: '日期',
            key: 'createTime',
            ellipsis: true,
            minWidth: 150,
            tooltip: true
          }
        ],
        data1: [],
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
      getList () {
        getPayList({
          ...this.pages,
          ...this.searchName
        }).then(res => {
          this.data1 = res.data.data
        })
      },
      clickSearch (data) {
        this.searchName = data
        this.pages.beginPage = 1
        this.getList()
      },
      setPage (data) {
        this.pages = data
        this.getList()
      }
    },
    components: {
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
