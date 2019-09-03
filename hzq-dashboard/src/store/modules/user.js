import { login, getUserInfo } from '@/api/login/index'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  access_token: getToken(),
  name: '',
  avatar: '',
  permissions: []
}

const mutations = {
  SET_ACCESS_TOKEN: (state, access_token) => {
    state.access_token = access_token
    // 将token存储到cookie中
    setToken(access_token)
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  }
}

const actions = {
  login({ commit }, userInfo) {
    const username = userInfo.username.trim()
    return new Promise((resolve, reject) => {
      login(username, userInfo.password)
        .then(response => {
          debugger
          commit('SET_ACCESS_TOKEN', response.access_token)
          // commit('SET_REFRESH_TOKEN', response.refresh_token)
          // commit('SET_EXPIRES_IN', response.expires_in)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  //  根据token获取用户的信息
  GetUserInfo({ commit }) {
    debugger
    return new Promise((resolve, reject) => {
      getUserInfo()
        .then(response => {
          debugger
          const { data } = response
          if (!data) {
            reject('Verification failed, please Login again.')
            const { name, avatar } = data
            commit('SET_NAME', name)
            commit('SET_AVATAR', avatar)
            resolve(data)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // logout({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     logout(state.token)
  //       .then(() => {
  //         commit('SET_TOKEN', '')
  //         removeToken()
  //         resetRouter()
  //         resolve()
  //       })
  //       .catch(error => {
  //         reject(error)
  //       })
  //   })
  // },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
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
