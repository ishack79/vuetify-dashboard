<script setup>
import ChartComponent from './ChartComponent.vue'
import BarRaceChart from './BarRaceChart.vue'
</script>

<template>
  <v-card class="mx-auto" max-width="1200">
    <v-card-title>Admin Dashboard</v-card-title>
    <v-card-text>
      <ChartComponent />
      <BarRaceChart />
    </v-card-text>
  </v-card>
</template>