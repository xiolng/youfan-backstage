<!--多功能搜索，暂时不用-->
<template>
  <div class="search-box">
    <Row type="flex" justify="start" :gutter="10">
      <Col>
        <!--搜索输入框-->
        <Input
          v-model="searchName"
          :placeholder="placeholder"
          clearable
          @on-search="$emit('get-list', searchData())"
          @on-enter="$emit('get-list', searchData())"
          @on-clear="$emit('get-list', searchData())"
        >
          <!--搜索关键字选择-->
          <Select v-model="selectKey" slot="prepend" style="width: 100px;">
            <Option v-for="item in selectList" :key="item.key" :value="item.key">{{item.name}}</Option>
          </Select>
        </Input>
      </Col>
      <Col>
        <!--搜索按钮-->
        <Button type="primary" icon="ios-search"
                @click="$emit('get-list', searchData())">搜索
        </Button>
      </Col>
    </Row>
  </div>
</template>

<script>
  import searchSelectList from '@/components/SearchC/searchSelectList' // 搜索关键字列表

  export default {
    props: {
      getList: Function
    },
    data () {
      return {
        searchName: '',
        pageName: '',
        selectKey: '',
        selectList: ''
      }
    },
    created () {
      this.pageName = this.$route.meta.searchKey
      this.selectKey = searchSelectList[this.pageName][0].key
      this.selectList = searchSelectList[this.pageName]
    },
    methods: {
      // 搜索返回
      searchData () {
        if (!this.searchName) return null
        let data = {}
        data[this.selectKey] = this.searchName
        return data
      }
    },
    computed: {
      // 监听所在页面，返回此页面搜索关键字
      placeholder () {
        let list = 0
        searchSelectList[this.pageName].map((v, index) => {
          if (v.key === this.selectKey) {
            list = index
          }
        })
        return `请输入${searchSelectList[this.pageName][list].name}搜索`
      }
    }
  }
</script>

<style scoped>

</style>
