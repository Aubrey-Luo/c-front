import { getCategory } from '@/api/category'
import { ALL_CATEGORY_ITEM, CATEGORY_NOMAR_DATA } from '@/constants'

export default {
  // 独立作用域
  namespaced: true,
  state: () => {
    // navigationBar 展示的数据源
    return {
      // 1. 让 categorys 具备一个初始化数据
      // 2. 从服务端获取数据，替换初始化数据
      // 3. 为了防止初始化数据太老，把每次获取到的新数据都作为下一次的初始化数据
      // 第三步方案：每次从接口得到的数据，进行缓存（localStorage）；在下次运行时，把缓存的数据作为初始值
      categorys: CATEGORY_NOMAR_DATA
    }
  },
  mutations: {
    /**
     * 为 categorys 赋值
     */
    setcategorys(state, categorys) {
      state.categorys = [ALL_CATEGORY_ITEM, ...categorys]
    }
  },
  actions: {
    /**
     * 获取 category 数据，并自动保存到 vuex 中
     */
    async useCategoryData(context) {
      const { categorys } = await getCategory()
      context.commit('setcategorys', categorys)
    }
  }
}
