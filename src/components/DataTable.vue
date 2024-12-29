<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  headers: {
    type: Array,
    required: true
  },
  items: {
    type: Array,
    required: true
  },
  showFilters: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['update:showFilters', 'filteredDataChange']);

const filters = ref({});

// Initialize filters for each column
props.headers.forEach(header => {
  if (header.filterColumn) {
    filters.value[header.key] = '';
  }
});

// Filter the items based on all active filters
const filteredItems = computed(() => {
  const filtered = props.items.filter(item => {
    return Object.entries(filters.value).every(([key, filterValue]) => {
      if (!filterValue) return true;
      const itemValue = String(item[key]).toLowerCase();
      return itemValue.includes(filterValue.toLowerCase());
    });
  });
  
  // Emit the filtered data whenever it changes
  emit('filteredDataChange', filtered);
  return filtered;
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

const clearFilters = () => {
  Object.keys(filters.value).forEach(key => {
    filters.value[key] = '';
  });
};
</script>

<template>
  <div class="data-table-wrapper">
    <!-- Filter Dialog -->
    <v-dialog
      :model-value="showFilters"
      @update:model-value="emit('update:showFilters', $event)"
      max-width="800px"
    >
      <v-card>
        <v-card-title class="text-h5 pa-4">
          Filters
          <v-spacer></v-spacer>
          <v-btn icon @click="clearFilters">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col v-for="(value, key) in filters" :key="key" cols="12" sm="6" md="4">
              <v-text-field
                v-model="filters[key]"
                :label="key"
                density="compact"
                variant="outlined"
                hide-details
                class="mb-2"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- DataTable -->
    <v-data-table
      :headers="headers"
      :items="filteredItems"
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
  </div>
</template>

<style scoped>
.data-table-wrapper {
  position: relative;
}
</style>