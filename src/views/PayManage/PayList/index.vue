<template>
  <div class="user-box">
    <!--搜索-->
    <Row type="flex" justify="space-between">
      <Col>
        <SearchM @get-list="clickSearch"/>
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
        max-height="400"
        class="table"
      />
    </div>
    <!--分页配置-->
    <PageM :total="total" :callback="setPage"/>
  </div>
</template>

<script>
  import SearchM from '@/components/SearchM'
  import PageM from '@/components/PageM/PageM'

  export default {
    data () {
      return {
        columns1: [
          {
            title: '商铺名',
            key: 'name'
          },
          {
            title: '优惠信息',
            key: 'discountsMessage'
          },
          {
            title: '卡券次数',
            key: 'count'
          },
          {
            title: '更新时间',
            key: 'editTime'
          }
        ],
        data1: [
          {
            name: 'John Brown',
            discountsMessage: '满100减200',
            count: '3',
            editTime: '2016-10-03'
          },
          {
            name: 'Jim Green',
            discountsMessage: '满100减200',
            count: '13',
            editTime: '2016-10-03'
          },
          {
            name: 'Joe Black',
            discountsMessage: '满100减200',
            count: '23',
            editTime: '2016-10-03'
          },
          {
            name: 'Jon Snow',
            discountsMessage: '满100减200',
            count: '33',
            editTime: '2016-10-03'
          }
        ],
        total: 0,
        pages: {},
        searchName: {}
      }
    },
    methods: {
      clickSearch (data) {
        this.searchName = data
      },
      setPage (data) {
        this.pages = data
      }
    },
    components: {
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
