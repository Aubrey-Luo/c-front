<template>
  <div>Mobile Navigation 111</div>
</template>

<script setup>
import { getCategory } from '@/api/category'

const getCategoryData = async () => {
  const res = await getCategory()
  console.log(res)
}

getCategoryData()
</script>
