import router, { resetRouter } from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  // const hasToken = getToken()
  const hasToken = store.getters.token

  if (hasToken) {
    // 直接去对应页面
    next()
    NProgress.done()
    if (to.path === '/login') {
      // 这里可以清空路由什么的
    } else {
      // 拿到最终需要的路由，这一步看业务，我们这里后端传的是所有的动态路由给我们
      const accessRoutes = await store.dispatch('permission/generateRoutes')
      resetRouter()
      router.addRoutes(accessRoutes)
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
