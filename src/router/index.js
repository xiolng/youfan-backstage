const routes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/LayoutModule'),
    redirect: { name: '用户管理' },
    children: [
      {
        path: 'system',
        name: '系统管理',
        icon: 'md-settings',
        component: () => import('@/views/SystemManage'),
        redirect: { name: '用户管理' },
        children: [
          {
            path: '',
            name: '用户管理',
            component: () => import('@/views/SystemManage/UserManage')
          },
          {
            path: 'role',
            name: '角色管理',
            component: () => import('@/views/SystemManage/RoleManage')
          },
          {
            path: 'menu',
            name: '菜单管理',
            component: () => import('@/views/SystemManage/MenuManage')
          },
        ]
      },
      {
        path: 'card',
        name: '卡券管理',
        icon: 'md-card',
        component: () => import('@/views/CardManage'),
        redirect: { name: '卡券列表' },
        children: [
          {
            path: '',
            name: '卡券列表',
            component: () => import('@/views/CardManage/List')
          },
        ]
      },
      {
        path: 'member',
        name: '会员管理',
        icon: 'md-contacts',
        component: () => import('@/views/MemberManage'),
        redirect: { name: '会员列表' },
        children: [
          {
            path: '',
            name: '会员列表',
            component: () => import('@/views/MemberManage/List')
          },
        ]
      },
      {
        path: 'shop',
        name: '商铺管理',
        icon: 'ios-home',
        component: () => import('@/views/ShopManage'),
        redirect: { name: '商铺列表' },
        children: [
          {
            path: '',
            name: '商铺列表',
            component: () => import('@/views/ShopManage/List')
          },
          {
            path: 'qr',
            name: '收款二维码',
            component: () => import('@/views/ShopManage/ReceivingQr')
          },
        ]
      },
      {
        path: 'discounts',
        name: '优惠管理',
        icon: 'md-pricetags',
        component: () => import('@/views/DiscountsManage'),
        redirect: { name: '优惠信息' },
        children: [
          {
            path: '',
            name: '优惠信息',
            component: () => import('@/views/DiscountsManage/List')
          },
        ]
      },
      {
        path: 'pay',
        name: '支付管理',
        icon: 'logo-yen',
        component: () => import('@/views/PayManage'),
        redirect: { name: '流水' },
        children: [
          {
            path: '',
            name: '流水',
            component: () => import('@/views/PayManage/List')
          },
        ]
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
  }
]

export default routes
