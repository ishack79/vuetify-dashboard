<script setup>
import { ref } from 'vue'
import StatusBar from './components/StatusBar.vue'
import NavigationMenu from './components/NavigationMenu.vue'
import DashboardContent from './components/DashboardContent.vue'

const selectedMenu = ref('Dashboard')
</script>

<template>
  <v-app>
    <StatusBar />
    <NavigationMenu v-model="selectedMenu" />
    <DashboardContent :selected-menu="selectedMenu" />
  </v-app>
</template>