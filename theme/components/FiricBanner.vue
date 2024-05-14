<script setup lang="ts">
import { computed } from 'vue'
import { useThemeConfig } from '../composables'
import { isVideoUrl } from '../utils'
import { useFiricAppStore } from '../stores/app'

const themeConfig = useThemeConfig()
const firicStore = useFiricAppStore()

const currentWallpaperIndex = computed(() => firicStore.currentWallpaperIndex)
const urls = computed(() => themeConfig.value.banner.urls || '')
const bannerUrl = computed(() => typeof urls.value === 'string' ? urls.value : urls.value[currentWallpaperIndex.value])
const isCurrentVideo = computed(() => isVideoUrl(bannerUrl.value))

function prevWallpaper() {
  let newIndex = firicStore.currentWallpaperIndex - 1
  if (newIndex < 0)
    newIndex = urls.value.length - 1

  firicStore.setWallpaperIndex(newIndex)
}

function nextWallpaper() {
  let newIndex = firicStore.currentWallpaperIndex + 1
  if (newIndex >= urls.value.length)
    newIndex = 0

  firicStore.setWallpaperIndex(newIndex)
}
</script>

<template>
  <header relative flex justify-center items-center w-full h-100vh>
    <div absolute h-full w-full top-0 overflow-hidden>
      <video
        v-if="isCurrentVideo"
        :src="bannerUrl" autoplay muted loop object-cover w-full h-full
      />
      <img
        v-else
        :src="bannerUrl" alt="banner" object-cover w-full h-full
      >
    </div>
    <div z-4 flex>
      <div i-ri-arrow-left-s-line @click="prevWallpaper" />
      info
      <div i-ri-arrow-right-s-line @click="nextWallpaper" />
    </div>
  </header>
</template>

<style scoped>

</style>
