<template>
  <div>
    <navigation-vue />
  </div>
</template>

<script setup>
import navigationVue from './components/navigation/index.vue'
import { useStore } from 'vuex'
const store = useStore()
// 触发 category 数据获取动作
store.dispatch('category/useCategoryData')
</script>
