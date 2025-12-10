export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  nitro: {
    preset: "static"
  },
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    head: {
      title: 'Third Aragon',
      meta: [
        { name: 'description', content: 'Personal website and blog' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      firebaseApiKey: "AIzaSyCjbDFKcckFq-TQjepDLI0NFMbMtjX_tL0",
      firebaseAuthDomain: "third-aragon.firebaseapp.com",
      firebaseProjectId: "third-aragon",
      firebaseStorageBucket: "third-aragon.firebasestorage.app",
      firebaseMessagingSenderId: "593512402962",
      firebaseAppId: "1:593512402962:web:b7048a1b21eedb22ae48cb",
      firebaseMeasurementId: "G-Q5MGCJHGPM"
    }
  }
})
