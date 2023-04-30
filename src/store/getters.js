import { isMobileTerminal } from '@/utils/flexible'

export default {
  /**
   * navigationBar 数据源
   */
  categorys: (state) => state.category.categorys,
  /**
   * 当前主题
   */
  themeType: (state) => state.theme.themeType,
  /**
   * category 选中项
   */
  currentCategory: (state) => state.app.currentCategory,
  /**
   * category 选中项下标
   */
  currentCategoryIndex: (state, getters) => {
    console.log(
      getters.categorys.findIndex(
        (item) => item.id === getters.currentCategory.id
      )
    )
    return getters.categorys.findIndex(
      (item) => item.id === getters.currentCategory.id
    )
  },
  /**
   * 搜索历史
   */
  historys: (state) => state.search.historys,
  /**
   * 搜索文本
   */
  searchText: (state) => state.app.searchText,
  /**
   * token
   */
  token: (state) => state.user.token,
  /**
   * 获取用户信息
   */
  userInfo: (state) => state.user.userInfo,
  // 路由跳转方式
  routerType: (state) => {
    // 在 PC 端下，永远为 none
    if (!isMobileTerminal.value) {
      return 'none'
    }
    return state.app.routerType
  }
}
