<script setup>
import { ref } from 'vue'
import MainContent from './MainContent.vue'

const menuItems = [
  { title: 'Towing'},
  { title: 'Deicing'},
  { title: 'LVP'},
  { title: 'Delay'},
  { title: 'Traffic'},
  { title: 'Occupancy'},
  { title: 'Total Traffic'},
  { title: 'Taxi Time'},
  { title: 'Snow'},
  { title: 'Runway Maintenance'}
]

const selectedMenu = ref('Towing')
</script>

<template>
  <v-card flat>
    <v-tabs
      v-model="selectedMenu"
      color="primary"
      align-tabs="center"
      fixed-tabs
      show-arrows
    >
      <v-tab
        v-for="item in menuItems"
        :key="item.title"
        :value="item.title"
        class="text-none"
      >
        {{ item.title }}
      </v-tab>
    </v-tabs>

    <v-card-text>
      <MainContent :selected-menu="selectedMenu" />
    </v-card-text>
  </v-card>
</template>

<style scoped>
.v-tab {
  min-width: 150px;
}
</style>