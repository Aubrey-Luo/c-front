/**
 * 全局注册指令
 */
export default {
  install(app) {
    // https://cn.vitejs.dev/guide/features.html#glob-import
    // import.meta.globEager 为同步导入
    const directives = import.meta.globEager('./modules/*.js')
    for (const [key, value] of Object.entries(directives)) {
      // 拼接组件注册的 name
      const arr = key.split('/')
      const name = arr[arr.length - 1].replace('.js', '')
      // 完成注册
      app.directive(name, value.default)
    }
  }
}
