import { constantRoutes } from '@/router'
// import { constantRoutes, asyncRoutesMap } from '@/router'
// import Layout from '@/layout'
// import { queryMenuList } from '@/api/menu'

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  // 获取后端传来的数据生成动态menu，
  generateRoutes({ commit }) {
    return new Promise(resolve => {
      const accessedRoutes = []
      // const flag = 0 // 为了让子路由的name不重复

      // 查询所有菜单
      // queryMenuList({}).then(res => {
      //   const data = res.data

      //   // 这里只是简单根据后端给的数据生成了一下动态路由
      //   for (let i = 0; i < data.length; i++) {
      //     const item = data[i]
      //     const router = {
      //       path: `${item.path}`,
      //       // name: `${item.name}`,
      //       component: Layout,
      //       alwaysShow: true,
      //       redirect: 'noRedirect', // 这样的话就不能手动返回上一级了，可以让后端配置能否返回
      //       // meta: { title: `${item.title}`, icon: `${item.icon}` },
      //       meta: { title: `${item.title}` }, // 这里icon后端没传，为了美观可以先写死，后端传了icon再规划
      //       children: []
      //     }

      //     if (item.children && item.children.length > 0) {
      //       for (let j = 0; j < item.children.length; j++) {
      //         const childItem = item.children[j]
      //         if (childItem.path) {
      //           const child = {
      //             path: `${childItem.path}`,
      //             name: `${childItem.name + flag}`,
      //             component: asyncRoutesMap[childItem.path.substr()], // 这个其实可以直接对应我们views里的路径，根据后端传来的值，可以变化,必须要有
      //             // meta: { title: `${childItem.name}`, icon: 'dashboard' }
      //             meta: { title: `${childItem.title}` }
      //           }
      //           flag++
      //           router.children.push(child)
      //         }
      //       }
      //     }
      //     accessedRoutes.push(router)
      //   }
      //   // 最后加一个404页面
      //   accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
      //   commit('SET_ROUTES', accessedRoutes)
      //   resolve(accessedRoutes)
      // })
      // 最后加一个404页面
      accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
