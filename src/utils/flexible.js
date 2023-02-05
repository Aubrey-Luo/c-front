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
