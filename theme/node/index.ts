import type { Plugin } from 'vite'
import type { ResolvedValaxyOptions } from 'valaxy'
import type { ThemeConfig } from '../types'

/**
 * Default Config
 */
export const defaultThemeConfig: ThemeConfig = {
  colors: {
    primary: '#0078E7',
  },

  footer: {
    since: 2024,
    icon: {
      name: 'i-ri-cloud-line',
      animated: true,
      color: 'var(--va-c-primary)',
      url: 'https://sponsors.yunyoujun.cn',
      title: 'Blueflame',
    },
    buildTime: '2019-1-1',
    powered: true,

    beian: {
      enable: false,
      icp: '',
    },
  },

  nav: [],

  banner: {
    enable: true,
    urls: ['https://img.blueflame.org.cn/images/2022/08/01/62e7ad8f22620.jpg', 'https://w.wallhaven.cc/full/l8/wallhaven-l8kwpr.jpg', 'https://w.wallhaven.cc/full/p9/wallhaven-p955gm.jpg', 'https://wrxinyue-images.s3.bitiful.net/wallpaper/Genshin%20Impact%20-%20Yae%20Miko%20(4)%20Cybust%20PC.mp4'],
    title: 'Hello, Firic',
    description: 'Valaxy Theme for Valaxy',
  },
}

// write a vite plugin
// https://vitejs.dev/guide/api-plugin.html
export function themePlugin(options: ResolvedValaxyOptions<ThemeConfig>): Plugin {
  const themeConfig = options.config.themeConfig || {}

  return {
    name: 'valaxy-theme-firic',

    config() {
      return {
        css: {
          preprocessorOptions: {
            scss: {
              additionalData: `$c-primary: ${themeConfig.colors?.primary || '#0078E7'} !default;`,
            },
          },
        },

        valaxy: {},
      }
    },
  }
}

/**
 * generateSafelist by config
 * @param themeConfig
 */
export function generateSafelist(themeConfig: ThemeConfig) {
  const safelist: string[] = []

  const footerIcon = themeConfig.footer?.icon?.name
  if (footerIcon)
    safelist.push(footerIcon)

  return safelist
}
