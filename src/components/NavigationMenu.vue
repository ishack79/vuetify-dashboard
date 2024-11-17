<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['update:modelValue'])

const menuItems = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard' },
  { title: 'Towing', icon: 'mdi-airplane-takeoff' },
  { title: 'Deicing', icon: 'mdi-snowflake' },
  { title: 'LVP', icon: 'mdi-weather-fog' },
  { title: 'Delay', icon: 'mdi-clock-alert' },
  { title: 'Traffic', icon: 'mdi-airplane' },
  { title: 'Occupancy', icon: 'mdi-map-marker' },
  { title: 'Total Traffic', icon: 'mdi-chart-bar' },
  { title: 'Taxi Time', icon: 'mdi-road-variant' },
  { title: 'Snow', icon: 'mdi-weather-snowy' },
  { title: 'Runway Maintenance', icon: 'mdi-tools' }
]

const selected = ref(props.modelValue)

watch(selected, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<template>
  <v-navigation-drawer
    permanent
    elevation="0"
    width="300"
  >
    <v-list class="py-4">
      <v-list-item
        v-for="item in menuItems"
        :key="item.title"
        :value="item.title"
        :title="item.title"
        :prepend-icon="item.icon"
        class="mb-2 mx-2"
        rounded="lg"
        :class="{ 'nav-item-active': item.title === selected }"
        @click="selected = item.title"
      />
    </v-list>
  </v-navigation-drawer>
</template>