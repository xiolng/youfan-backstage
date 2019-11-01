<template>
  <div class="user-box">
    <!--搜索-->
    <Row type="flex" justify="space-between">
      <Col>
        <Input size="default" search enter-button="搜索" placeholder="请输入名称。。。"/>
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
    <!--分页-->
    <Page
      :total="100"
      show-sizer
      :current="4"
      show-total
    />
  </div>
</template>

<script>

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
      }
    },
    methods: {},
    components: {}
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
