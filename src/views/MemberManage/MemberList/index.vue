<template>
  <div class="card-box">
    <!--搜索，导入会员-->
    <Row type="flex" justify="space-between">
      <Col>
        <SearchC @get-list="clickSearch"/>
      </Col>
      <Col>
        <Upload
          action="/"
          :before-upload="uploadOk"
        >
          <Button
            size="default"
            type="primary"
          >
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
        class="table"
        ref="table"
      >
        <!--操作-->
        <!--<div slot="action">-->
        <!--  <Tooltip content="编辑" placement="top" transfer>-->
        <!--    <div class="icons" @click="showAdd = !showAdd">-->
        <!--      <Icon type="md-create" size="16"></Icon>-->
        <!--    </div>-->

        <!--  </Tooltip>-->
        <!--  <Tooltip content="删除" placement="top" transfer>-->
        <!--    <div @click="showDel = !showDel">-->
        <!--      <Icon type="ios-trash" size="18"></Icon>-->
        <!--    </div>-->
        <!--  </Tooltip>-->
        <!--</div>-->
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
  import SearchC from '@/components/SearchC/SearchC' // 搜索框
  import PageM from '@/components/PageC/PageC' // 分页
  import { getMemberList, importMember } from '@/api/MemberApi'

  export default {
    data () {
      return {
        columns1: [
          {
            title: '手机号',
            key: 'phone',
            ellipsis: true,
            minWidth: 150,
            tooltip: true
          },
          {
            title: '会员名',
            key: 'username',
            ellipsis: true,
            minWidth: 150,
            tooltip: true
          },
          {
            title: '卡券次数',
            key: 'discountsNumber',
            ellipsis: true,
            minWidth: 100,
            tooltip: true
          },
          {
            title: '身份证',
            key: 'identityCard',
            ellipsis: true,
            minWidth: 150,
            tooltip: true
          },
          // {
          //   title: '性别',
          //   key: 'sex',
          //   ellipsis: true,
          //   minWidth: 150,
          //   tooltip: true,
          //   render (h, params) {
          //     return h('span', +params.row.sex === 1 ? '女' : '男')
          //   }
          // },
          {
            title: '地址',
            key: 'addressDetails',
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
          // {
          //   title: '操作',
          //   key: 'action',
          //   slot: 'action',
          //   fixed: 'right',
          //   minWidth: 100
          // }
        ],
        data1: [],
        showAdd: false,
        showDel: false,
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
        getMemberList({
          ...this.pages,
          ...this.searchName
        }).then(res => {
          this.data1 = res.data.data
        })
      },
      uploadOk (files) {
        let file = new FormData()
        file.append('file', files)
        importMember(file).then(res => {
          if (+res.data.code === 0) {
            this.$Message.success('导入成功！')
            this.getList()
            return false
          }
          this.$Message.error(res.data.msg)
        })
        this.getList()
        return false
      },
      saveAdd () {
        this.showAdd = false
      },
      delCard () {
        this.showDel = false
      },
      setPage (data) {
        this.pages = data
        this.getList()
      },
      clickSearch (data) {
        this.searchName = data
        this.getList()
      }
    },
    components: {
      EditMember,
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
