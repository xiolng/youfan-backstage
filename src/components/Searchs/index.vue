<!--多功能搜索，暂时不用-->
<template>
  <div class="search-box">
    <Row type="flex" justify="start" :gutter="10">
      <Col>
        <Input
          v-model="searchName"
          :placeholder="placeholder"
          clearable
          @on-search="$emit('get-list', searchData())"
          @on-enter="$emit('get-list', searchData())"
          @on-clear="$emit('get-list', searchData())"
        >
          <Select v-model="selectKey" slot="prepend" style="width: 100px;">
            <Option v-for="item in selectList" :key="item.key" :value="item.key">{{item.name}}</Option>
          </Select>
        </Input>
      </Col>
      <Col>
        <Button type="primary" icon="ios-search"
                @click="$emit('get-list', searchData())">搜索
        </Button>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    props: {
      getList: Function,
      selectList: Array
    },
    data () {
      return {
        searchName: '',
        selectKey: this.selectList[0].key
      }
    },
    methods: {
      searchData () {
        let data = {}
        data[this.selectKey] = this.searchName
        return data
      }
    },
    computed: {
      placeholder () {
        let list = 0
        this.selectList.map((v, index) => {
          if (v.key === this.selectKey) {
            list = index
          }
        })
        return this.selectList[list].placeholder
      }
    }
  }
</script>

<style scoped>

</style>
