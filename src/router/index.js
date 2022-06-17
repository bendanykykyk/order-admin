import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard', // 如果有这个东西，通过$route.query能拿到它
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: {
          title: '数据分析',
          icon: 'el-icon-s-data',
          affix: true
        }
      }
    ]
  },
  {
    path: '/set',
    component: Layout,
    redirect: '/dashboard', // 如果有这个东西，通过$route.query能拿到它
    children: [
      {
        path: '/merchant/edit',
        component: () => import('@/views/set-up/formCu'),
        name: 'MerchantEdit',
        hidden: false,

        meta: {
          title: '基本信息设置',
          affix: false,
          icon: 'el-icon-setting'
          // affix: true
        }
      }
    ]
  },
  {
    path: '/category',
    component: Layout,
    redirect: '/dashboard', // 如果有这个东西，通过$route.query能拿到它
    meta: {
      title: '菜品管理',
      affix: false,
      icon: 'el-icon-tableware'
      // affix: true
    },
    children: [
      {
        path: '/category/list',
        component: () => import('@/views/category/index'),
        name: 'categoryList',
        hidden: false,

        meta: {
          title: '菜品种类',
          affix: false
          // icon: 'dashboard',
          // affix: true
        }
      },
      {
        path: '/unit/list',
        component: () => import('@/views/unit/index'),
        name: 'unitList',
        hidden: false,

        meta: {
          title: '商品单位',
          affix: false
          // icon: 'dashboard',
          // affix: true
        }
      },
      {
        path: '/product/list',
        component: () => import('@/views/product/index'),
        name: 'productList',
        hidden: false,

        meta: {
          title: '商品',
          affix: false
          // icon: 'dashboard',
          // affix: true
        }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/dashboard', // 如果有这个东西，通过$route.query能拿到它
    meta: {
      title: '订单管理',
      affix: false,
      icon: 'el-icon-bank-card'
      // affix: true
    },
    children: [
      {
        path: '/order/list',
        component: () => import('@/views/order/index'),
        name: 'orderList',
        hidden: false,

        meta: {
          title: '订单管理',
          affix: false
          // icon: 'dashboard',
          // affix: true
        }
      }
    ]
  },

  {
    path: '/set-up',
    component: () => import('@/views/set-up/formCu'),
    hidden: true
  },

  // {
  //   path: '/demo',
  //   component: Layout,
  //   redirect: 'noRedirect', // 如果有这个东西，通过$route.query能拿到它
  //   meta: {
  //     title: '固定-测试代码'
  //   },
  //   children: [
  //     {
  //       path: '/list',
  //       component: () => import('@/views/demo/list/index'),
  //       name: 'List',
  //       meta: {
  //         title: '列表'
  //         // icon: 'dashboard',
  //         // affix: true
  //       }
  //     },
  //     {
  //       path: '/cascader',
  //       component: () => import('@/views/demo/cascader/index'),
  //       name: 'Cascader',
  //       meta: {
  //         title: '级联'
  //         // icon: 'dashboard',
  //         // affix: true
  //       }
  //     },
  //     {
  //       path: '/others',
  //       component: () => import('@/views/demo/others/index'),
  //       name: 'Others',
  //       meta: {
  //         title: '其他'
  //         // icon: 'dashboard',
  //         // affix: true
  //       }
  //     },
  //     {
  //       path: '/addAndDetail',
  //       component: () => import('@/views/demo/addAndDetail/index'),
  //       name: 'AddAndDetail',
  //       meta: {
  //         title: '添加与编辑页面'
  //         // icon: 'dashboard',
  //         // affix: true
  //       }
  //     },
  //     {
  //       path: '/testDemo',
  //       component: () => import('@/views/demo/testCode/index'),
  //       name: 'TestDemo',
  //       meta: {
  //         title: '测试code用'
  //         // icon: 'dashboard',
  //         // affix: true
  //       }
  //     }
  //   ]
  // },
  // 注册一些添加与编辑页面
  {
    path: '/cu',
    component: Layout,
    redirect: 'noRedirect', // 如果有这个东西，通过$route.query能拿到它
    meta: {
      title: '表单'
    },
    hidden: true,
    children: [
      {
        path: '/merchant/add',
        component: () => import('@/views/set-up/formCu'),
        name: 'MerchantAdd',
        hidden: true,

        meta: {
          title: '创建商户基本信息',
          affix: false
          // icon: 'dashboard',
          // affix: true
        }
      },
      {
        path: '/category/add',
        component: () => import('@/views/category/formCu'),
        name: 'categoryAdd',
        hidden: false,

        meta: {
          title: '新增类目',
          affix: false
          // icon: 'dashboard',
          // affix: true
        }
      },
      {
        path: '/category/edit',
        component: () => import('@/views/category/formCu'),
        name: 'categoryEdit',
        hidden: false,

        meta: {
          title: '编辑类目',
          affix: false
          // icon: 'dashboard',
          // affix: true
        }
      },
      {
        path: '/unit/add',
        component: () => import('@/views/unit/formCu'),
        name: 'unitAdd',
        hidden: false,

        meta: {
          title: '新增单位',
          affix: false
          // icon: 'dashboard',
          // affix: true
        }
      },
      {
        path: '/unit/edit',
        component: () => import('@/views/unit/formCu'),
        name: 'unitEdit',
        hidden: false,

        meta: {
          title: '编辑单位',
          affix: false
          // icon: 'dashboard',
          // affix: true
        }
      },
      {
        path: '/product/add',
        component: () => import('@/views/product/formCu'),
        name: 'productAdd',
        hidden: false,

        meta: {
          title: '新增商品',
          affix: false
          // icon: 'dashboard',
          // affix: true
        }
      },
      {
        path: '/product/edit',
        component: () => import('@/views/product/formCu'),
        name: 'productEdit',
        hidden: false,

        meta: {
          title: '编辑商品',
          affix: false
          // icon: 'dashboard',
          // affix: true
        }
      },
      {
        path: '/order/edit',
        component: () => import('@/views/order/formCu'),
        name: 'orderEdit',
        hidden: false,

        meta: {
          title: '订单详情',
          affix: false
          // icon: 'dashboard',
          // affix: true
        }
      }
    ]
  }
]

/**
 * asyncRoutes
 * 看情况，我这里是根据后端菜单接口来组成一个动态菜单数组；你也可以让前端来控制权限。
 */
export const asyncRoutes = []

/**
 * 后台传来的动态路由配在这里，跟permission.js里component: asyncRoutesMap[childItem.path.substr()]配合，拿到我们对应的懒加载的页面
 */
export const asyncRoutesMap = {
  finance: () => import('@/views/finance/list')
}

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
