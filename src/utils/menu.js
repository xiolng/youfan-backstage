/**
 * 菜单组合
 * @param data
 * @returns {[]}
 */
export const treeMenu = data => {
  const list = []
  data.map(v => {
    if (+v.parentId === 0) {
      v.children = []
      list.push(v)
    }
  })
  data.map(v => {
    list.map(j => {
      if (v.parentId === j.id) {
        j.children.push(v)
      }
    })
  })
  return list
}
export const rootFun = function (h, { root, node, data }) {
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
            vm.showModal = !vm.showModal
            vm.showAdd = !vm.showAdd
            vm.menuData = {
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
}
// 菜单操作按钮组，
export const renderContent = function (h, { root, node, data }) {
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
              h('Button', {
                props: {
                  type: 'text',
                  icon: 'md-create'
                },
                on: {
                  click () {
                    const parentKey = root.find(el => el === node).parent
                    const parent = root.find(el => el.nodeKey === parentKey).node
                    vm.menuData = {
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
              h('Button', {
                props: {
                  type: 'text',
                  icon: 'md-add',
                  disabled: !data.children
                },
                on: {
                  click () {
                    const parentKey = root.find(el => el === node).parent
                    const parent = root.find(el => el.nodeKey === parentKey).node
                    vm.menuData = {
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
              h('Button', {
                props: {
                  type: 'text',
                  icon: 'md-trash'
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
}