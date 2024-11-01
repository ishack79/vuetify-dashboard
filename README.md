# Vue 3 + Vuetify + Vite
npm install
npm run build
npm run dev

# Instanciate Web Component:

<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <!-- Vuetify CSS (for Vuetify components inside the custom element) -->
    <link href="https://cdn.jsdelivr.net/npm/vuetify@3.x/dist/vuetify.min.css" rel="stylesheet">
  </head>
  <body>
    <div id="app">
      <!-- Your Vue 2 app will mount here -->
      <!-- Use the custom element -->
      <reports-vue3></reports-vue3>
    </div>

    <!-- Vue 3 (required for the custom element) -->
    <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
    <!-- ECharts (if externalized) -->
    <script src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"></script>
    <!-- Vuetify JS (if externalized) -->
    <script src="https://cdn.jsdelivr.net/npm/vuetify@3.x/dist/vuetify.umd.min.js"></script>
    <!-- Web Component script -->
    <script src="path/to/reports-vue3.umd.js"></script>

    <!-- Vue 2 app scripts -->
    <script src="path/to/vue2-app.js"></script>
  </body>
</html>

<!-- In Vue 2 component -->
<template>
  <div>
    <!-- Other content -->
    <reports-vue3></reports-vue3>
  </div>
</template>

<script>
export default {
  // No need to register the custom element
}
</script>

# Build Web Component

npm run build

# Shadow DOM and Styles:
<!-- App.vue -->
<script>
export default {
  // Component options
  shadow: false, // Disable Shadow DOM
}
</script>

# Event Communications
<!-- App.vue -->
<script>
export default {
  methods: {
    notifyParent() {
      this.$emit('custom-event', { data: 'example' })
    },
  },
}
</script>

<!-- In your Vue 2 component -->
<template>
  <div>
    <reports-vue3 @custom-event="handleCustomEvent"></reports-vue3>
  </div>
</template>

<script>
export default {
  methods: {
    handleCustomEvent(event) {
      // Handle the event data
      console.log(event.detail)
    },
  },
}
</script>