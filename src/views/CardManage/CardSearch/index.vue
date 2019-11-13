<template>
  <div class="card-search">
    <!--搜索，导入卡券-->
    <Row type="flex" justify="space-between">
      <Col>
        <SearchC @get-list="clickSearch"/>
      </Col>
    </Row>
    <List
      header="查询结果"
      border
      :style="{marginTop: '20px'}"
      size="large"
    >
      <ListItem>
        卡号：{{cardCode}}
      </ListItem>
      <ListItem>
        状态：
        <Tag
          v-if="cardStatus"
          :color="statusList[cardStatus].color || ''"
        >
          {{statusList[cardStatus].name || ''}}
        </Tag>
      </ListItem>
    </List>
  </div>
</template>

<script>
  import SearchC from '@/components/SearchC/SearchC'
  import { getCardStatus } from '@/api/CardManageApi'

  export default {
    data () {
      return {
        cardStatus: '',
        cardCode: '',
        statusList: {
          0: {
            name: '已使用',
            color: 'success'
          },
          1: {
            name: '未使用',
            color: 'default'
          },
          2: {
            name: '此卡号不存在，请重新输入',
            color: 'error'
          },
        }
      }
    },
    methods: {
      // 搜索卡号
      clickSearch (data) {
        if (!data) {
          this.cardCode = ''
          this.cardStatus = ''
          return false
        }
        this.cardCode = data[Object.keys(data)[0]]
        getCardStatus(data).then(res => {
          this.cardStatus = res.data.data.status
        })
      }
    },
    components: {
      SearchC
    }
  }
</script>

<style scoped>

</style>
