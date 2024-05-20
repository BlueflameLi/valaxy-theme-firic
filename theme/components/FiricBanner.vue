<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import Typed from 'typed.js'
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

const title = computed(() => themeConfig.value.banner.title || 'Firic')

const mottoRef = ref<HTMLElement | null>(null)
const typed = ref<Typed | null>(null)
onMounted(async () => {
  typed.value = new Typed(mottoRef.value, {
    strings: ['Hello, world!', 'Welcome to Vue 3!', 'Typed.js is awesome!'],
    typeSpeed: 50,
    backSpeed: 25,
    loop: true,
  })
})

onBeforeUnmount(() => {
  typed.value?.destroy()
})
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
    <div z-4 flex="~ col" items-center>
      <div class="glitch" :data-text="title">
        {{ title }}
      </div>
      <div w-full h-full bg="black opacity-50" rounded-2xl>
        <div text-center c-white flex items-center>
          <div i-ri-double-quotes-l animate-ping text-base />
          <div ref="mottoRef" flex />
          <div i-ri-double-quotes-r animate-ping text-base />
        </div>
        <div flex>
          <div i-ri-arrow-left-s-line @click="prevWallpaper" />
          <div i-ri-arrow-right-s-line @click="nextWallpaper" />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
@mixin glitch-common {
  content: attr(data-text);
  position: absolute;
  top: 0;
  width: 100%;
  clip: rect(0, 0, 0, 0);
}

.glitch {
  display: block;
  position: relative;
  font-weight: bold;
  font-size: 80px;
  color: white;
  text-shadow: rgba(0, 0, 0, 0.2) 4px 4px 8px;

  &:before {
    @include glitch-common;
    left: -1px;
    text-shadow: 1px 0 #ff3f1a;
  }

  &:after {
    @include glitch-common;
    left: 1px;
    text-shadow: -1px 0 #00a7e0;
  }

  &:hover {
    &:before {
      text-shadow: 4px 0 #ff3f1a;
      animation: glitch-loop-1 0.8s infinite ease-in-out alternate-reverse;
    }

    &:after {
      text-shadow: -4px 0 #00a7e0;
      animation: glitch-loop-2 0.8s infinite ease-in-out alternate-reverse;
    }
  }
}

@media (max-width: 768px) {
  .glitch {
    font-size: 45px;
  }
}

@keyframes glitch-loop-1 {
  0% {
    clip: rect(36px, 9999px, 9px, 0);
  }

  25% {
    clip: rect(25px, 9999px, 99px, 0);
  }

  50% {
    clip: rect(50px, 9999px, 102px, 0);
  }

  75% {
    clip: rect(30px, 9999px, 92px, 0);
  }

  100% {
    clip: rect(91px, 9999px, 98px, 0);
  }
}

@keyframes glitch-loop-2 {
  0% {
    top: -1px;
    left: 1px;
    clip: rect(65px, 9999px, 119px, 0);
  }

  25% {
    top: -6px;
    left: 4px;
    clip: rect(79px, 9999px, 19px, 0);
  }

  50% {
    top: -3px;
    left: 2px;
    clip: rect(68px, 9999px, 11px, 0);
  }

  75% {
    top: 0;
    left: -4px;
    clip: rect(95px, 9999px, 53px, 0);
  }

  100% {
    top: -1px;
    left: -1px;
    clip: rect(31px, 9999px, 149px, 0);
  }
}
</style>
