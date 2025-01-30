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
  const headerMap = new Map();

  props.headers.forEach(h => {
    const parts = h.label.split('|').map(p => p.trim());
    const field = h.label; // Use label instead of field for matching
    
    if (parts.length === 3) {
      // Handle 3-level headers
      const [level1, level2, level3] = parts;
      
      let level1Header = headerMap.get(level1);
      if (!level1Header) {
        level1Header = {
          title: level1,
          align: 'center',
          children: [],
          childMap: new Map()
        };
        headerMap.set(level1, level1Header);
        headers.push(level1Header);
      }

      let level2Header = level1Header.childMap.get(level2);
      if (!level2Header) {
        level2Header = {
          title: level2,
          align: 'center',
          children: []
        };
        level1Header.childMap.set(level2, level2Header);
        level1Header.children.push(level2Header);
      }

      level2Header.children.push({
        title: level3,
        key: field,
        value: field,
        sortable: h.searchable,
        filterable: h.searchable,
        align: 'center',
        bold: h.bold,
        searchable: h.searchable
      });
    } else if (parts.length === 2) {
      // Handle 2-level headers
      const [level1, level2] = parts;
      
      let level1Header = headerMap.get(level1);
      if (!level1Header) {
        level1Header = {
          title: level1,
          align: 'center',
          children: []
        };
        headerMap.set(level1, level1Header);
        headers.push(level1Header);
      }

      level1Header.children.push({
        title: level2,
        key: field,
        value: field,
        sortable: h.searchable,
        filterable: h.searchable,
        align: 'center',
        bold: h.bold,
        searchable: h.searchable
      });
    } else {
      // Handle single level headers
      headers.push({
        title: parts[0],
        key: field,
        value: field,
        sortable: h.searchable,
        filterable: h.searchable,
        align: 'center',
        bold: h.bold,
        searchable: h.searchable
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
      header.children.forEach(child => {
        if (child.children) {
          child.children.forEach(grandChild => flat.push(grandChild));
        } else {
          flat.push(child);
        }
      });
    } else if (header.value) {
      flat.push(header);
    }
  };
  
  adaptedHeaders.value.forEach(header => processHeader(header));
  return flat;
});

// Calculate max header depth
const headerDepth = computed(() => {
  let maxDepth = 1;
  adaptedHeaders.value.forEach(header => {
    if (header.children) {
      maxDepth = Math.max(maxDepth, 2);
      header.children.forEach(child => {
        if (child.children) {
          maxDepth = Math.max(maxDepth, 3);
        }
      });
    }
  });
  return maxDepth;
});

watch(() => props.headers, (newHeaders) => {
  newHeaders.forEach(header => {
    if (header.searchable) {
      filters.value[header.label] = '';
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
      const itemValue = String(item[key] || '').toLowerCase();
      return itemValue.includes(filterValue.toLowerCase());
    });
  });
  emit('filteredDataChange', filtered);
  return filtered;
});

// Format data based on mapping rules
function formatData(field, value) {
  const header = props.headers.find((h) => h.label === field);
  if (!header || !header.mapping) return value;

  if (header.mapping === 'yyyy-mm-dd-DAY') {
    return value;
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
        <!-- Headers template -->
        <template #headers>
          <!-- Level 1 headers -->
          <tr>
            <template v-for="header in adaptedHeaders" :key="header.title">
              <th
                v-if="!header.children"
                :rowspan="headerDepth"
                class="header-cell text-center"
              >
                {{ header.title }}
              </th>
              <th
                v-else
                :colspan="header.children.reduce((acc, child) => acc + (child.children ? child.children.length : 1), 0)"
                class="header-cell text-center"
              >
                {{ header.title }}
              </th>
            </template>
          </tr>
          
          <!-- Level 2 headers -->
          <tr v-if="headerDepth > 1">
            <template v-for="header in adaptedHeaders" :key="`l2-${header.title}`">
              <template v-if="header.children">
                <template v-for="child in header.children" :key="`l2c-${child.title}`">
                  <th
                    :colspan="child.children ? child.children.length : 1"
                    :rowspan="child.children ? 1 : (headerDepth - 1)"
                    class="header-cell text-center"
                  >
                    {{ child.title }}
                  </th>
                </template>
              </template>
            </template>
          </tr>
          
          <!-- Level 3 headers -->
          <tr v-if="headerDepth > 2">
            <template v-for="header in adaptedHeaders" :key="`l3-${header.title}`">
              <template v-if="header.children">
                <template v-for="child in header.children" :key="`l3c-${child.title}`">
                  <template v-if="child.children">
                    <th
                      v-for="grandChild in child.children"
                      :key="grandChild.title"
                      class="header-cell text-center"
                    >
                      {{ grandChild.title }}
                    </th>
                  </template>
                </template>
              </template>
            </template>
          </tr>
          
          <!-- Filter row -->
          <tr v-if="showFilters">
            <template v-for="header in flatHeaders" :key="`filter-${header.value}`">
              <th class="header-cell">
                <v-text-field
                  v-if="header.searchable"
                  v-model="filters[header.value]"
                  density="compact"
                  variant="outlined"
                  hide-details
                  single-line
                  class="filter-field"
                  bg-color="transparent"
                />
              </th>
            </template>
          </tr>
        </template>

        <!-- Data cells template -->
        <template
          v-for="header in flatHeaders"
          :key="`cell-${header.value}`"
          #[`item.${header.value}`]="{ item }"
        >
          <div class="text-center">
            <span :class="{ 'font-weight-bold': header.bold }">
              {{ formatData(header.value, item[header.value]) }}
            </span>
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
  background: #232424;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  bottom: 0;
  z-index: 1;
}

.header-cell {
  padding: 8px !important;
  vertical-align: middle !important;
  background-color: #232424 !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
}

:deep(.filter-field) {
  min-width: 80px;
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
  background-color: #232424 !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center !important;
  color: #e2e8f0 !important;
}

:deep(.v-data-table__tbody td) {
  text-align: center !important;
  background-color: rgb(24, 24, 24) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
}

:deep(.v-data-table__tr:hover td) {
  background-color: rgb(32, 32, 32) !important;
}

.font-weight-bold {
  font-weight: bold !important;
}
</style>