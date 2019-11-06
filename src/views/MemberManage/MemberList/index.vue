<template>
  <div class="card-box">
    <!--搜索，导入会员-->
    <Row type="flex" justify="space-between">
      <Col>
        <SearchM @get-list="clickSearch"/>
      </Col>
      <Col>
        <Upload action="/">
          <Button size="default" type="primary">
            <Icon type="ios-cloud-upload-outline"></Icon>
            导入会员
          </Button>
        </Upload>
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
    <!--分页配置-->
    <PageM :total="total" :callback="setPage"/>
    <!--编辑会员-->
    <EditMember :callback="saveAdd" :show="showAdd"></EditMember>
    <Modal
      v-model="showDel"
      title="删除会员"
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
  import EditMember from '@/views/MemberManage/MemberList/EditMember'
  import SearchM from '@/components/SearchC/SearchC' // 搜索框
  import PageM from '@/components/PageC/PageC' // 分页

  export default {
    data () {
      return {
        columns1: [
          {
            title: '会员名',
            key: 'name'
          },
          {
            title: '卡券',
            key: 'coupon'
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
            name: 'member1',
            coupon: '5',
            count: '3'
          },
          {
            name: 'member2',
            coupon: '15',
            count: '10'
          },
          {
            name: 'member3',
            coupon: '25',
            count: '20'
          },
          {
            name: 'member4',
            coupon: '35',
            count: '16'
          }
        ],
        showAdd: false,
        showDel: false,
        total: 0,
        pages: {},
        searchName: {}
      }
    },
    methods: {
      saveAdd () {
        this.showAdd = false
      },
      delCard () {
        this.showDel = false
      },
      setPage (data) {
        this.pages = data
      },
      clickSearch (data) {
        this.searchName = data
      }
    },
    components: {
      EditMember,
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
