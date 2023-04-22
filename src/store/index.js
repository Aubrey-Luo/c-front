import { createStore } from 'vuex'
import category from './modules/category'
import theme from './modules/theme'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
  getters,
  modules: {
    category,
    theme
  },
  plugins: [
    createPersistedState({
      // 保存到 localStorage 中的 key
      key: 'c-front',
      // 需要保存的模块
      paths: ['category', 'theme']
    })
  ]
})

export default store
