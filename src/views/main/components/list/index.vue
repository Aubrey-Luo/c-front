<template>
  <div>
    <m-infinite-list
      v-model="loading"
      :isFinished="isFinished"
      @onLoad="getPexelsData"
    >
      <m-waterfall
        class="px-1 w-full"
        :data="pexelsList"
        nodeKey="id"
        :column="isMobileTerminal ? 2 : 5"
        :picturePreReading="false"
      >
        <template v-slot="{ item, width }">
          <item-vue :data="item" :width="width" @click="onToPins"></item-vue>
        </template>
      </m-waterfall>
    </m-infinite-list>

    <!-- 详情内容展示 -->
    <transition
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <pins-vue v-if="isVisiblePins" :id="currentPins.id"></pins-vue>
    </transition>
  </div>
</template>

<script setup>
import { getPexelsList } from '@/api/pexels'
import { ref, watch } from 'vue'
import itemVue from './item.vue'
import { isMobileTerminal } from '@/utils/flexible'
import { useStore } from 'vuex'
import pinsVue from '../../../pins/components/pins.vue'
import gsap from 'gsap'

const store = useStore()

/**
 * 构建数据请求
 */
let query = {
  page: 1,
  size: 20,
  categoryId: '',
  searchText: ''
}
// 数据是否在加载中
const loading = ref(false)
// 数据是否全部加载完成
const isFinished = ref(false)
// 数据源
const pexelsList = ref([])
/**
 * 加载数据的方法
 */
const getPexelsData = async () => {
  // 数据全部加载完成 return
  if (isFinished.value) {
    return
  }
  // 完成了第一次请求之后 后续的请求让 page 自增
  if (pexelsList.value.length) {
    query.page += 1
  }
  // 触发接口
  const res = await getPexelsList(query)
  if (query.page === 1) {
    pexelsList.value = res.list
  } else {
    pexelsList.value.push(...res.list)
  }
  // 判断数据是否全部加载完成
  if (pexelsList.value.length === res.total) {
    isFinished.value = true
  }
  // 修改 loading 标记
  loading.value = false
}

/**
 * 通过此方法修改 query，重新发起请求
 */
const resetQuery = (newQuery) => {
  query = { ...query, ...newQuery }
  // 重置状态
  isFinished.value = false
  pexelsList.value = []
}

/**
 * 监听 currentCategory 的变化
 */
watch(
  () => store.getters.currentCategory,
  (currentCategory) => {
    // 重置请求参数
    resetQuery({
      page: 1,
      categoryId: currentCategory.id
    })
  }
)

/**
 * 监听 searchText 的变化
 */
watch(
  () => store.getters.searchText,
  (val) => {
    resetQuery({
      page: 1,
      searchText: val
    })
  }
)

// 控制 pins 展示
const isVisiblePins = ref(false)
// 当前选中的 pins 属性
const currentPins = ref({})

/**
 * 进入 pins
 */
const onToPins = (item) => {
  console.log(item.location)
  /**
   * 修改浏览器的 url
   * 浏览器不会在调用 pushState() 之后尝试加载此 URL
   */
  history.pushState(null, null, `/pins/${item.id}`)
  isVisiblePins.value = true
  currentPins.value = item
}

/**
 * 监听浏览器后退按钮事件
 */
window.addEventListener('popstate', () => {
  isVisiblePins.value = false
})

/**
 * 进入动画开始前
 */
const beforeEnter = (el) => {
  gsap.set(el, {
    scaleX: 0,
    scaleY: 0,
    transformOrigin: '0 0',
    translateX: currentPins.value.location?.translateX,
    translateY: currentPins.value.location?.translateY,
    opacity: 0
  })
}
/**
 * 进入动画执行中
 */
const enter = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    translateX: 0,
    translateY: 0,
    onComplete: done
  })
}
/**
 * 离开动画执行中
 */
const leave = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 0,
    scaleY: 0,
    translateX: currentPins.value.localtion?.translateX,
    translateY: currentPins.value.localtion?.translateY,
    opacity: 0
  })
}
</script>

<style lang="scss" scoped></style>
