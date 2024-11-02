import { createApp, defineCustomElement } from 'vue'
import Reports from './components/Reports.vue'

// Import Vuetify components, directives, and styles
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

// Create Vuetify instance
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'darkTheme',
    themes: {
      darkTheme: {
        dark: true,
        colors: {
          primary: '#6366f1',
          secondary: '#818cf8',
          accent: '#4f46e5',
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
          info: '#3b82f6',
          background: '#1a1b2e',
          surface: '#232442',
          'surface-bright': '#2a2b4d',
          'on-surface': '#e2e8f0',
        },
      },
    },
  },
})

// Create a Vue app instance
const app = createApp({})

// Use Vuetify plugin
app.use(vuetify)

// Get the app's context
const appContext = app._context

// Define the custom element from App.vue
const MyAppElement = defineCustomElement(Reports)

// Attach the app context to the custom element
MyAppElement.appContext = appContext

// Register the custom element
customElements.define('reports-vue3', MyAppElement)