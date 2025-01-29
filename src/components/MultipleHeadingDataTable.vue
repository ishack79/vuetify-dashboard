<script setup>
import { ref, computed, watch } from 'vue';

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
  },
  loading: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['update:showFilters', 'filteredDataChange', 'headersAdapted']);

const filters = ref({});

// Convert server-style columns to Vuetify-style headers
const adaptedHeaders = computed(() => {
  const headers = [];
  const headerMap = {};

  props.headers.forEach(h => {
    const parts = h.label.split('|');
    if (parts.length > 2) {
      const parentLabel = parts[0];
      const childLabel = parts[1];
      const grandChildLabel = parts[2];

      if (!headerMap[parentLabel]) {
        headerMap[parentLabel] = {
          title: parentLabel,
          align: 'center',
          children: []
        };
        headers.push(headerMap[parentLabel]);
      }

      const parent = headerMap[parentLabel];
      if (!parent.childMap) {
        parent.childMap = {};
      }

      if (!parent.childMap[childLabel]) {
        const child = {
          title: childLabel,
          align: 'center',
          children: []
        };
        parent.children.push(child);
        parent.childMap[childLabel] = child;
      }

      parent.childMap[childLabel].children.push({
        title: grandChildLabel,
        value: h.field,
        sortable: h.searchable,
        mapping: h.mapping
      });
    } else if (parts.length > 1) {
      const parentLabel = parts[0];
      const childLabel = parts[1];

      if (!headerMap[parentLabel]) {
        headerMap[parentLabel] = {
          title: parentLabel,
          align: 'center',
          children: []
        };
        headers.push(headerMap[parentLabel]);
      }

      headerMap[parentLabel].children.push({
        title: childLabel,
        value: h.field,
        sortable: h.searchable,
        mapping: h.mapping
      });
    } else {
      headers.push({
        title: h.label,
        value: h.field,
        sortable: h.searchable,
        mapping: h.mapping,
        bold: h.bold
      });
    }
  });

  emit('headersAdapted', headers);
  return headers;
});

// Initialize filters for each column
watch(adaptedHeaders, (newHeaders) => {
  newHeaders.forEach(header => {
    if (header.children) {
      header.children.forEach(child => {
        if (child.children) {
          child.children.forEach(grandChild => {
            if (grandChild.sortable) {
              filters.value[grandChild.value] = '';
            }
          });
        } else if (child.sortable) {
          filters.value[child.value] = '';
        }
      });
    } else if (header.sortable) {
      filters.value[header.value] = '';
    }
  });
}, { immediate: true });

const clearFilters = () => {
  Object.keys(filters.value).forEach(key => {
    filters.value[key] = '';
  });
};

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

function getChipColor(field, value){
  const fn = colorMappings[field];
  return typeof fn === 'function' ? fn(value) : fn;
};

function shouldRenderChip(field) {
  return field in colorMappings;
};

// Format data based on mapping rules
function formatData(field, value) {
  const header = props.headers.find((h) => h.field === field);
  if (!header || !header.mapping) return value;

  if (header.mapping === 'yyyy-mm-dd-DAY') {
    return value; // Already formatted in mock data
  }

  if (header.mapping === 'yyyy-mm-ddThh:mm:ss->hh:mm') {
    return value ? value.split('T')[1].substring(0, 5) : '';
  }

  if (header.mapping === 'no-empty hh:mm') {
    return value || '--:--';
  }

  return value;
}
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
        <div class="filter-header">
          <v-card-title class="text-h5">Filters</v-card-title>
          <v-btn icon @click="clearFilters">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </div>
        <v-card-text>
          <v-row>
            <v-col v-for="(_, key) in filters" :key="key" cols="12" sm="6" md="4">
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

    <!-- MultipleHeadingDataTable Container -->
    <div class="table-container">
      <v-data-table
        :headers="adaptedHeaders"
        :items="filteredItems"
        :items-per-page="25"
        hover
        class="elevation-1 rounded-lg"
        fixed-header
        :loading="props.loading"
      >
        <!-- Dynamic slots for each header's label -->
        <template
          v-for="header in adaptedHeaders"
          :key="header.title"
          #[`item.${header.value}`]="{ item }"
        >
          <!-- Render chip if there is a color mapping; else show text -->
          <v-chip
            v-if="shouldRenderChip(header.value) && item[header.value]"
            :color="getChipColor(header.value, item[header.value])"
            size="small"
            label
          >
            {{ item[header.value] }}
          </v-chip>
          <template v-else>
            <strong v-if="header.bold">{{ formatData(header.value, item[header.value]) }}</strong>
            <span v-else>{{ formatData(header.value, item[header.value]) }}</span>
          </template>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<style scoped>
.data-table-wrapper {
  position: relative;
  height: calc(100vh - 300px);
  display: flex;
  flex-direction: column;
}

.table-container {
  position: relative;
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.filter-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 16px 0 16px;
}

.reset-button {
  margin-right: 8px;
}

:deep(.v-data-table) {
  flex: 1;
  display: flex;
  flex-direction: column;
}

:deep(.v-data-table__wrapper) {
  flex: 1;
  overflow-y: auto;
}

:deep(.v-data-table-footer) {
  flex-shrink: 0;
  background: rgba(35, 36, 36, 0.95);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  bottom: 0;
  z-index: 1;
}
</style>