<script setup>
import { ref, computed } from 'vue'
import DataTable from './DataTable.vue'

const props = defineProps({
  selectedMenu: {
    type: String,
    required: true
  }
})

const tab = ref(0)

const headers = computed(() => [
  { title: 'Flight', key: 'flight', align: 'start' },
  { title: 'Origin', key: 'origin', align: 'center' },
  { title: 'Destination', key: 'destination', align: 'center' },
  { title: 'Status', key: 'status', align: 'center' },
  { title: 'Time', key: 'time', align: 'end' }
])

const mockData = Array.from({ length: 40 }, (_, i) => ({
  flight: `FL${1000 + i}`,
  origin: `City ${i % 10 + 1}`,
  destination: `City ${i % 10 + 11}`,
  status: i % 2 === 0 ? 'On Time' : 'Delayed',
  time: `${14 + (i % 10)}:${(i % 2 === 0 ? '30' : '45')}`,
  raw: {
    status: i % 2 === 0 ? 'On Time' : 'Delayed'
  }
}))

const getTabNames = computed(() => {
  const tabMapping = {
    'Towing': ['Active Tows', 'Completed Tows'],
    'Deicing': ['Current Operations', 'Scheduled Operations'],
    'LVP': ['Active Procedures', 'Historical Data'],
    'Delay': ['Current Delays', 'Delay Analysis'],
    'Traffic': ['Arrivals', 'Departures'],
    'Occupancy': ['Terminal Gates', 'Remote Stands'],
    'Total Traffic': ['Daily Summary', 'Weekly Trends'],
    'Taxi Time': ['Departure Times', 'Arrival Times'],
    'Snow': ['Current Operations', 'Forecast'],
    'Runway Maintenance': ['Active Work', 'Scheduled Work']
  }
  return tabMapping[props.selectedMenu] || ['Tab 1', 'Tab 2']
})
</script>

<template>
  <v-main class="dashboard-content">
    <v-card class="mb-6" elevation="0">
      <v-card-title class="text-h5 font-weight-bold pb-2">
        {{ selectedMenu }}
      </v-card-title>
      <v-tabs
        v-model="tab"
        color="primary"
        slider-color="primary"
        class="mb-2"
      >
        <v-tab
          v-for="(name, i) in getTabNames"
          :key="i"
          :value="i"
          class="text-none"
        >
          {{ name }}
        </v-tab>
      </v-tabs>
      
      <v-window v-model="tab">
        <v-window-item
          v-for="(name, i) in getTabNames"
          :key="i"
          :value="i"
        >
          <v-card
            class="mt-4"
            elevation="0"
          >
            <DataTable
              :headers="headers"
              :items="mockData"
            />
          </v-card>
        </v-window-item>
      </v-window>
    </v-card>
  </v-main>
</template>