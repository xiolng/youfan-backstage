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
  import { getExportList } from '@/api/payManage/ExportRun'

  export default {
    data () {
      return {
        columns1: [
          {
            title: '卡券',
            key: 'basicsName',
            ellipsis: true,
            minWidth: 150,
            tooltip: true
          },
          {
            title: '张数',
            key: 'number',
            ellipsis: true,
            minWidth: 50,
            tooltip: true
          },
          {
            title: 'excel名称',
            key: 'excelName',
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
          },
          {
            title: '导出人',
            key: 'createBy',
            ellipsis: true,
            minWidth: 50,
            tooltip: true
          },
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
        getExportList({
          ...this.pages,
          ...this.searchName
        }).then(res => {
          this.data1 = res.data.data
          this.total = res.data.total
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
