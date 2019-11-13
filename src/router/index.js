/**
 * 路由
 * @path 路径
 * @name 菜单名
 * @component 页面
 * @redirect 重定向
 * @children 子级
 * @meta{} 辅助信息
 * @searchKey 页面搜索 搜索组件用 SearchC, 默认写为 页面模块名
 * @type {*[]}
 */

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
            path: 'user',
            name: '用户管理',
            component: () => import('@/views/SystemManage/UserManage'),
            meta: {
              searchKey: 'UserManage'
            }
          },
          {
            path: 'role',
            name: '角色管理',
            component: () => import('@/views/SystemManage/RoleManage'),
            meta: {
              searchKey: 'RoleManage'
            }
          },
          {
            path: 'menu',
            name: '菜单管理',
            component: () => import('@/views/SystemManage/MenuManage'),
            meta: {
              searchKey: 'MenuManage'
            }
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
            path: 'cardList',
            name: '卡券列表',
            component: () => import('@/views/CardManage/CardList'),
            meta: {
              searchKey: 'CardList'
            }
          },
          {
            path: 'cardSearch',
            name: '卡券码状态',
            component: () => import('@/views/CardManage/CardSearch'),
            meta: {
              searchKey: 'CardSearch'
            }
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
            path: 'memberList',
            name: '会员列表',
            component: () => import('@/views/MemberManage/MemberList'),
            meta: {
              searchKey: 'MemberList'
            }
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
            path: 'shopList',
            name: '商铺列表',
            component: () => import('@/views/ShopManage/ShopList'),
            meta: {
              searchKey: 'ShopList'
            }
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
            path: 'discountsMessage',
            name: '优惠信息',
            component: () => import('@/views/DiscountsManage/DiscountsList'),
            meta: {
              searchKey: 'DiscountsList'
            }
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
            path: 'runningWater',
            name: '流水',
            component: () => import('@/views/PayManage/PayList'),
            meta: {
              searchKey: 'PayList'
            }
          },
        ]
      },
      {
        path: 'base',
        name: '基础管理',
        icon: 'md-apps',
        component: () => import('@/views/BaseManage'),
        redirect: { name: '卡券信息' },
        children: [
          {
            path: 'cardMessage',
            name: '卡券信息',
            component: () => import('@/views/BaseManage/CardMessage'),
            meta: {
              searchKey: 'CardMessage'
            }
          },
        ]
      },
    ]
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('@/views/Login')
  }
]

export default routes
