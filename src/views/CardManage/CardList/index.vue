<template>
  <div class="card-box">
    <!--搜索，导入卡券-->
    <Row type="flex" justify="space-between">
      <Col>
        <SearchM @get-list="clickSearch"/>
      </Col>
      <Col>
        <Button size="default" type="primary" @click="showModal = true, showAdd = true">
          <Icon type="md-nuclear"></Icon>
          生成卡券
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
        max-height="400"
        class="table"
        ref="table"
      >
      </Table>
    </div>
    <!--分页-->
    <Row type="flex" justify="space-between">
      <Col>
        <!--分页配置-->
        <PageM :total="total" :callback="setPage"/>
      </Col>
      <!--导出卡券-->
      <Col>
        <Button type="warning" @click="showModal = true, showExport = true">
          <Icon type="ios-download-outline"></Icon>
          导出卡券
        </Button>
      </Col>
    </Row>

    <Modal
      v-model="showModal"
      :title="`生成卡券`"
      footer-hide
      @on-cancel="closeModal"
    >
      <!--编辑卡券-->
      <AddCard :callback="closeModal" v-if="showAdd"></AddCard>
      <!--导出-->
      <ExportCard :callback="closeModal" v-if="showExport"></ExportCard>
    </Modal>
  </div>
</template>

<script>
  import AddCard from '@/views/CardManage/CardList/AddCard' // 分页
  import ExportCard from '@/views/CardManage/CardList/ExportCard'
  import SearchM from '@/components/SearchC/SearchC' // 搜索框
  import PageM from '@/components/PageC/PageC'
  import { getCardList } from '@/api/CardManageApi'

  export default {
    data () {
      return {
        columns1: [
          {
            title: '卡券名',
            key: 'basicsName'
          },
          {
            title: '卡券号',
            key: 'name'
          },
          {
            title: '价格',
            key: 'price'
          },
          {
            title: '次数',
            key: 'count'
          }
        ],
        data1: [],
        showModal: false,
        showAdd: false,
        showExport: false,
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
        getCardList({
          ...this.pages,
          ...this.searchName
        }).then(res => {
          this.data1 = res.data.data
        })
      },
      setPage (data) {
        this.pages = data
      },
      closeModal () {
        this.showModal = false
        this.showAdd = false
        this.showExport = false
        this.getList()
      },
      clickSearch (data) {
        this.searchName = data
      },
      exportsTable () {
        this.$refs.table.exportCsv({
          filename: '卡券列表'
        })
      }
    },
    components: {
      AddCard,
      ExportCard,
      SearchM,
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
