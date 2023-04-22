import { THEME_LIGHT } from '@/constants'
export default {
  namespaced: true,
  state: () => ({
    // 当前主题模式
    themeType: THEME_LIGHT
  }),
  mutations: {
    /**
     *  切换主题模式
     */
    changeThemeType(state, newTheme) {
      state.themeType = newTheme
    }
  }
}
