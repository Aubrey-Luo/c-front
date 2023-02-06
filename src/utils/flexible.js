import { computed } from 'vue'
import { PC_DEVICE_WIDTH } from '@/constants'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

/**
 * 判断当前是否为移动设备
 * 判断依据：屏幕宽度是否大于一个指定宽度（1280）
 * 返回 Boolean
 */
export const isMobileTerminal = computed(() => {
  return width.value < PC_DEVICE_WIDTH
})

/**
 * 判断当前是否为移动设备
 * 判断依据：正则
 * 返回 Boolean
 */
export const isMobileTerminalByRegExp = computed(() => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
})

/**
 * 动态指定 rem 基准值，最大为 40px
 * 根据用户的屏幕宽度，进行一些计算，把计算出来的值赋值给 HTML 根标签作为 fontSize 大小
 */
export const useRem = () => {
  // 定义最大的 fontSize
  const MAX_FONT_SIZE = 40
  // 监听 HTML 文档被解析完成的事件
  document.addEventListener('DOMContentLoaded', () => {
    // 拿到 HTML 标签
    const html = document.querySelector('html')
    // 计算 fontSize，根据屏幕宽度 / 10
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
    // 赋值给 HTML
    html.style.fontSize = fontSize + 'px'
  })
}
