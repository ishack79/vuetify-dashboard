<script setup>
import { ref, computed } from 'vue'
import DataTable from './DataTable.vue'
import AdminDashboard from './AdminDashboard.vue'

const props = defineProps({
  selectedMenu: {
    type: String,
    required: true
  }
})

const tab = ref(0)
const showDatePicker = ref(false) // Initialize showDatePicker
const date = ref(new Date().toISOString().substr(0, 10)) // Initialize date

const headers = computed(() => [
  { title: 'DATE', key: 'date', align: 'start' },
  { title: 'CALLSIGN', key: 'flight', align: 'start' },
  { title: 'G-H', key: 'groundHandler', align: 'center' },
  { title: 'TYP', key: 'type', align: 'center' },
  { title: 'I-C', key: 'ic', align: 'center' },
  { title: 'ONBT', key: 'onbt', align: 'center' },
  { title: 'OFBT', key: 'ofbt', align: 'center' },
  { title: 'P-B', key: 'pb', align: 'center' },
  { title: 'A-O', key: 'ao', align: 'center' },
  { title: 'RWY', key: 'rwy', align: 'center' },
  { title: 'ETD', key: 'time', align: 'end' },
  { title: 'LVP', key: 'lvp', align: 'center' },
  { title: 'STATUS', key: 'status', align: 'center' },
])

const aircraftTypes = ['A320', 'B737', 'A380', 'B777', 'A350', 'B787']
const groundHandlers = ['AAP', 'KAS', 'SHP', 'JAS']
const runways = ['01L', '01R', '19L', '19R']

const mockData = Array.from({ length: 600 }, (_, i) => ({
  date: new Date().toISOString().split('T')[0],
  flight: `FL${1000 + i}`,
  onbt: `${Math.floor(Math.random() * 24).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
  ofbt: `${Math.floor(Math.random() * 24).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
  status: Math.random() > 0.5 ? 'On Time' : 'Delayed',
  time: `${Math.floor(Math.random() * 24).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
  lvp: Math.random() > 0.5 ? 'Y' : 'N',
  type: aircraftTypes[Math.floor(Math.random() * aircraftTypes.length)],
  groundHandler: groundHandlers[Math.floor(Math.random() * groundHandlers.length)],
  ao: `${Math.floor(Math.random() * 24).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
  rwy: runways[Math.floor(Math.random() * runways.length)],
  ic: `${Math.floor(Math.random() * 24).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
  pb: `${Math.floor(Math.random() * 24).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
  raw: {
    status: Math.random() > 0.5 ? 'On Time' : 'Delayed'
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
        <span v-if="selectedMenu === 'Deicing'"></span>
      </v-card-title>
      <v-tabs
        v-model="tab"
        color="primary"
        slider-color="primary"
        class="mb-2"
        v-if="selectedMenu !== 'Dashboard'"
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
      
      <v-window v-model="tab" v-if="selectedMenu !== 'Dashboard'">
        <v-window-item
          v-for="(name, i) in getTabNames"
          :key="i"
          :value="i"
        >
          <v-card
            class="mt-4"
            elevation="0"
          >
            <v-toolbar flat class="custom-toolbar">
              <!-- Date Picker Menu -->
              <v-menu
                v-model="showDatePicker"
                :close-on-content-click="false"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-calendar</v-icon>
                  </v-btn>
                </template>
                <v-date-picker
                  v-model="date"
                  no-title
                  color="primary"
                  @input="showDatePicker = false"
                >
                </v-date-picker>
              </v-menu>
              <!-- Other Toolbar Buttons -->
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon color="info">mdi-information</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon color="success">mdi-file-excel-box</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </v-toolbar>
            <!-- DataTable Component -->
            <DataTable
              :headers="headers"
              :items="mockData"
            />
          </v-card>
        </v-window-item>
      </v-window>

      <AdminDashboard v-if="selectedMenu === 'Dashboard'" />
    </v-card>
  </v-main>
</template>

<style scoped>
.custom-toolbar {
  background-color: #383052;
  border-radius: 8px;
  padding: 8px;
  box-shadow: none;
}

/* Adjust the menu to appear over the toolbar */
.v-menu__content--fixed {
  position: absolute !important;
}

/* Optional: Style the date picker */
.v-date-picker {
  max-width: 290px;
}
</style>