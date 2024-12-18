<script setup>
import { ref, computed } from 'vue'
import DataTable from './DataTable.vue'
import AdminDashboard from './AdminDashboard.vue'
import { getToolbarComponent } from './toolbars'
import { TAB_MAPPINGS } from '../constants/tabMappings'
import { generateMockFlightData, getFlightTableHeaders } from '../utils/mockData'

const props = defineProps({
  selectedMenu: {
    type: String,
    required: true
  }
});

const tab = ref(0);
const toDate = ref(new Date().toISOString().substr(0, 10));
const fromDate = ref(new Date().toISOString().substr(0, 10));
const useMockData = ref(true);

const mockHeaders = computed(() => {
  return useMockData.value ? getFlightTableHeaders() : [];
});

const mockData = computed(() => {
  return useMockData.value ? generateMockFlightData() : [];
});

const getTabNames = computed(() => {
  return TAB_MAPPINGS[props.selectedMenu] || [];
});

const currentToolbar = computed(() => {
  if (props.selectedMenu === 'Dashboard') return null;
  return getToolbarComponent(props.selectedMenu, getTabNames.value[tab.value]);
});

const handleRefresh = () => {
  // Implement refresh logic here
  console.log('Refreshing data...');
};
</script>

<template>
  <v-main class="dashboard-content">
    <v-card class="mb-6" elevation="0">
      <v-card-title class="text-h5 font-weight-bold pb-2">
        {{ selectedMenu }}
      </v-card-title>
      <v-tabs
        v-model="tab"
        color="primary"
        slider-color="primary"
        class="mb-2"
        v-if="selectedMenu !== 'Dashboard'"
      >
        <v-tab
          v-for="(name, i) in getTabNames"
          :key="i"
          :value="i"
          class="text-none"
        >
          {{ name }}
        </v-tab>
      </v-tabs>
      
      <v-window v-model="tab" v-if="selectedMenu !== 'Dashboard'">
        <v-window-item
          v-for="(name, i) in getTabNames"
          :key="i"
          :value="i"
        >
          <v-card
            class="mt-4"
            elevation="0"
          >
            <component 
              :is="currentToolbar"
              v-model:from-date="fromDate"
              v-model:to-date="toDate"
              @refresh="handleRefresh"
            />
            <DataTable
              :headers="mockHeaders"
              :items="mockData"
            />
          </v-card>
        </v-window-item>
      </v-window>

      <AdminDashboard v-if="selectedMenu === 'Dashboard'" />
    </v-card>
  </v-main>
</template>

<style scoped>
.v-menu__content--fixed {
  position: absolute !important;
}

.Datepicker {
  max-width: 290px;
}
</style>