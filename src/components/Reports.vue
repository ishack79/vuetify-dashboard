<script setup>
import { ref, computed } from 'vue';
import MainContent from './MainContent.vue';
import { TAB_MAPPINGS } from '../constants/tabMappings';
import TabGroup from './tabs/TabGroup.vue';
import MainTab from './tabs/MainTab.vue';

const tabTitles = computed(() => Object.keys(TAB_MAPPINGS));
const selectedMenu = ref('Towing');

const handleTabSelect = (tab) => {
  selectedMenu.value = tab;
};
</script>

<template>
  <v-card flat>
    <TabGroup variant="main">
      <MainTab
        v-for="title in tabTitles"
        :key="title"
        :title="title"
        :is-active="selectedMenu === title"
        @select="handleTabSelect(title)"
      />
    </TabGroup>

    <v-card-text>
      <MainContent :selected-menu="selectedMenu" />
    </v-card-text>
  </v-card>
</template>