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
    const now = new Date()
    time.value = now.toTimeString().split(' ')[0].slice(0, 5) + ' UTC' // Extracts HH:MM and adds UTC label
  }, 1000)
})
</script>

<template>
  <v-app-bar app dense>
    <v-container fluid>
      <v-row>
        <v-col cols="6" sm="3" md="2">
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
        </v-col>
        <v-col cols="6" sm="3" md="2">
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
        </v-col>
        <v-col cols="6" sm="3" md="2">
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
        </v-col>
        <v-col cols="6" sm="3" md="2">
          <v-chip
            class="status-bar-chip"
            :color="airportStats.delayTime === '0 mins' ? 'success' : 'error'"
            variant="elevated"
            label
            style="font-size: 1.2em; padding: 0.5em;"
          >
            <v-icon start icon="mdi-timer-outline" />
            Delay: {{ airportStats.delayTime }}
          </v-chip>
        </v-col>
        <v-col cols="6" sm="3" md="2">
          <v-chip
            class="status-bar-chip"
            :color="airportStats.deicingOps === 'Active' ? 'warning' : 'info'"
            variant="elevated"
            label
            style="font-size: 1.2em; padding: 0.5em;"
          >
            <v-icon start icon="mdi-snowflake" />
            Deicing: {{ airportStats.deicingOps }}
          </v-chip>
        </v-col>
        <v-col cols="6" sm="3" md="2">
          <v-chip
            class="status-bar-chip"
            :color="airportStats.onTimePerformance === '100%' ? 'success' : 'error'"
            variant="elevated"
            label
            style="font-size: 1.2em; padding: 0.5em;"
          >
            <v-icon start icon="mdi-airplane-check" />
            On-Time: {{ airportStats.onTimePerformance }}
          </v-chip>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>