<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import ChartComponent from './ChartComponent.vue';
import BarRaceChart from './BarRaceChart.vue';
import HeatmapChart from './HeatmapChart.vue';
import PieChart from './PieChart.vue';
import RunwayOccupancyChart from './RunwayOccupancyChart.vue';
import GanttChart from './GanttChart.vue';

const isHorizontal = ref(window.innerWidth > window.innerHeight);

const updateOrientation = () => {
  isHorizontal.value = window.innerWidth > window.innerHeight;
};

onMounted(() => {
  window.addEventListener('resize', updateOrientation);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateOrientation);
});
</script>

<template>
  <v-container fluid>
    <v-row v-if="isHorizontal">
      <v-col cols="12" md="6">
        <ChartComponent />
      </v-col>
      <v-col cols="12" md="6">
        <BarRaceChart />
      </v-col>
    </v-row>
    <v-row v-if="isHorizontal">
      <v-col cols="12" md="6">
        <HeatmapChart />
      </v-col>
      <v-col cols="12" md="6">
        <PieChart />
      </v-col>
    </v-row>
    <v-row v-if="isHorizontal">
      <v-col cols="12" md="6">
        <RunwayOccupancyChart />
      </v-col>
      <v-col cols="12" md="6">
        <GanttChart />
      </v-col>
    </v-row>
    <v-row v-if="!isHorizontal">
      <v-col cols="12">
        <ChartComponent />
      </v-col>
    </v-row>
    <v-row v-if="!isHorizontal">
      <v-col cols="12">
        <BarRaceChart />
      </v-col>
    </v-row>
    <v-row v-if="!isHorizontal">
      <v-col cols="12">
        <HeatmapChart />
      </v-col>
    </v-row>
    <v-row v-if="!isHorizontal">
      <v-col cols="12">
        <PieChart />
      </v-col>
    </v-row>
    <v-row v-if="!isHorizontal">
      <v-col cols="12">
        <RunwayOccupancyChart />
      </v-col>
    </v-row>
    <v-row v-if="!isHorizontal">
      <v-col cols="12">
        <GanttChart />
      </v-col>
    </v-row>
  </v-container>
</template>
