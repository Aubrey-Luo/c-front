<template>
  <div
    class="w-full bg-white dark:bg-zinc-800 border-b border-b-zinc-200 dark:border-b-zinc-700 px-2 py-1 duration-500"
  >
    <div class="flex items-center">
      <img
        v-lazy
        class="guide-home h-4 cursor-pointer mr-2"
        src="@/assets/images/nuist.jpg"
        alt=""
        @click="onToHome"
      />
      <header-search-vue class="mr-1"></header-search-vue>
      <header-theme-vue class="mr-1"></header-theme-vue>
      <header-my></header-my>
    </div>
  </div>
</template>

<script setup>
import headerSearchVue from './header-search/index.vue'
import headerThemeVue from './header-theme.vue'
import headerMy from './header-my.vue'
import { useRouter } from 'vue-router'

// router === this.$router (vue2)
const router = useRouter()
const onToHome = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped></style>
