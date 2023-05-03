import { h, render } from 'vue'
import confirmComponent from './index.vue'

/**
 *
 * 展示 confirm，用户只传递一个参数时，将被视为 content
 * @param {*} title 标题（如果没有 content，title 被作为内容）
 * @param {*} content 文本（如果没有 title，content 会被作为第一个参数传入）
 * @param {*} cancelText 取消按钮文本
 * @param {*} confirmText 确定按钮文本
 * @returns
 */
export const confirm = (
  title,
  content,
  cancelText = '取消',
  confirmText = '确定'
) => {
  return new Promise((resolve, reject) => {
    // 允许只传递 content
    if (title && !content) {
      content = title
      title = ''
    }

    // 关闭弹层事件
    const close = () => {
      // 3. 把渲染的 vnode 去掉
      render(null, document.body)
    }

    // 取消按钮事件
    const cancelHandler = () => {
      reject(new Error('取消按钮点击'))
    }

    // 确定按钮事件
    const confirmHandler = () => {
      resolve()
    }

    // 1. vnode
    const vnode = h(confirmComponent, {
      title,
      content,
      cancelText,
      confirmText,
      confirmHandler,
      cancelHandler,
      close
    })
    // 2. render
    render(vnode, document.body)
  })
}
