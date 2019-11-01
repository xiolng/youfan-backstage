<template>
  <div class="card-box">
    <!--搜索，导入卡券-->
    <Row type="flex" justify="space-between">
      <Col>
        <Input size="default" search enter-button="搜索" placeholder="请输入卡券名。。。"/>
      </Col>
      <Col>
        <Upload action="/">
          <Button size="default" type="primary">
            <Icon type="ios-cloud-upload-outline"></Icon>
            导入卡券
          </Button>
        </Upload>
        <div class="spin-box" v-if="progressNum">
          <Spin fix>
            <div class="progress-box">
              <Progress
                :percent="40"
                status="active"
                :stroke-width="20"
                text-inside
              ></Progress>
            </div>
          </Spin>
        </div>
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
        <!--操作-->
        <div slot="action">
          <Tooltip content="编辑" placement="top">
            <div class="icons" @click="showAdd = !showAdd">
              <Icon type="md-create" size="16"></Icon>
            </div>

          </Tooltip>
          <Tooltip content="删除" placement="top">
            <div @click="showDel = !showDel">
              <Icon type="ios-trash" size="18"></Icon>
            </div>
          </Tooltip>
        </div>
      </Table>
    </div>
    <!--分页-->
    <Row type="flex" justify="space-between">
      <Col>
        <Page
          :total="100"
          show-sizer
          :current="4"
          show-total
        />
      </Col>
      <!--导出卡券-->
      <Col>
        <Button type="warning" @click="exportsTable">
          <Icon type="ios-download-outline"></Icon>
          导出卡券
        </Button>
      </Col>
    </Row>

    <!--编辑卡券-->
    <EditCard :callback="saveAdd" :show="showAdd"></EditCard>
    <!--删除卡券-->
    <Modal
      v-model="showDel"
      title="删除卡券"
      @on-ok="delCard"
    >
      <Row type="flex" justify="center" align="middle" :gutter="10">
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
  import EditCard from '@/views/CardManage/List/EditCard'

  export default {
    data () {
      return {
        columns1: [
          {
            title: '卡券名',
            key: 'name'
          },
          {
            title: '价格',
            key: 'price'
          },
          {
            title: '次数',
            key: 'count'
          },
          {
            title: '操作',
            key: 'action',
            slot: 'action'
          }
        ],
        data1: [
          {
            name: '5元券',
            price: '5',
            count: '3'
          },
          {
            name: '15元券',
            price: '15',
            count: '10'
          },
          {
            name: '25元券',
            price: '25',
            count: '20'
          },
          {
            name: '35元券',
            price: '35',
            count: '16'
          }
        ],
        showAdd: false,
        showDel: false,
        progressNum: 0
      }
    },
    methods: {
      saveAdd () {
        this.showAdd = false
      },
      delCard () {
        this.showDel = false
      },
      exportsTable () {
        this.$refs.table.exportCsv({
          filename: '卡券列表'
        })
      }
    },
    components: {
      EditCard
    }
  }
</script>

<style scoped lang="stylus">
  .card-box
    margin 20px 0

    /*table展示*/

    /deep/ .table
      width calc(100vw - 280px) !important

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
