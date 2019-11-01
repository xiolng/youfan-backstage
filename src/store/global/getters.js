export default {
  getBreadParent: state => JSON.parse(state.BreadCrumb.parent)[0], // 获取面包屑一级菜单名称
  getBreadName: state => state.BreadCrumb.name, // 获取面包屑二级菜单名称
  getMenuSub: state => JSON.parse(state.MenuSelect.sub), // 获取一级菜单名称
  getMenuItem: state => state.MenuSelect.item // 获取二级菜单名称
}
