<template>
  <div class="menu-box">
    <!--菜单树-->
    <Tree
      :data="treeList"
      :render="renderContent"
      :arrow-size="20"
    ></Tree>
    <Modal
      v-model="showModal"
      :title="`${showAdd ? '新增' : showEdit ? '编辑' : '删除'}菜单`"
      :footer-hide="!showDel"
      @on-cancel="modalCancel"
      @on-ok="showDel ? delRole() : ''"
    >
      <!--添加菜单-->
      <AddMenu v-if="showAdd" :callback="addMenu" :menu-id="menuId"/>
      <EditMenu v-if="showEdit" :callback="addMenu" :menu-id="menuId"/>
      <!--删除角色-->
      <Row type="flex" justify="center" align="middle" :gutter="10" v-if="showDel">
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
  import AddMenu from '@/views/SystemManage/MenuManage/AddMenu'
  import EditMenu from '@/views/SystemManage/MenuManage/EditMenu'
  import { deleteMenu, getMenuList } from '@/api/systemManage/menu'
  import { treeMenu } from '@/utils/menu'

  export default {
    data () {
      return {
        treeList: [
          {
            title: '菜单',
            expand: true,
            render: (h, { root, node, data }) => {
              const vm = this
              // root 根级目录
              return h('span', {
                style: {
                  display: 'inline-block',
                  width: '100%'
                }
              }, [
                h('span', {
                  style: {
                    marginRight: '20px'
                  }
                }, data.title),
                h('Tooltip', {
                  props: {
                    content: '添加一级菜单',
                    placement: 'top'
                  },
                }, [
                  h('Icon', {
                    props: {
                      type: 'md-add',
                      size: 18
                    },
                    on: {
                      click () {
                        console.log(this)
                        vm.showModal = !vm.showModal
                        vm.showAdd = !vm.showAdd
                        vm.menuId = {
                          data: {
                            id: '0',
                            title: 'root'
                          }
                        }
                      }
                    }
                  })
                ])
              ])
            },
            // 菜单列表
            children: []
          }
        ],
        showModal: false,
        showAdd: false,
        showEdit: false,
        showDel: false,
        menuId: {}
      }
    },
    mounted () {
      this.getList()
    },
    methods: {
      getList () {
        getMenuList().then(res => {
          this.treeList[0].children = treeMenu(res.data.data)
        })
      },
      // 菜单操作按钮组，
      renderContent (h, { root, node, data }) {
        const vm = this
        return h('span', {
          style: {
            display: 'inline-block',
            width: '100%',
            paddingBottom: '4px',
            borderBottom: '1px solid #eee'
          }
        }, [
          h('Row', {
            props: {
              type: 'flex',
              gutter: 10,
              justify: 'space-between'
            }
          }, [
            h('Col', {
              props: {
                span: '12'
              }
            }, [
              h('span', {
                style: {
                  lineHeight: '24px',
                  width: '100%',
                  cursor: 'pointer',
                  display: 'inline-block',
                  background: '#fdfdfd'
                },
                on: {
                  click: () => {
                    this.$set(data, 'expand', !data.expand)
                  }
                }
              }, [
                h('span', {
                  style: {
                    fontSize: 20,
                    marginRight: '20px'
                  }
                }, [
                  h('Icon', {
                    props: {
                      type: data.icon,
                      color: '#ccc'
                    }
                  }),
                  h('span', {
                    style: {
                      display: 'inline-block',
                      margin: '0 10px'
                    }
                  }, data.title),
                  h('span', {
                    style: {
                      color: '#ccc',
                      fontSize: '12px'
                    }
                  }, `地址： ${data.path}`)
                ])
              ]),
            ]),
            h('Col', [
              h('Row', {
                props: {
                  type: 'flex',
                  gutter: 10
                }
              }, [
                h('Col', [
                  h('Tooltip', {
                    props: {
                      content: '编辑',
                      placement: 'top'
                    },
                    style: {
                      cursor: 'pointer'
                    }
                  }, [
                    h('Icon', {
                      props: {
                        type: 'md-create',
                        size: 15
                      },
                      on: {
                        click () {
                          const parentKey = root.find(el => el === node).parent
                          const parent = root.find(el => el.nodeKey === parentKey).node
                          vm.menuId = {
                            id: data.id,
                            parent: parent
                          }
                          vm.showModal = !vm.showModal
                          vm.showEdit = !vm.EditMenu
                        }
                      }
                    })
                  ])
                ]),
                h('Col', [
                  h('Tooltip', {
                    props: {
                      content: '添加',
                      placement: 'top'
                    },
                    style: {
                      cursor: 'pointer'
                    }
                  }, [
                    h('Icon', {
                      props: {
                        type: 'md-add',
                        size: 18
                      },
                      on: {
                        click () {
                          const parentKey = root.find(el => el === node).parent
                          const parent = root.find(el => el.nodeKey === parentKey).node
                          vm.menuId = {
                            data,
                            parent: parent
                          }
                          vm.showModal = !vm.showModal
                          vm.showAdd = !vm.showAdd
                        }
                      }
                    })
                  ])
                ]),
                h('Col', [
                  h('Tooltip', {
                    props: {
                      content: '删除',
                      placement: 'top'
                    },
                    style: {
                      cursor: 'pointer'
                    }
                  }, [
                    h('Icon', {
                      props: {
                        type: 'md-trash',
                        size: 15
                      },
                      on: {
                        click () {
                          if (data.children && data.children.length >= 1) {
                            vm.$Message.error('请先删除子级菜单')
                            return false
                          }
                          vm.removeRole(data)
                        }
                      }
                    })
                  ])
                ]),
              ])
            ]),
          ])
        ])
      },
      // 添加菜单
      addMenu () {
        this.showModal = false
        this.showAdd = false
        this.showEdit = false
        this.menuId = {}
        this.getList()
      },
      /**
       * 删除角色
       * @param data
       */
      removeRole (data) {
        this.removeRoleId = data.id
        this.showModal = true
        this.showDel = true
      },
      delRole () {
        deleteMenu({
          id: this.removeRoleId
        }).then(res => {
          if (+res.data.code === 0) {
            this.getList()
            this.$Message.success('删除成功')
            this.showDel = false
          }
        })
      },
      modalCancel () {
        this.showModal = false
        this.showAdd = false
        this.showEdit = false
        this.menuId = {}
      }
    },
    components: {
      AddMenu,
      EditMenu
    }
  }
</script>

<style scoped lang="stylus">
  .menu-box
    max-width 500px
    height 100%

  /deep/ .ivu-tree-children
    .ivu-tree-arrow
      margin-right 5px

      .ivu-icon
        font-size 20px
</style>
