import {
  SETBREADPARENT,
  SETBREADNAME,
  SETMENUITEM,
  SETMENUSUB
} from '@/store/global/mutations-type'

export default {
  // 设置面包屑一级菜单名称
  [SETBREADPARENT] (state, name) {
    state.BreadCrumb.parent = JSON.stringify(name)
    localStorage.setItem('breadParent', JSON.stringify(name))
  },
  // 设置面包屑二级菜单名称
  [SETBREADNAME] (state, name) {
    state.BreadCrumb.name = name
    localStorage.setItem('breadName', name)
  },
  // 设置一级菜单名称
  [SETMENUSUB] (state, name) {
    state.MenuSelect.sub = JSON.stringify(name)
    localStorage.setItem('menuSub', JSON.stringify(name))
  },
  // 设置二级菜单名称
  [SETMENUITEM] (state, name) {
    state.MenuSelect.item = name
    localStorage.setItem('menuItem', name)
  }
}
