<script setup>
const menuItems = [
  { title: 'Towing', icon: 'mdi-truck' },
  { title: 'Deicing', icon: 'mdi-snowflake' },
  { title: 'LVP', icon: 'mdi-weather-fog' },
  { title: 'Delay', icon: 'mdi-clock-alert' },
  { title: 'Traffic', icon: 'mdi-airplane' },
  { title: 'Occupancy', icon: 'mdi-gate' },
  { title: 'Total Traffic', icon: 'mdi-chart-bar' },
  { title: 'Taxi Time', icon: 'mdi-road-variant' },
  { title: 'Snow', icon: 'mdi-weather-snowy' },
  { title: 'Runway Maintenance', icon: 'mdi-tools' }
]

const emit = defineEmits(['update:selected'])
</script>

<template>
  <v-navigation-drawer
    permanent
    elevation="0"
    width="280"
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
        :class="{ 'nav-item-active': item.title === 'Traffic' }"
        @click="emit('update:selected', item.title)"
      />
    </v-list>
  </v-navigation-drawer>
</template>