<script setup>
import { ref } from 'vue'
import Reports from './components/Reports.vue'

const selectedMenu = ref('Dashboard')
</script>

<template>
  <v-app>
    <Reports />
  </v-app>
</template>