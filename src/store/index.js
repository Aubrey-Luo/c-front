import { createStore } from 'vuex'
import category from './modules/category'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
  getters,
  modules: {
    category
  },
  plugins: [
    createPersistedState({
      // 保存到 localStorage 中的 key
      key: 'c-front',
      // 需要保存的模块
      paths: ['category']
    })
  ]
})

export default store
