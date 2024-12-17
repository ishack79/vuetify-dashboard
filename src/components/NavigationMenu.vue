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
  // { title: 'Dashboard', icon: 'mdi-view-dashboard' },
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
    width="75"
  >
    <v-list class="py-4">
      <v-tooltip
        v-for="item in menuItems"
        :key="item.title"
        :text="item.title"
        location="right"
      >
        <template v-slot:activator="{ props: tooltipProps }">
          <v-list-item
            :value="item.title"
            :prepend-icon="item.icon"
            class="mb-2 mx-2"
            rounded="lg"
            :class="{ 'nav-item-active': item.title === selected }"
            v-bind="tooltipProps"
            @click="selected = item.title"
          />
        </template>
      </v-tooltip>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.nav-item-active {
  background-color: #3a3a3a;
  color: white;
}
</style>