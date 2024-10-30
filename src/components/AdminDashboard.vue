<script setup>
import ChartComponent from './ChartComponent.vue'
import BarRaceChart from './BarRaceChart.vue'
import HeatmapChart from './HeatmapChart.vue'
import PieChart from './PieChart.vue'
import RunwayOccupancyChart from './RunwayOccupancyChart.vue'
import GanttChart from './GanttChart.vue'
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6">
        <ChartComponent />
      </v-col>
      <v-col cols="12" md="6">
        <BarRaceChart />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <HeatmapChart />
      </v-col>
      <v-col cols="12" md="6">
        <PieChart />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <RunwayOccupancyChart />
      </v-col>
      <v-col cols="12" md="6">
        <GanttChart />
      </v-col>
    </v-row>
  </v-container>
</template>