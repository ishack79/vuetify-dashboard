<script setup>
import { computed } from 'vue';

const props = defineProps({
  headers: {
    type: Array,
    required: true
  },
  items: {
    type: Array,
    required: true
  }
});

// Define color mappings
const colorMappings = {
  lvp: (value) => value === 'Y' ? 'success' : 'warning'
};

const getChipColor = (key, value) => {
  const colorMapping = colorMappings[key];
  return typeof colorMapping === 'function' ? colorMapping(value) : colorMapping;
};

const shouldRenderChip = (key) => key in colorMappings;
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="15"
    hover
    class="elevation-1 rounded-lg"
  >
    <template v-for="header in headers" :key="header.key" #[`item.${header.key}`]="{ item }">
      <v-chip
        v-if="shouldRenderChip(header.key) && item[header.key]"
        :color="getChipColor(header.key, item[header.key])"
        size="small"
        label
      >
        {{ item[header.key] }}
      </v-chip>
      <template v-else>
        {{ item[header.key] }}
      </template>
    </template>
  </v-data-table>
</template>