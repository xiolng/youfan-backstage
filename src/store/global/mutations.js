import {
  SETBREADPARENT,
  SETBREADNAME,
  SETMENUITEM,
  SETMENUSUB
} from '@/store/global/mutations-type'

export default {
  [SETBREADPARENT] (state, name) {
    state.BreadCrumb.parent = JSON.stringify(name)
    localStorage.setItem('breadParent', JSON.stringify(name))
  },
  [SETBREADNAME] (state, name) {
    state.BreadCrumb.name = name
    localStorage.setItem('breadName', name)
  },
  [SETMENUSUB] (state, name) {
    state.MenuSelect.sub = JSON.stringify(name)
    localStorage.setItem('menuSub', JSON.stringify(name))
  },
  [SETMENUITEM] (state, name) {
    state.MenuSelect.item = name
    localStorage.setItem('menuItem', name)
  }
}
