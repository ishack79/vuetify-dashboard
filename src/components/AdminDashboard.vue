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
const draggedChart = ref(null);
const draggedIndex = ref(null);

const chartSettings = ref([
  { id: 1, name: 'Volume of Departures and Arrivals', component: 'ChartComponent', enabled: true, icon: 'mdi-chart-line', order: 0 },
  { id: 2, name: 'Volume of Traffic per Airline', component: 'BarRaceChart', enabled: true, icon: 'mdi-chart-bar', order: 1 },
  { id: 3, name: 'Volume of Flight Plan Traffic', component: 'HeatmapChart', enabled: true, icon: 'mdi-chart-scatter-plot', order: 2 },
  { id: 4, name: 'Flight Plan Distribution', component: 'PieChart', enabled: true, icon: 'mdi-chart-pie', order: 3 },
  { id: 5, name: 'Runway Occupancy', component: 'RunwayOccupancyChart', enabled: false, icon: 'mdi-airplane', order: 4 },
  { id: 6, name: 'Airport Flight Schedule', component: 'GanttChart', enabled: false, icon: 'mdi-calendar-clock', order: 5 },
]);

const enabledCharts = computed(() => {
  return chartSettings.value
    .filter(chart => chart.enabled)
    .slice(0, 4)
    .sort((a, b) => a.order - b.order);
});

const chartRows = computed(() => {
  const charts = enabledCharts.value;
  const rows = [];
  for (let i = 0; i < charts.length; i += 2) {
    rows.push(charts.slice(i, i + 2));
  }
  return rows;
});

const updateOrientation = () => {
  isHorizontal.value = window.innerWidth > window.innerHeight;
};

const updateChartSetting = (updatedChart) => {
  const enabledCount = chartSettings.value.filter(c => c.enabled).length;
  const index = chartSettings.value.findIndex(c => c.id === updatedChart.id);
  
  if (!updatedChart.enabled || enabledCount < 4 || chartSettings.value[index].enabled) {
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

const handleDragStart = (chart, index) => {
  draggedChart.value = chart;
  draggedIndex.value = index;
};

const handleDragOver = (e) => {
  e.preventDefault();
};

const handleDrop = (targetChart) => {
  if (!draggedChart.value || draggedChart.value.id === targetChart.id) return;

  const draggedOrder = draggedChart.value.order;
  const targetOrder = targetChart.order;

  // Update orders in chartSettings
  chartSettings.value = chartSettings.value.map(chart => {
    if (chart.id === draggedChart.value.id) {
      return { ...chart, order: targetOrder };
    }
    if (chart.id === targetChart.id) {
      return { ...chart, order: draggedOrder };
    }
    return chart;
  });

  draggedChart.value = null;
  draggedIndex.value = null;
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
          cols="12"
          md="6"
        >
          <div
            class="chart-container"
            draggable="true"
            @dragstart="handleDragStart(chart, chart.order)"
            @dragover="handleDragOver"
            @drop="handleDrop(chart)"
          >
            <component :is="getChartComponent(chart.component)" />
            <div class="drag-handle">
              <v-icon icon="mdi-drag" />
            </div>
          </div>
        </v-col>
      </v-row>
    </template>

    <template v-else>
      <v-row v-for="chart in enabledCharts" :key="chart.id">
        <v-col cols="12">
          <div
            class="chart-container"
            draggable="true"
            @dragstart="handleDragStart(chart, chart.order)"
            @dragover="handleDragOver"
            @drop="handleDrop(chart)"
          >
            <component :is="getChartComponent(chart.component)" />
            <div class="drag-handle">
              <v-icon icon="mdi-drag" />
            </div>
          </div>
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

.chart-container {
  position: relative;
  cursor: move;
}

.chart-container:hover .drag-handle {
  opacity: 1;
}

.drag-handle {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.5rem;
  opacity: 0;
  transition: opacity 0.2s ease;
  background: rgba(35, 36, 66, 0.9);
  border-radius: 4px;
  z-index: 1;
}

.drag-handle .v-icon {
  color: #e2e8f0;
}
</style>