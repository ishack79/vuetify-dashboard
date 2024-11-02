<script setup>
import { ref } from 'vue'
import StatusBar from './StatusBar.vue'
import NavigationMenu from './NavigationMenu.vue'
import DashboardContent from './DashboardContent.vue'

const selectedMenu = ref('Dashboard')
</script>

<template>
    <StatusBar />
    <NavigationMenu v-model="selectedMenu" />
    <DashboardContent :selected-menu="selectedMenu" />
</template>