<template>
  <div
    class="fixed top-0 left-0 w-screen h-screen text-xl bg-slate-200 z-20 backdrop-blur-4xl bg-transparent pb-2 overflow-y-auto xl:p-2"
  >
    <!-- 移动端下的 navbar -->
    <m-navbar v-if="isMobileTerminal">
      {{ pexelData.title }}
      <template #right>
        <m-svg-icon
          name="share"
          class="w-3 h-3"
          fillClass="fill-zinc-900 dark:fill-zinc-200"
        ></m-svg-icon>
      </template>
    </m-navbar>
    <!-- PC 端展示关闭图标 -->
    <m-svg-icon
      v-else
      name="close"
      class="w-3 h-3 ml-1 p-0.5 cursor-pointer duration-200 rounded-sm hover:bg-zinc-100 absolute right-2 top-2"
      fillClass="fill-zinc-400"
      @click="onPop"
    ></m-svg-icon>
    <!-- 内容区 -->
    <div class="xl:w-[80%] xl:h-full xl:mx-auto xl:rounded-lg xl:flex">
      <img
        class="w-screen mb-2 xl:w-3/5 xl:h-full xl:rounded-tl-lg xl:rounded-bl-lg"
        :src="pexelData.photo"
      />
      <div
        class="xl:w-2/5 xl:h-full xl:bg-white xl:dark:bg-zinc-900 xl:rounded-tr-lg xl:rounded-br-lg xl:p-3"
      >
        <!-- PC 下：收藏、分享 -->
        <div v-if="!isMobileTerminal" class="flex justify-between mb-2">
          <!-- 分享 -->
          <m-svg-icon
            name="share"
            class="w-4 h-4 p-1 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 duration-300 rounded"
            fillClass="fill-zinc-900 dark:fill-zinc-200"
          ></m-svg-icon>
          <!-- 收藏 -->
          <m-button
            class=""
            type="info"
            icon="heart"
            iconClass="fill-zinc-900 dark:fill-zinc-200"
          />
        </div>
        <!-- 标题 -->
        <p
          class="text-base text-zinc-900 dark:text-zinc-200 ml-1 font-bold xl:text-xl xl:mb-5"
        >
          {{ pexelData.title }}
        </p>
        <!-- 作者 -->
        <div class="flex items-center mt-1 px-1">
          <img
            v-lazy
            class="h-3 w-3 rounded-full"
            :src="pexelData.avatar"
            alt=""
          />
          <span class="text-base text-zinc-900 dark:text-zinc-200 ml-1">{{
            pexelData.author
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getPexelsFromId } from '@/api/pexels'
import { isMobileTerminal } from '@/utils/flexible'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const pexelData = ref({})
const getPexelsData = async () => {
  const data = await getPexelsFromId(props.id)
  pexelData.value = data
}
getPexelsData()

/**
 * 关闭按钮处理事件
 */
const router = useRouter()
const store = useStore()
const onPop = () => {
  // 配置跳转方式
  store.commit('app/changeRouterType', 'back')
  router.back()
}
</script>

<style lang="scss" scoped></style>
