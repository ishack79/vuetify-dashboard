<script setup>
import { ref, computed } from 'vue';
import MultipleHeadingDataTable from './MultipleHeadingDataTable.vue';
import { getToolbarComponent } from './toolbars';
import { TAB_MAPPINGS } from '../constants/tabMappings';
import { generateMockFlightData, getFlightTableHeaders } from '../utils/mockData';
import TabGroup from './tabs/TabGroup.vue';
import SubTab from './tabs/SubTab.vue';

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
const showFilters = ref(false);
const filteredData = ref([]);
const isRefreshing = ref(false);

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
  return getToolbarComponent(props.selectedMenu, getTabNames.value[tab.value]);
});

const handleRefresh = async () => {
  isRefreshing.value = true;
  try {
    // Simulate API call with timeout
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Refresh logic here
  } finally {
    isRefreshing.value = false;
  }
};

const handleTabSelect = (index) => {
  tab.value = index;
};

const toggleFilters = () => {
  showFilters.value = !showFilters.value;
};

const handleFilteredDataChange = (data) => {
  filteredData.value = data;
};
</script>

<template>
  <div class="main-content">
    <v-card class="mb-1" elevation="0">
      <TabGroup
        variant="sub"
        class="mb-1"
      >
        <SubTab
          v-for="(name, i) in getTabNames"
          :key="i"
          :title="name"
          :is-active="tab === i"
          @select="handleTabSelect(i)"
        />
      </TabGroup>
      
      <v-window v-model="tab">
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
              :headers="mockHeaders"
              :items="filteredData"
              :is-refreshing="isRefreshing"
              @refresh="handleRefresh"
              @toggleFilters="toggleFilters"
            />
            <MultipleHeadingDataTable
              :headers="mockHeaders"
              :items="mockData"
              :loading="isRefreshing"
              v-model:showFilters="showFilters"
              @filteredDataChange="handleFilteredDataChange"
            />
          </v-card>
        </v-window-item>
      </v-window>
    </v-card>
  </div>
</template>

<style scoped>
.main-content {
  padding: 1px;
}
</style>