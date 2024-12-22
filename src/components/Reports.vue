<script setup>
import { ref, computed } from 'vue'
import MainContent from './MainContent.vue'
import { TAB_MAPPINGS } from '../constants/tabMappings'

const tabTitles = computed(() => Object.keys(TAB_MAPPINGS))

// Default selection
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
        v-for="title in tabTitles"
        :key="title"
        :value="title"
        class="text-none"
      >
        {{ title }}
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