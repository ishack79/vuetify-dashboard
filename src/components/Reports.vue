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
    <div class="tab-container">
      <TabGroup variant="main" class="main-tabs">
        <MainTab
          v-for="title in tabTitles"
          :key="title"
          :title="title"
          :is-active="selectedMenu === title"
          @select="handleTabSelect(title)"
        />
      </TabGroup>
    </div>

    <v-card-text class="pa-0">
      <MainContent :selected-menu="selectedMenu" />
    </v-card-text>
  </v-card>
</template>

<style scoped>
.tab-container {
  padding: 0 16px;
  background: rgba(25, 26, 26, 0.95);
}

.main-tabs {
  display: flex;
  width: 100%;
}

:deep(.tab-group) {
  width: 100%;
}

:deep(.main-tab) {
  flex: 1;
  min-width: fit-content;
}
</style>