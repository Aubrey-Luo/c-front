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
          <item-vue :data="item" :width="width"></item-vue>
        </template>
      </m-waterfall>
    </m-infinite-list>
  </div>
</template>

<script setup>
import { getPexelsList } from '@/api/pexels'
import { ref } from 'vue'
import itemVue from './item.vue'
import { isMobileTerminal } from '@/utils/flexible'

/**
 * 构建数据请求
 */
let query = {
  page: 1,
  size: 20
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
  if (pexelsList.value.length === res.total){
    isFinished.value = true
  }
  // 修改 loading 标记
  loading.value = false
}
</script>

<style lang="scss" scoped></style>
