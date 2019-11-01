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
export const rootFun = (h, { root, node, data }) => {
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
        content: '添加',
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
                title: ''
              }
            }
          }
        }
      })
    ])
  ])
}
