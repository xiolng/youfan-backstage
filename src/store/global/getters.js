export default {
  getBreadParent: state => JSON.parse(state.BreadCrumb.parent)[0],
  getBreadName: state => state.BreadCrumb.name,
  getMenuSub: state => JSON.parse(state.MenuSelect.sub),
  getMenuItem: state => state.MenuSelect.item
}
