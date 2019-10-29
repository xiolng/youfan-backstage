import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const state = {
  BreadCrumb: {
    parent: localStorage.getItem('breadParent') || JSON.stringify(['系统管理']),
    name: localStorage.getItem('breadName') || '用户管理'
  },
  MenuSelect: {
    sub: localStorage.getItem('menuSub') || JSON.stringify(['系统管理']),
    item: localStorage.getItem('menuItem') || '用户管理'
  }
}
export {
  state,
  mutations,
  actions,
  getters
}
