import { getMenuList } from '@/api/systemManage/menu'

const menuM = {
  state: {
    menuList: []
  },
  getters: {
    getMenus (state) {
      return state.menuList
    }
  },
  mutations: {
    setMenus (state, list) {
      state.menuList = list
    }
  },
  actions: {
    commitMenus ({ commit }) {
      getMenuList().then(res => {
        if (+res.data.code === 0) {
          commit('setMenus', res.data.data)
        }
      })
    }
  }
}
export default menuM
