<template>
  <div>
    <teleport to="body">
      <!-- 蒙板 -->
      <transition name="fade">
        <div
          v-if="modelValue"
          class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
          @click="isVisible = false"
        ></div>
      </transition>
      <!-- 内容 -->
      <transition name="popup-down-up">
        <div
          v-if="modelValue"
          v-bind="$attrs"
          class="w-screen bg-white dark:bg-zinc-800 z-50 fixed bottom-0"
        >
          <slot />
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import { useScrollLock, useVModel } from '@vueuse/core'
import { watch } from 'vue'

const props = defineProps({
  modelValue: {
    required: true,
    type: Boolean
  }
})

// 不需要主动触发了
// const emits = defineEmits(['update:modelValue'])

// 通过 useVModel 获取到响应式数据 isOpen，当 isOpen 改变时，会自动触发 update:modelValue
const isVisible = useVModel(props)

// 锁定滚动
const isLocked = useScrollLock(document.body)

// 监听 isVisible 的变化即可
watch(
  isVisible,
  (val) => {
    isLocked.value = val
  },
  {
    immdediate: true
  }
)
</script>

<style lang="scss" scoped>
// fade 展示动画
.fade-enter-active {
  transition: all 0.3s;
}

.fade-leave-active {
  transition: all 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
// popup-down-up 展示动画
.popup-down-up-enter-active {
  transition: all 0.3s;
}

.popup-down-up-leave-active {
  transition: all 0.3s;
}

.popup-down-up-enter-from,
.popup-down-up-leave-to {
  transform: translateY(100%);
}
</style>
