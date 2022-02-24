import { login } from '@/network/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
// import { getItem } from '@/utils/storage'
// import router, { resetRouter } from '@/router'

const state = {
  token: getToken(), // 做持久化的话就存一下在本地
  // adminType: getItem('adminType'),
  // name: '',
  avatar: '../../assets/common_images/default-avator.jpg' // 默认写死一下的
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  }

  // SET_NAME: (state, name) => {
  //   state.name = name
  // }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({
        account: username.trim(),
        password: password
      })
        .then(response => {
          const { data } = response

          commit('SET_TOKEN', data.data.token)

          // commit('SET_NAME', data.name)
          // 持久化
          setToken(data.data.token)

          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')

      // commit('SET_NAME', '')
      removeToken()

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
