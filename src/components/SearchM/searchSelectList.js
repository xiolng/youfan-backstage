/**
 * 搜索关键字
 * @type {{
 * PayList: 页面
 * {name: string, 关键字
 * key: string 传参 key值
 * }[]}}
 */
const searchSelectList = {
  // 用户管理
  UserManage: [
    {
      key: 'username',
      name: '用户名'
    },
  ],
  // 角色管理
  RoleManage: [
    {
      key: 'roleName',
      name: '角色名'
    }
  ],
  // 菜单管理
  MenuManage: [
    {
      key: 'rolename',
      name: '角色名'
    }
  ],
  // 卡券管理
  CardList: [
    {
      key: 'cardName',
      name: '卡券名'
    }
  ],
  // 会员管理
  MemberList: [
    {
      key: 'memberName',
      name: '会员名'
    }
  ],
  // 商铺管理
  ShopList: [
    {
      key: 'shopName',
      name: '商铺名'
    }
  ],
  // 优惠管理
  DiscountsList: [
    {
      key: 'discountsName',
      name: '优惠名'
    }
  ],
  // 支付管理
  PayList: [
    {
      key: 'payName',
      name: '流水名'
    }
  ],
}
export default searchSelectList
