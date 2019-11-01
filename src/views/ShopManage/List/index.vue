<template>
  <div class="Shop-box">
    <!--搜索，新增-->
    <Row type="flex" justify="space-between">
      <Col>
        <Input size="default" search enter-button="搜索" placeholder="请输入商铺名。。。"/>
      </Col>
      <Col>
        <Button size="default" type="primary" @click="showAdd = !showAdd">新增</Button>
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
    <Page
      :total="100"
      show-sizer
      :current="4"
      show-total
    />
    <!--新增商铺-->
    <AddShop :callback="saveAdd" :show="showAdd"></AddShop>
    <!--删除商铺-->
    <Modal
      v-model="showDel"
      title="删除商铺"
      @on-ok="delShop"
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
  import AddShop from '@/views/ShopManage/List/AddShop'

  export default {
    data () {
      return {
        columns1: [
          {
            title: '商铺名',
            key: 'name'
          },
          {
            title: '联系电话',
            key: 'phone'
          },
          {
            title: '地址',
            key: 'address'
          },
          {
            title: '操作',
            key: 'action',
            slot: 'action'
          }
        ],
        data1: [
          {
            name: '新天地购物中心',
            phone: '13333333333',
            address: '吉林省长春市朝阳区'
          },
          {
            name: '新天地购物中心',
            phone: '13333333333',
            address: '吉林省长春市朝阳区'
          },
          {
            name: '新天地购物中心',
            phone: '13333333333',
            address: '吉林省长春市朝阳区'
          },
          {
            name: '新天地购物中心',
            phone: '13333333333',
            address: '吉林省长春市朝阳区'
          }
        ],
        showAdd: false,
        showDel: false
      }
    },
    methods: {
      saveAdd () {
        this.showAdd = false
      },
      delShop () {
        this.showDel = false
      }
    },
    components: {
      AddShop
    }
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
