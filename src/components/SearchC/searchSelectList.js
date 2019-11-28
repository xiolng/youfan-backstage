/**
 * 搜索关键字
 * @type {{PayList: {name: string, key: string}[]}}
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
      key: 'basicsName',
      name: '卡券名'
    }
  ],
  // 会员管理
  MemberList: [
    {
      key: 'phone',
      name: '手机号'
    }
  ],
  // 商铺管理
  ShopList: [
    {
      key: 'shopName',
      name: '商铺名'
    }
  ],
  // 权益券管理
  EquityList: [
    {
      key: 'equityName',
      name: '权益券名'
    }
  ],
  // 优惠管理
  DiscountsList: [
    {
      key: 'discountName',
      name: '优惠名'
    }
  ],
  // 支付管理
  // 权益券流水
  PayList: [
    {
      key: 'memberName',
      name: '会员名'
    }
  ],
  // 支付流水
  PaymentRun: [
    {
      key: 'memberName',
      name: '会员名'
    }
  ],
  // 导出流水
  ExportRun: [
    {
      key: 'basicsName',
      name: '卡券名'
    }
  ],
  // 导入会员流水
  ImportRun: [
    {
      key: 'excelName',
      name: '卡券名'
    }
  ],
  // 基础管理
  CardMessage: [
    {
      key: 'name',
      name: '卡券名'
    }
  ],
  // 卡券管理
  CardSearch: [
    {
      key: 'serialNumber',
      name: '卡券码'
    }
  ],
}
export default searchSelectList
