import { acceptHMRUpdate, defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useFiricAppStore = defineStore('firic-app', () => {
  // global cache for yun
  const currentWallpaperIndex = useLocalStorage<number>('wallpaperIndex', 0)

  const setWallpaperIndex = (index: number) => {
    currentWallpaperIndex.value = index
  }
  return {
    currentWallpaperIndex,
    setWallpaperIndex,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useFiricAppStore, import.meta.hot))
