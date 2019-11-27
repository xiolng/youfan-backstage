/**
 * 菜单平级，组合成树结构
 * @param data
 * @returns {[]}
 */
export const treeMenu = data => {
  let result = []
  if (!Array.isArray(data)) {
    return result
  }
  data.forEach(item => {
    delete item.children
  })
  let map = {}
  data.forEach(item => {
    map[item.id] = item
  })
  data.forEach(item => {
    let parent = map[item.parentId]
    if (parent) {
      (parent.children || (parent.children = [])).push(item)
    } else {
      result.push(item)
    }
  })
  return result
}
/**
 * 菜单管理，根级目录 操作按钮 render渲染法
 * @param h 标签
 * @param root 数据根结构
 * @param node 节点
 * @param data 当前数据
 * @returns {*}
 */
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
/**
 * 菜单管理，树结构菜单，操作按钮 render方法
 * @param h
 * @param root
 * @param node
 * @param data
 * @returns {boolean|*}
 */
export const renderContent = function (h, { root, node, data }) {
  const vm = this
  return h('span', {
    style: {
      display: 'inline-block',
      width: '100%',
      paddingBottom: '4px',
      borderBottom: '1px solid #eee'
    },
    attrs: {
      draggable: 'true'
    },
    on: {
      // dragstart () {
      //   vm.dragstartNode = node
      //   vm.dragstartData = data
      // },
      // dragover () {
      //   const event = window.event || arguments[0]
      //   event.preventDefault()
      // },
      // dragend () {
      //   const event = window.event || arguments[0]
      //   event.preventDefault()
      // },
      // drop () {
      //   event.preventDefault()
      //   if (node === vm.dragstartNode) return
      //   const target_parentKey = root.find(el => el === node).parent
      //   const target_parent = root.find(el => el.nodeKey === target_parentKey).node
      //   const target_index = target_parent.children.indexOf(data)
      //   const target_children = data.children || []
      //   target_children.push(vm.dragstartData)
      //   vm.$set(data, 'children', target_children)
      //   const source_parentKey = root.find(el => el === vm.dragstartNode).parent
      //   const source_parent = root.find(el => el.nodeKey === source_parentKey).node
      //   const source_index = source_parent.children.indexOf(vm.dragstartData)
      //   source_parent.children.splice(source_index, 1)
      // },
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
                cursor: 'pointer',
                visibility: (!data.children && +data.parentId !== 0) ? 'hidden' : 'initial'
              }
            }, [
              h('Button', {
                props: {
                  type: 'text',
                  icon: 'md-add',
                  disabled: (!data.children && +data.parentId !== 0)
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
