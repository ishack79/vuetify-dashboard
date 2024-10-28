<script setup>
import ChartComponent from './ChartComponent.vue'
import BarRaceChart from './BarRaceChart.vue'
import HeatmapChart from './HeatmapChart.vue'
</script>

<template>
  <v-card class="mx-auto" max-width="1200">
    <v-card-title>Admin Dashboard</v-card-title>
    <v-card-text>
      <ChartComponent />
      <BarRaceChart />
      <HeatmapChart />
    </v-card-text>
  </v-card>
</template>