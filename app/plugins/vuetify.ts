import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const natureTheme = {
  dark: false,
  colors: {
    background: '#455a30', // From the dark green background in the mockup
    surface: '#eef2e6', // Soft light green for the component cards
    primary: '#425831', // Base dark olive/green
    secondary: '#8db750', // Brighter green for highlights (buttons/badges)
    accent: '#a2c16c',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: false,
    components,
    directives,
    theme: {
      defaultTheme: 'natureTheme',
      themes: {
        natureTheme,
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
