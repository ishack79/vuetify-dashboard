<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import ChartComponent from './ChartComponent.vue';
import BarRaceChart from './BarRaceChart.vue';
import HeatmapChart from './HeatmapChart.vue';
import PieChart from './PieChart.vue';
import RunwayOccupancyChart from './RunwayOccupancyChart.vue';
import GanttChart from './GanttChart.vue';
import DashboardSettings from './DashboardSettings.vue';

const isHorizontal = ref(window.innerWidth > window.innerHeight);
const showSettings = ref(false);

const chartSettings = ref([
  { id: 1, name: 'Volume of Departures and Arrivals', component: 'ChartComponent', enabled: true, icon: 'mdi-chart-line' },
  { id: 2, name: 'Volume of Traffic per Airline', component: 'BarRaceChart', enabled: true, icon: 'mdi-chart-bar' },
  { id: 3, name: 'Volume of Flight Plan Traffic', component: 'HeatmapChart', enabled: true, icon: 'mdi-chart-scatter-plot' },
  { id: 4, name: 'Flight Plan Distribution', component: 'PieChart', enabled: true, icon: 'mdi-chart-pie' },
  { id: 5, name: 'Runway Occupancy', component: 'RunwayOccupancyChart', enabled: true, icon: 'mdi-airplane' },
  { id: 6, name: 'Airport Flight Schedule', component: 'GanttChart', enabled: true, icon: 'mdi-calendar-clock' },
]);

const enabledCharts = computed(() => {
  return chartSettings.value.filter(chart => chart.enabled);
});

const chartRows = computed(() => {
  const charts = enabledCharts.value;
  const rows = [];
  let currentRow = [];

  charts.forEach((chart, index) => {
    if (currentRow.length === 2) {
      rows.push([...currentRow]);
      currentRow = [];
    }
    currentRow.push(chart);

    // Push the last row if we're at the end
    if (index === charts.length - 1 && currentRow.length > 0) {
      rows.push([...currentRow]);
    }
  });

  return rows;
});

const updateOrientation = () => {
  isHorizontal.value = window.innerWidth > window.innerHeight;
};

const updateChartSetting = (updatedChart) => {
  const index = chartSettings.value.findIndex(c => c.id === updatedChart.id);
  if (index !== -1) {
    chartSettings.value[index] = updatedChart;
  }
};

const getChartComponent = (componentName) => {
  const components = {
    ChartComponent,
    BarRaceChart,
    HeatmapChart,
    PieChart,
    RunwayOccupancyChart,
    GanttChart
  };
  return components[componentName];
};

onMounted(() => {
  window.addEventListener('resize', updateOrientation);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateOrientation);
});
</script>

<template>
  <v-container fluid class="position-relative">
    <!-- Settings Button -->
    <v-btn
      icon="mdi-cog"
      color="primary"
      class="settings-btn"
      @click="showSettings = true"
    />

    <!-- Settings Modal -->
    <DashboardSettings
      v-model="showSettings"
      :settings="chartSettings"
      @update-setting="updateChartSetting"
    />

    <!-- Dashboard Content -->
    <template v-if="isHorizontal">
      <v-row v-for="(row, rowIndex) in chartRows" :key="rowIndex" class="mb-6">
        <v-col
          v-for="chart in row"
          :key="chart.id"
          :cols="12"
          :md="row.length === 1 ? 12 : 6"
        >
          <component :is="getChartComponent(chart.component)" />
        </v-col>
      </v-row>
    </template>

    <template v-else>
      <v-row v-for="chart in enabledCharts" :key="chart.id">
        <v-col cols="12">
          <component :is="getChartComponent(chart.component)" />
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<style scoped>
.settings-btn {
  position: absolute;
  top: -2.5rem;
  right: 1rem;
  z-index: 100;
}
</style>