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
const currentPage = ref(1);
const itemsPerPage = ref(10);
const filters = ref({});

// Convert server-style columns to Vuetify-style headers
const adaptedHeaders = computed(() => {
  const headers = [];
  const headerMap = new Map();

  props.headers.forEach(h => {
    const parts = h.label.split('|').map(p => p.trim());
    const field = h.label;
    
    if (parts.length === 3) {
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

// Calculate total pages
const totalPages = computed(() => Math.ceil(filteredItems.value.length / itemsPerPage.value));

// Generate page numbers array with ellipsis
const pageNumbers = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const delta = 1; // Number of pages to show before and after current page
  
  let pages = [];
  
  // Always show first page
  pages.push(1);
  
  if (total <= 4) {
    // If total pages is 5 or less, show all pages
    for (let i = 2; i < total; i++) {
      pages.push(i);
    }
  } else {
    // Handle cases where we need ellipsis
    if (current > 2 + delta) {
      pages.push('...');
    }
    
    // Pages around current page
    const startPage = Math.max(2, current - delta);
    const endPage = Math.min(total - 1, current + delta);
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    if (current < total - (1 + delta)) {
      pages.push('...');
    }
  }
  
  // Always show last page if more than 1 page
  if (total > 1) {
    pages.push(total);
  }
  
  return pages;
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

// Navigation methods
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

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
        :items-per-page="itemsPerPage"
        :page="currentPage"
        hover
        class="elevation-1 rounded-lg"
        fixed-header
        :loading="props.loading"
        @update:page="currentPage = $event"
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
              <th class="header-cell-filter">
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

        <!-- Updated pagination template -->
        <template #bottom>
          <div class="custom-pagination">
            <div class="pagination-wrapper">
              <div class="pagination-controls">
                <div class="items-per-page">
                  <v-btn
                    icon="mdi-minus"
                    size="small"
                    variant="text"
                    :disabled="itemsPerPage <= 5"
                    @click="itemsPerPage--"
                  />
                  <span class="items-per-page-value">{{ itemsPerPage }}</span>
                  <v-btn
                    icon="mdi-plus"
                    size="small"
                    variant="text"
                    :disabled="itemsPerPage >= 100"
                    @click="itemsPerPage++"
                  />
                </div>
                <div class="page-navigation">
                  <v-btn
                    icon="mdi-chevron-left"
                    size="small"
                    variant="text"
                    :disabled="currentPage <= 1"
                    @click="prevPage"
                  />
                  <div class="page-numbers">
                    <template v-for="(page, index) in pageNumbers" :key="index">
                      <span v-if="page === '...'" class="ellipsis">...</span>
                      <v-btn
                        v-else
                        size="small"
                        variant="text"
                        class="page-number"
                        :class="{ active: page === currentPage }"
                        @click="goToPage(page)"
                      >
                        {{ page }}
                      </v-btn>
                    </template>
                  </div>
                  <v-btn
                    icon="mdi-chevron-right"
                    size="small"
                    variant="text"
                    :disabled="currentPage >= totalPages"
                    @click="nextPage"
                  />
                </div>
              </div>
            </div>
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
  /* Main Header */
  /* padding: 8px !important; */
  vertical-align: middle !important;
  background-color: #232424 !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  width: 70px !important;
  padding: 0px !important;
}

.header-cell-filter {
  /* Filter row */
  /* padding: 8px !important; */
  vertical-align: middle !important;
  background-color: #232424 !important;
  border: 0px !important;
  width: 70px !important;
  padding: 0px !important;
}

/* .header-cell .text-center {
  vertical-align: middle !important;
  background-color: #232424 !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  width: 70px !important;
  padding: 0px !important;
} */

/* :deep(.filter-field) {
  min-width: 70px !important;
} */

:deep(.filter-field .v-field__input) {
  /* min-height: 32px !important; */
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  background-color: rgb(72, 72, 72) !important;
  border: 1px solid rgb(255, 255, 255, 0.1) !important;
  border-radius: 0px !important;
  min-width: -webkit-fill-available !important;
  min-height: -webkit-fill-available !important;
  /* max-width: 70% !important; */
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

/* Custom pagination styles */
.custom-pagination {
  background: #232424;
  padding: 8px 16px; /* Add horizontal padding */
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
}

.pagination-wrapper {
  display: flex;
  justify-content: flex-end; /* Right align the content */
  width: 100%;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 0;
  /* Remove max-width to allow natural content width */
}

/* Make the navigation section more compact */
.page-navigation {
  display: flex;
  align-items: center;
  gap: 0;
  margin-left: auto; /* Push to the right if needed */
}

/* Ensure consistent width for the items per page section */
.items-per-page {
  display: flex;
  align-items: center;
  gap: 0;
  margin-right: 16px;
  flex-shrink: 0; /* Prevent shrinking */
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .custom-pagination {
    padding: 8px; /* Reduce padding on small screens */
  }
  
  .pagination-controls {
    flex-wrap: wrap; /* Allow wrapping on very small screens */
    justify-content: flex-end;
    gap: 8px;
  }
  
  .items-per-page {
    margin-right: 8px; /* Reduce margin on small screens */
  }
}

/* Previous button styles remain unchanged */
.items-per-page-value {
  min-width: 36px; /* Match button width */
  height: 36px; /* Match button height */
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e2e8f0;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  background-color: #232424;
}

.page-numbers {
  display: flex;
  align-items: center;
  gap: 0; /* Remove gap */
}

/* Square button base styles */
.page-number,
:deep(.v-btn--icon.v-btn--size-small) {
  width: 36px !important;
  height: 36px !important;
  min-width: 36px !important;
  padding: 0 !important;
  margin: 0 !important;
  border: 1px solid #000 !important;
  border-radius: 0 !important;
  color: #e2e8f0 !important;
  background-color: #101010 !important;
  position: relative !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  transition: all 0.2s ease !important;
}

/* Hover state */
.page-number:hover,
:deep(.v-btn--icon.v-btn--size-small:hover) {
  background-color: #2c2c2c !important;
  border-color: #333 !important;
}

/* Active state */
.page-number.active {
  background-color: #2c2c2c !important;
  border-color: #444 !important;
  color: #fff !important;
}

/* Disabled state */
:deep(.v-btn--icon.v-btn--size-small.v-btn--disabled) {
  background-color: #1a1a1a !important;
  border-color: #1a1a1a !important;
  color: rgba(226, 232, 240, 0.3) !important;
  opacity: 0.5 !important;
}

.ellipsis {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e2e8f0;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  background-color: #101010;
}

/* Ensure icons are centered in buttons */
:deep(.v-btn__content) {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 100% !important;
  height: 100% !important;
}

/* Override any Vuetify default button styles */
:deep(.v-btn) {
  text-transform: none !important;
  letter-spacing: normal !important;
  box-shadow: none !important;
}
</style>