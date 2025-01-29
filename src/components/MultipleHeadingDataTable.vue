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
        key: h.field,
        value: h.field,
        sortable: h.searchable,
        mapping: h.mapping,
        filterable: h.searchable,
        align: 'center'
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
        key: h.field,
        value: h.field,
        sortable: h.searchable,
        mapping: h.mapping,
        filterable: h.searchable,
        align: 'center'
      });
    } else {
      headers.push({
        title: h.label,
        key: h.field,
        value: h.field,
        sortable: h.searchable,
        mapping: h.mapping,
        bold: h.bold,
        filterable: h.searchable,
        align: 'center'
      });
    }
  });

  emit('headersAdapted', headers);
  return headers;
});

// Get all leaf headers for filtering
const flatHeaders = computed(() => {
  const flat = [];
  
  const processHeader = (header) => {
    if (header.children) {
      header.children.forEach(child => processHeader(child));
    } else if (header.value) {
      flat.push({
        ...header,
        width: `${100 / props.headers.length}%`
      });
    }
  };
  
  adaptedHeaders.value.forEach(header => processHeader(header));
  return flat;
});

watch(() => props.headers, (newHeaders) => {
  newHeaders.forEach(header => {
    filters.value[header.field] = '';
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
      
      // Only apply filtering for searchable columns
      const header = props.headers.find(h => h.field === key);
      if (!header?.searchable) return true;
      
      const itemValue = String(item[key] || '').toLowerCase();
      return itemValue.includes(filterValue.toLowerCase());
    });
  });
  emit('filteredDataChange', filtered);
  return filtered;
});

// Define color mappings
const colorMappings = {
  lvp: (value) => value === 'Y' ? 'success' : 'warning'
};

function getChipColor(field, value) {
  const fn = colorMappings[field];
  return typeof fn === 'function' ? fn(value) : fn;
}

function shouldRenderChip(field) {
  return field in colorMappings;
}

// Format data based on mapping rules
function formatData(field, value) {
  const header = props.headers.find((h) => h.field === field);
  if (!header || !header.mapping) return value;

  if (header.mapping === 'yyyy-mm-dd-DAY') {
    return value;
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
        <!-- Add filter row at the top of headers -->
        <template #headers>
          <tr>
            <template v-for="(header, i) in adaptedHeaders" :key="i">
              <th
                v-if="!header.children"
                :style="{ width: `${100 / adaptedHeaders.length}%` }"
                class="header-cell"
              >
                <div class="header-content">
                  <div class="header-title text-center">{{ header.title }}</div>
                  <v-text-field
                    v-show="showFilters"
                    v-model="filters[header.value]"
                    density="compact"
                    variant="outlined"
                    hide-details
                    single-line
                    :disabled="!header.filterable"
                    class="filter-field"
                    bg-color="transparent"
                  ></v-text-field>
                </div>
              </th>
              <th
                v-else
                :colspan="header.children.length"
                :style="{ width: `${(100 / adaptedHeaders.length) * header.children.length}%` }"
                class="header-cell"
              >
                <div class="header-content">
                  <div class="header-title text-center">{{ header.title }}</div>
                  <div class="d-flex gap-2">
                    <template v-for="child in header.children" :key="child.value">
                      <v-text-field
                        v-show="showFilters"
                        v-model="filters[child.value]"
                        density="compact"
                        variant="outlined"
                        hide-details
                        single-line
                        :disabled="!child.filterable"
                        class="filter-field"
                        bg-color="transparent"
                      ></v-text-field>
                    </template>
                  </div>
                </div>
              </th>
            </template>
          </tr>
        </template>

        <!-- Dynamic slots for each header's label -->
        <template
          v-for="header in adaptedHeaders"
          :key="header.title"
          #[`item.${header.value}`]="{ item }"
        >
          <div class="text-center">
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
          </div>
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

.header-cell {
  padding: 8px !important;
  vertical-align: top !important;
  background-color: rgba(35, 36, 36, 0.95) !important;
}

.header-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.header-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #e2e8f0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
  min-height: 1.2em;
  text-align: center;
}

:deep(.filter-field) {
  min-width: 100px;
}

:deep(.filter-field .v-field__input) {
  min-height: 32px !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  background-color: rgb(72, 72, 72) !important;
  border: 1px solid rgb(0, 0, 0) !important;
  border-radius: 4px !important;
}

:deep(.filter-field .v-field__input:disabled) {
  background-color: rgb(48, 48, 48) !important;
  opacity: 0.7;
}

:deep(.filter-field .v-field) {
  border-radius: 4px !important;
  background-color: transparent !important;
  border: none !important;
}

:deep(.filter-field .v-field__outline) {
  display: none !important;
}

:deep(.v-data-table__thead th) {
  background-color: rgba(35, 36, 36, 0.95) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center !important;
}

:deep(.v-data-table__tbody td) {
  text-align: center !important;
  background-color: rgb(24, 24, 24) !important;
}

:deep(.v-data-table__tr:hover td) {
  background-color: rgb(32, 32, 32) !important;
}

:deep(.gap-2) {
  gap: 8px;
}
</style>