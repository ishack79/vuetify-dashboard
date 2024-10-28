<script setup>
import ChartComponent from './ChartComponent.vue'
import BarRaceChart from './BarRaceChart.vue'
import HeatmapChart from './HeatmapChart.vue'
import PieChart from './PieChart.vue'
import RunwayOccupancyChart from './RunwayOccupancyChart.vue'
</script>

<template>
  <v-card class="mx-auto" max-width="3000">
    <v-card-text>
      <v-container>
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
          <v-col cols="12">
            <RunwayOccupancyChart />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>