<script setup>
import { ref, onMounted } from 'vue'

const time = ref(new Date().toUTCString())
const weather = ref({ temp: 'Snow', condition: '- LVP' })
const airportStats = ref({
  name: 'Oslo Airport',
  delayTime: '55 mins',
  deicingOps: '120',
  onTimePerformance: '55%'
})

onMounted(() => {
  setInterval(() => {
    time.value = new Date().toUTCString()
  }, 1000)
})
</script>

<template>
  <v-app-bar 
    elevation="0"
    class="px-4"
  >
    <v-container class="d-flex align-center justify-space-between py-2">
      <v-chip
        class="status-bar-chip"
        color="primary"
        variant="elevated"
        label
        size="large"
        style="font-size: 1.2em; padding: 0.5em;"
      >
        <v-icon start icon="mdi-airport" />
        {{ airportStats.name }}
      </v-chip>
      
      <v-chip
        class="status-bar-chip"
        color="info"
        variant="elevated"
        label
        style="font-size: 1.2em; padding: 0.5em;"
      >
        <v-icon start icon="mdi-clock-outline" />
        {{ time }}
      </v-chip>
      
      <v-chip
        class="status-bar-chip"
        variant="elevated"
        :color="weather.temp !== 'Snow' ? 'success' : 'error'"
        label
        style="font-size: 1.2em; padding: 0.5em;"
      >
        <v-icon start icon="mdi-weather-snowy" />
        {{ weather.temp }} {{ weather.condition }}
      </v-chip>
      
      <v-chip
        class="status-bar-chip"
        :color="airportStats.delayTime === '0 mins' ? 'success' : 'error'"
        variant="elevated"
        label
        style="font-size: 1.2em; padding: 0.5em;"
      >
        <v-icon start icon="mdi-timer-outline" />
        Average Delay: {{ airportStats.delayTime }}
      </v-chip>
      
      <v-chip
        class="status-bar-chip"
        :color="airportStats.deicingOps === 'Active' ? 'warning' : 'info'"
        variant="elevated"
        label
        style="font-size: 1.2em; padding: 0.5em;"
      >
        <v-icon start icon="mdi-snowflake" />
        Deicing Operations: {{ airportStats.deicingOps }}
      </v-chip>
      
      <v-chip
        class="status-bar-chip"
        :color="airportStats.onTimePerformance === '100%' ? 'success' : 'error'"
        variant="elevated"
        label
        style="font-size: 1.2em; padding: 0.5em;"
      >
        <v-icon start icon="mdi-airplane-check" />
        Departures-On-Time: {{ airportStats.onTimePerformance }}
      </v-chip>
    </v-container>
  </v-app-bar>
</template>