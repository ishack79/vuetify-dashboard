<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
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

const updateOrientation = () => {
  isHorizontal.value = window.innerWidth > window.innerHeight;
};

const updateChartSetting = (updatedChart) => {
  const index = chartSettings.value.findIndex(c => c.id === updatedChart.id);
  if (index !== -1) {
    chartSettings.value[index] = updatedChart;
  }
};

const isChartEnabled = (component) => {
  const chart = chartSettings.value.find(c => c.component === component);
  return chart ? chart.enabled : false;
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
    <v-row v-if="isHorizontal">
      <v-col cols="12" md="6" v-if="isChartEnabled('ChartComponent')">
        <ChartComponent />
      </v-col>
      <v-col cols="12" md="6" v-if="isChartEnabled('BarRaceChart')">
        <BarRaceChart />
      </v-col>
    </v-row>
    <v-row v-if="isHorizontal">
      <v-col cols="12" md="6" v-if="isChartEnabled('HeatmapChart')">
        <HeatmapChart />
      </v-col>
      <v-col cols="12" md="6" v-if="isChartEnabled('PieChart')">
        <PieChart />
      </v-col>
    </v-row>
    <v-row v-if="isHorizontal">
      <v-col cols="12" md="6" v-if="isChartEnabled('RunwayOccupancyChart')">
        <RunwayOccupancyChart />
      </v-col>
      <v-col cols="12" md="6" v-if="isChartEnabled('GanttChart')">
        <GanttChart />
      </v-col>
    </v-row>
    <v-row v-if="!isHorizontal">
      <v-col cols="12" v-if="isChartEnabled('ChartComponent')">
        <ChartComponent />
      </v-col>
    </v-row>
    <v-row v-if="!isHorizontal">
      <v-col cols="12" v-if="isChartEnabled('BarRaceChart')">
        <BarRaceChart />
      </v-col>
    </v-row>
    <v-row v-if="!isHorizontal">
      <v-col cols="12" v-if="isChartEnabled('HeatmapChart')">
        <HeatmapChart />
      </v-col>
    </v-row>
    <v-row v-if="!isHorizontal">
      <v-col cols="12" v-if="isChartEnabled('PieChart')">
        <PieChart />
      </v-col>
    </v-row>
    <v-row v-if="!isHorizontal">
      <v-col cols="12" v-if="isChartEnabled('RunwayOccupancyChart')">
        <RunwayOccupancyChart />
      </v-col>
    </v-row>
    <v-row v-if="!isHorizontal">
      <v-col cols="12" v-if="isChartEnabled('GanttChart')">
        <GanttChart />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.settings-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 100;
}
</style>