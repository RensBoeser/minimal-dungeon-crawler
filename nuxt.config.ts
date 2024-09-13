// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxtjs/tailwindcss", "@nuxt/icon", "@nuxt/eslint", "@nuxtjs/i18n"],
  i18n: {
    locales: ["en", "nl"],
    defaultLocale: "en",
    strategy: "no_prefix",
    vueI18n: "./i18n.config.ts",
  },
  nitro: {
    storage: {
      db: {
        driver: "fs",
        base: "./data/db",
      },
    },
  },
})
