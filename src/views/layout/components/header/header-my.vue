<template>
  <m-popover class="flex items-center" placement="bottom-left">
    <template #reference>
      <div
        class="guide-my relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900"
        v-if="$store.getters.token"
      >
        <!-- 头像 -->
        <img
          v-lazy
          class="w-3 h-3 rounded-sm"
          :src="$store.getters.userInfo.avatar"
          alt=""
        />
        <!-- 下箭头 -->
        <m-svg-icon
          class="h-1.5 w-1.5 ml-0.5"
          name="down-arrow"
          fillClass="fill-zinc-900"
        ></m-svg-icon>
        <!-- VIP -->
        <m-svg-icon
          class="h-1.5 w-1.5 absolute right-[16px] bottom-0"
          name="VIP"
          v-if="$store.getters.userInfo.vipLevel"
        ></m-svg-icon>
      </div>
      <div v-else>
        <m-button
          class="guide-my"
          icon="profile"
          iconColor="#fff"
          @click="onToLogin"
        ></m-button>
      </div>
    </template>

    <!-- 气泡内容 -->
    <div class="w-[140px] overflow-hidden" v-if="$store.getters.token">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        v-for="item in menuArr"
        :key="item.id"
        @click="onItemClick(item)"
      >
        <m-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <span class="text-zinc-800 dark:text-zinc-300 text-sm">{{
          item.title
        }}</span>
      </div>
    </div>
  </m-popover>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { confirm } from '@/libs'

const router = useRouter()
const store = useStore()

// 构建 menu 数据源
const menuArr = [
  {
    id: 0,
    title: '个人资料',
    icon: 'profile',
    path: '/profile'
  },
  {
    id: 1,
    title: '升级 VIP',
    icon: 'vip-profile',
    path: '/member'
  },
  {
    id: 2,
    title: '退出登录',
    icon: 'logout',
    path: ''
  }
]

/**
 * 登录按钮点击事件
 */
const onToLogin = () => {
  // 配置跳转方式
  store.commit('app/changeRouterType', 'push')
  router.push('/login')
}

/**
 * menu 点击事件
 */
const onItemClick = (item) => {
  if (item.id === 2) {
    // 退出登录
    confirm('是否退出登录？')
      .then(() => {
        store.dispatch('user/logout')
      })
      .catch(() => {
        console.log('取消退出登录')
      })
    return
  }
  router.push(item.path)
}
</script>

<style lang="scss" scoped></style>
