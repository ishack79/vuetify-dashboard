<script setup>
import { ref } from 'vue'
// import StatusBar from './StatusBar.vue'
import NavigationMenu from './NavigationMenu.vue'
import MainContent from './MainContent.vue'

const selectedMenu = ref('Towing')
</script>

<template>
    <!-- <StatusBar /> -->
    <NavigationMenu v-model="selectedMenu" />
    <MainContent :selected-menu="selectedMenu" />
</template>