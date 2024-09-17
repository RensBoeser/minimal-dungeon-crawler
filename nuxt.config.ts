// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxtjs/tailwindcss", "@nuxt/icon", "@nuxt/eslint", "@nuxtjs/i18n", "@nuxthub/core", "nuxt-lodash"],
  i18n: {
    locales: ["en", "nl"],
    defaultLocale: "en",
    strategy: "no_prefix",
    vueI18n: "./i18n.config.ts",
  },
  nitro: {
    preset: "cloudflare-pages",
    experimental: {
      openAPI: true,
    },
    storage: {
      db: {
        driver: "fs",
        base: "./data/db",
      },
    },
  },
  hub: {
    kv: true,
    cache: true,
  },
})
