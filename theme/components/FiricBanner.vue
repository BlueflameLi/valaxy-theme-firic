<script setup lang="ts">
import { computed } from 'vue'
import { useThemeConfig } from '../composables'

const themeConfig = useThemeConfig()

const bannerImageUrl = computed(() => themeConfig.value.banner.imageUrl)
</script>

<template>
  <header relative flex justify-center items-center w-full h-100vh>
    <div absolute h-full w-full top-0 overflow-hidden>
      <img
        :src="bannerImageUrl" alt="banner" object-cover w-full h-full
      >
    </div>
  </header>
</template>

<style scoped>

</style>
