<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem>
        <Icon type="md-home"></Icon>
        首页
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Icon type="ios-bookmark"></Icon>
        {{getBreadParent}}
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Icon type="ios-bookmark-outline"></Icon>
        {{getBreadName}}
      </BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {}
    },
    computed: {
      ...mapGetters([
        'getBreadParent',
        'getBreadName'
      ])
    }
  }
</script>

<style scoped>

</style>
