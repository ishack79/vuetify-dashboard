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
const fromDate = ref(new Date());
const toDate = ref(new Date());
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
  <div class="dashboard-content">
    <v-card class="mb-1" elevation="0">
      <v-tabs
        v-model="tab"
        color="primary"
        slider-color="primary"
        class="mb-1"
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
            class="mt-1"
            elevation="0"
          >
            <component 
              :is="currentToolbar"
              v-model:fromDate="fromDate"
              v-model:toDate="toDate"
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
  </div>
</template>

<style scoped>
.dashboard-content {
  padding: 16px;
}

.v-menu__content--fixed {
  position: absolute !important;
}

.Datepicker {
  max-width: 290px;
}
</style>