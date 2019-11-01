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
            :data="menuList"
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
  import { getRoleDetail, editRoleDetail } from '@/api/systemManage/role' // 获取，编辑用户详情，
  import { getMenuList } from '@/api/systemManage/menu' // 获取菜单列表
  import { treeMenu } from '@/utils/menu' // 菜单组合成树结构

  export default {
    props: {
      roleId: String, // 编辑的用户id
      callback: Function // 成功返回
    },
    data () {
      return {
        formValidate: {
          roleName: '',
          phone: '',
          menuId: []
        },
        ruleValidate: {
          roleName: [
            { required: true, message: '请输入角色名', trigger: 'blur' }
          ],
        },
        menuList: [], // 菜单列表
      }
    },
    mounted () {
      this.getMenu()
      // 获取用户详情
      getRoleDetail({
        id: this.roleId
      }).then(res => {
        this.formValidate = res.data.data
        this.getMenu()
      })
    },
    methods: {
      // 获取角色列表
      /**
       * 获取菜单列表
       */
      getMenu () {
        getMenuList().then(res => {
          this.menuList = this.setMenuTree(res.data.data)
        })
      },
      setMenuTree (data) {
        let list = []
        data.map(v => {
          if (this.formValidate.menuId) {
            this.formValidate.menuId.map(j => {
              if (j === v.id) {
                v.checked = true
              }
            })
          }
          list.push(v)
        })
        list = treeMenu(list)
        list.map(v => {
          v.children.map(j => {
            if (j.checked) {
              v.expand = true
            }
          })
        })
        return list
      },
      modalOk () {
        this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            editRoleDetail({
              id: this.formValidate.id,
              roleName: this.formValidate.roleName,
              phone: this.formValidate.phone,
              menuId: this.formValidate.menuId
            }).then(res => {
              if (+res.data.code === 0) {
                this.$Message.success('编辑成功')
                this.callback()
              }
            })
          } else {
            this.$Message.error('Fail!')
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
