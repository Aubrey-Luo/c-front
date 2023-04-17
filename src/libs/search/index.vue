<template>
  <div
    ref="containerTarget"
    class="group relative p-0.5 rounded-xl border-white duration-500 hover:bg-red-100/40"
  >
    <div>
      <!-- 搜索图标 -->
      <m-svg-icon
        name="search"
        class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2"
        color="#707070"
      ></m-svg-icon>
      <!-- 输入框 -->
      <input
        class="block w-full h-[44px] pl-4 outline-0 bg-zinc-100 caret-zinc-400 rounded-xl text-zinc-900 tracking-wide text-sm font-semibold border border-zinc-100 duration-500 focus:border-red-300 group-hover:bg-white group-hover:border-zinc-200"
        type="text"
        placeholder="搜索"
        v-model="inputValue"
        @focus="onFocusHandler"
        @blur="onBlurHandler"
        @keyup.enter="onSearchHandlder"
      />
      <!-- 删除按钮 -->
      <m-svg-icon
        v-show="inputValue"
        name="input-delete"
        class="h-1.5 w-1.5 absolute translate-y-[-50%] top-[50%] right-9 cursor-pointer duration-500"
        @click="onClearClick"
      ></m-svg-icon>
      <!-- 分割线 -->
      <div
        class="opactiy-0 h-1.5 w-[1px] absolute translate-y-[-50%] top-[50%] right-[62px] duration-500 bg-zinc-200 group-hover:opacity-100"
      ></div>
      <!-- TODO: 搜索按钮(通用组件) -->
      <m-button
        class="opacity-0 absolute translate-y-[-50%] top-[50%] right-1 rounded-full duration-500 group-hover:opacity-100"
        icon="search"
        iconColor="#ffffff"
        @click="onSearchHandlder"
      ></m-button>
    </div>
    <!-- 下拉区 -->
    <transition name="slide">
      <div
        v-if="$slots.dropdown"
        v-show="isFocus"
        class="max-h-[368px] w-full text-base overflow-auto bg-white dark:bg-zinc-800 absolute z-20 left-0 top-[56px] p-2 rounded border border-zinc-200 duration-200 hover:shadow-2xl"
      >
        <slot name="dropdown" />
      </div>
    </transition>
  </div>
</template>

<script>
// 更新事件
const EMIT_UPDATE_MODELVALUE = 'update:modelValue'
// 触发搜索（点击或回车）事件
const EMIT_SEARCH = 'search'
// 删除所有文本事件
const EMIT_CLEAR = 'clear'
// 输入事件
const EMIT_INPUT = 'input'
// 获取焦点事件
const EMIT_FOCUS = 'focus'
// 失去焦点事件
const EMIT_BLUR = 'blur'
</script>

<script setup>
import { watch, ref } from 'vue'
import { useVModel, onClickOutside } from '@vueuse/core'
/**
 * 1. 输入内容实现双向绑定
 * 2. 搜索按钮在 hover 时展示
 * 3. 一键清空文本功能
 * 4. 触发搜索
 * 5. 控制下拉展示区的展示
 * 6. 事件处理
 */
const props = defineProps({
  modelValue: {
    required: true,
    type: String
  }
})

const emits = defineEmits([
  EMIT_UPDATE_MODELVALUE,
  EMIT_CLEAR,
  EMIT_INPUT,
  EMIT_FOCUS,
  EMIT_BLUR,
  EMIT_SEARCH
])

/**
 * 输入文本
 */
const inputValue = useVModel(props)

/**
 * 清空文本
 */
const onClearClick = () => {
  inputValue.value = ''
  emits(EMIT_CLEAR, '')
}

/**
 * 触发搜索
 */
const onSearchHandlder = () => {
  emits(EMIT_SEARCH, inputValue.value)
}

/**
 * 监听焦点行为
 */
const isFocus = ref(false)
const onFocusHandler = () => {
  isFocus.value = true
  emits(EMIT_FOCUS)
}

/**
 * 失去焦点
 */
const onBlurHandler = () => {
  emits(EMIT_BLUR)
}

/**
 * 点击区域外隐藏 dropdown
 */
const containerTarget = ref(null)
onClickOutside(containerTarget, () => {
  isFocus.value = false
})

/**
 * 监听输入行为
 */
watch(inputValue, (val) => {
  emits(EMIT_INPUT, val)
})
</script>

<style lang="scss" scoped>
.slide-enter-active {
  transition: all 0.5s;
}

.slide-leave-active {
  transition: all 0.5s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(40px);
  opacity: 0;
}
</style>
