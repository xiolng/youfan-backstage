<template>
  <div class="add-role">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="角色名" prop="roleName">
        <Input v-model="formValidate.roleName" placeholder="请输入角色名"/>
      </FormItem>
      <FormItem label="菜单">
        <div class="role-menu">
          <Tree
            ref="treeMenu"
            :data="treeMenu(menuList)"
            show-checkbox
            @on-check-change="changeTree"
          ></Tree>
        </div>
      </FormItem>
    </Form>

    <Row type="flex" justify="end" :gutter="20">
      <Col>
        <Button type="text" @click="modalCancel">取消</Button>
      </Col>
      <Col>
        <Button type="primary" @click="modalOk">确定</Button>
      </Col>
    </Row>
  </div>
</template>

<script>
  import { saveRole } from '@/api/systemManage/role' // 保存x新增角色
  import { getMenuList } from '@/api/systemManage/menu' // 获取菜单列表
  import { treeMenu } from '@/utils/menu' // 菜单组合成树结构

  export default {
    props: {
      callback: Function // 返回操作成功
    },
    data () {
      return {
        /**
         * 表单
         */
        formValidate: {
          roleName: '',
          menuId: [],
        },
        // 表单验证
        ruleValidate: {
          roleName: [
            { required: true, message: '请输入角色名', trigger: 'blur' }
          ]
        },
        menuList: [], // 菜单列表
        treeMenu
      }
    },
    mounted () {
      this.getMenu()
    },
    methods: {
      /**
       * 获取菜单列表
       */
      getMenu () {
        getMenuList().then(res => {
          this.menuList = res.data.data
        })
      },
      /**
       * 新增角色
       */
      modalOk () {
        this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            saveRole(this.formValidate).then(res => {
              if (+res.data.code === 0) {
                this.$Message.success('新增成功')
                this.callback()
              }
            })
          } else {
            this.$Message.error('请输入完整信息!')
          }
        })
      },
      modalCancel () {
        this.$refs['formValidate'].resetFields()
        this.callback()
      },
      changeTree () {
        this.formValidate.menuId = this.$refs.treeMenu.getCheckedNodes().map(v => v.id)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .add-role
    .role-menu
      max-height 500px
      overflow hidden
      overflow-y auto
</style>
