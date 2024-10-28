<script setup>
import { ref, onMounted } from 'vue'

const time = ref(new Date().toUTCString())
const weather = ref({ temp: '12°C', condition: 'Cloudy' })
const airportStats = ref({
  name: 'JFK International',
  delayTime: '15 mins',
  deicingOps: 'Active',
  onTimePerformance: '87%'
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
      >
        <v-icon start icon="mdi-airport" />
        {{ airportStats.name }}
      </v-chip>
      
      <v-chip
        class="status-bar-chip"
        color="info"
        variant="elevated"
        label
      >
        <v-icon start icon="mdi-clock-outline" />
        {{ time }}
      </v-chip>
      
      <v-chip
        class="status-bar-chip"
        color="secondary"
        variant="elevated"
        label
      >
        <v-icon start icon="mdi-weather-cloudy" />
        {{ weather.temp }} {{ weather.condition }}
      </v-chip>
      
      <v-chip
        class="status-bar-chip"
        :color="airportStats.delayTime === '0 mins' ? 'success' : 'warning'"
        variant="elevated"
        label
      >
        <v-icon start icon="mdi-timer-outline" />
        Delay: {{ airportStats.delayTime }}
      </v-chip>
      
      <v-chip
        class="status-bar-chip"
        :color="airportStats.deicingOps === 'Active' ? 'warning' : 'success'"
        variant="elevated"
        label
      >
        <v-icon start icon="mdi-snowflake" />
        Deicing: {{ airportStats.deicingOps }}
      </v-chip>
      
      <v-chip
        class="status-bar-chip"
        color="success"
        variant="elevated"
        label
      >
        <v-icon start icon="mdi-airplane-check" />
        On-Time: {{ airportStats.onTimePerformance }}
      </v-chip>
    </v-container>
  </v-app-bar>
</template>