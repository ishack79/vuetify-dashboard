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
const settingsTimeout = ref(null);

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

const handleMouseMove = (e) => {
  if (e.clientX >= window.innerWidth - 10) {
    showSettings.value = true;
  }
};

const handleSettingsMouseLeave = () => {
  settingsTimeout.value = setTimeout(() => {
    showSettings.value = false;
  }, 300);
};

const handleSettingsMouseEnter = () => {
  if (settingsTimeout.value) {
    clearTimeout(settingsTimeout.value);
  }
};

onMounted(() => {
  window.addEventListener('resize', updateOrientation);
  window.addEventListener('mousemove', handleMouseMove);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateOrientation);
  window.removeEventListener('mousemove', handleMouseMove);
  if (settingsTimeout.value) {
    clearTimeout(settingsTimeout.value);
  }
});
</script>

<template>
  <v-container fluid class="dashboard-container">
    <!-- Settings Panel -->
    <div 
      class="settings-panel"
      :class="{ 'show-settings': showSettings }"
      @mouseleave="handleSettingsMouseLeave"
      @mouseenter="handleSettingsMouseEnter"
    >
      <DashboardSettings
        :model-value="showSettings"
        :settings="chartSettings"
        @update-setting="updateChartSetting"
      />
    </div>

    <!-- Dashboard Content -->
    <div class="dashboard-content" :class="{ 'empty': enabledCharts.length === 0 }">
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

      <div v-if="enabledCharts.length === 0" class="empty-state">
        <v-icon icon="mdi-chart-box-outline" size="64" color="grey-darken-1" />
        <p class="text-grey-darken-1 text-h6 mt-4">No charts selected</p>
        <p class="text-grey-darken-1">Enable charts from the settings panel to view them here</p>
      </div>
    </div>
  </v-container>
</template>

<style scoped>
.dashboard-container {
  position: relative;
  min-height: 100vh;
  padding: 16px;
}

.dashboard-content {
  min-height: calc(100vh - 32px);
  position: relative;
}

.dashboard-content.empty {
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-state {
  text-align: center;
  padding: 32px;
}

.settings-panel {
  position: fixed;
  top: 0;
  right: -400px;
  width: 400px;
  height: 100vh;
  background: rgba(35, 36, 66, 0.95);
  z-index: 1000;
  transition: transform 0.3s ease-in-out;
  box-shadow: -4px 0 15px rgba(0, 0, 0, 0.3);
  padding: 2rem;
}

.show-settings {
  transform: translateX(-400px);
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