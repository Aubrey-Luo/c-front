import md5 from 'md5'
import { loginUser } from '@/api/sys'

/**
 * user 模块
 */
export default {
  // 独立作用域
  namespaced: true,
  state: () => {
    return {
      // 登录的 token
      token: ''
    }
  },
  mutations: {
    /**
     * 保存 token
     */
    setToken(state, newToken) {}
  },
  actions: {
    /**
     * 登录
     */
    async login(context, payload) {
      // 加密密码
      const { password } = payload
      const data = await loginUser({
        ...payload,
        password: password ? md5(password) : ''
      })
      // 保存 token
      context.commit('setToken', data.token)
    }
  }
}
