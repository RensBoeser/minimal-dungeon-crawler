// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxtjs/tailwindcss", "@nuxt/icon", "@nuxt/eslint", "@nuxtjs/i18n", "@vueuse/nuxt"],
  i18n: {
    locales: ["en", "nl"],
    defaultLocale: "en",
    strategy: "no_prefix",
    vueI18n: "./i18n.config.ts",
  },
  nitro: {
    preset: "vercel",
    experimental: {
      openAPI: true,
    },
    storage: {
      data: {
        driver: "vercelKV",
      },
    },
    devStorage: {
      data: {
        driver: "fs",
        base: "./.data/db",
      },
    },
  },
})
