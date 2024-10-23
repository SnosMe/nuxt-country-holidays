// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['nuxtjs-naive-ui', '@nuxt/eslint'],
  ssr: false,
  devtools: { enabled: false },
  router: { options: { hashMode: true } },
  compatibilityDate: '2024-04-03',
  eslint: {
    config: { stylistic: { semi: true } },
  },
});
