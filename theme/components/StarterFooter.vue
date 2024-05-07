<script lang="ts" setup>
import { capitalize, computed } from 'vue'
import { useSiteConfig, useValaxyConfig } from 'valaxy'
import { useI18n } from 'vue-i18n'

import pkg from 'valaxy/package.json'
import { differenceInDays, differenceInMonths, differenceInYears } from 'date-fns'
import { useThemeConfig } from '../composables'

const { t } = useI18n()

const config = useValaxyConfig()
const siteConfig = useSiteConfig()
const themeConfig = useThemeConfig()

const year = new Date().getFullYear()

const isThisYear = computed(() => {
  return year === themeConfig.value.footer.since
})

const poweredHtml = computed(() => t('footer.powered', [`<a href="${pkg.repository}" target="_blank" rel="noopener">Valaxy</a> v${pkg.version}`]))
const footerIcon = computed(() => themeConfig.value.footer.icon!)

const buildTime = computed(() => {
  const now = new Date()
  const tartget = new Date(themeConfig.value.footer.buildTime!)
  const years = -differenceInYears(tartget, now)
  const months = -differenceInMonths(tartget, now) % 12
  const days = -differenceInDays(tartget, now) % 30
  let fomatTime = ''
  if (years > 0)
    fomatTime += `${years}年`

  if (months > 0)
    fomatTime += `${months}月`

  if (days > 0)
    fomatTime += `${days}天`

  return fomatTime
})
</script>

<template>
  <footer class="va-footer p-4" text="center sm" style="color:var(--va-c-text-light)">
    <div v-if="themeConfig.footer.beian?.enable && themeConfig.footer.beian.icp" class="beian" m="y-2">
      <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener">
        {{ themeConfig.footer.beian.icp }}
      </a>
    </div>

    <div class="copyright flex justify-center items-center" p="1">
      <span>
        &copy;
        <template v-if="!isThisYear">
          {{ themeConfig.footer.since }} -
        </template>
        {{ year }}
      </span>

      <a m="x-2" class="inline-flex animate-pulse" :href="footerIcon.url" target="_blank" :title="footerIcon.title">
        <div :class="footerIcon.name" />
      </a>

      <span>{{ siteConfig.author.name }}</span>
    </div>
    <div>本站已萌萌哒运行{{ buildTime }}</div>
    <div v-if="themeConfig.footer.powered" class="powered" m="2">
      <span v-html="poweredHtml" /> | <span>{{ t('footer.theme') }} - <a :href="themeConfig.pkg.homepage" :title="`valaxy-theme-${config.theme}`" target="_blank">{{ capitalize(config.theme) }}</a> v{{ themeConfig.pkg.version }}</span>
    </div>

    <slot />
  </footer>
</template>
