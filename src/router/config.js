import TabsView from '@/layouts/tabs/TabsView'
import PageView from '@/layouts/PageView'

// 路由配置
const options = {
  routes: [
    {
      path: '/login',
      name: '登录页',
      component: () => import('@/pages/login')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/pages/exception/404'),
    },
    {
      path: '/403',
      name: '403',
      component: () => import('@/pages/exception/403'),
    },
    {
      path: '/',
      name: '首页',
      component: TabsView,
      redirect: '/login',
      children: [
        {
          path: 'dashboard',
          name: '销售数据',
          meta: {
            icon: 'dashboard'
          },
          component: () => import('@/pages/dashboard/analysis')

        },
        {
          path: 'form',
          name: '支付渠道',
          meta: {
            icon: 'pay-circle',
            page: {
              cacheAble: false
            }
          },
          component: PageView,
          children: [
            {
              path: 'basic',
              name: '我的支付渠道',
              component: () => import('@/pages/form/basic'),
            }
          ]
        },
        {
          path: 'list',
          name: '订单管理',
          meta: {
            icon: 'table'
          },
          component: PageView,
          children: [
            {
              path: 'query',
              name: '订单列表',
              meta: {
                authority: 'queryForm',
              },
              component: () => import('@/pages/list/QueryList'),
            },
            {
              path: 'query/detail/:id',
              name: '消费记录',
              meta: {
                highlight: '/list/query',
                invisible: true
              },
              component: () => import('@/pages/Demo')
            }
          ]
        },
        {
          path: 'primary',
          name: '我的信息',
          meta: {
            icon: 'user'
          },
          component: () => import('@/pages/list/StandardList'),
          children: [
            {
              path: 'basic',
              name: '基本信息',
              component: () => import('@/pages/form/basic'),
            },
            {
              path: 'advance',
              name: '账户充值',
              component: () => import('@/pages/detail/AdvancedDetail'),
            }
          ]
        },
        {
          path: 'document',
          name: '通知公告',
          meta: {
            icon: 'bell'
          },
          component: () => import('@/pages/list/search/SearchLayout'),
        },
        {
          path: 'card',
          name: '投诉管理',
          meta: {
            icon: 'frown'
          },
          component: () => import('@/pages/list/CardList'),
        },
        {
          path: 'search',
          name: '黑名单管理',
          meta:{
            icon: 'contacts'
          },
          component: () => import('@/pages/list/search/SearchLayout'),
        },
        {
          path: 'help',
          name: '帮助文档',
          meta: {
            icon: 'file-search'
          },
          component: () => import('@/pages/list/search/SearchLayout'),
        },
      ]
    },
  ]
}

export default options
