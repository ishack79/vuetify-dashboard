<script setup>
import RangeDatepicker from '../RangeDatepicker.vue';
import { exportToExcel } from '../../utils/excelExport';
import { computed } from 'vue';

const props = defineProps({
  fromDate: {
    type: Date,
    required: true
  },
  toDate: {
    type: Date,
    required: true
  },
  headers: {
    type: Array,
    default: () => []
  },
  items: {
    type: Array,
    default: () => []
  },
  excelFilename: {
    type: String,
    default: `export_${new Date().toISOString().split('T')[0]}.xlsx`
  },
  isRefreshing: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:fromDate', 'update:toDate', 'refresh', 'toggleFilters']);

const dateRange = computed({
  get: () => ({
    start: props.fromDate,
    end: props.toDate
  }),
  set: (value) => {
    emit('update:fromDate', value.start);
    emit('update:toDate', value.end);
  }
});

const handleExport = () => {
  exportToExcel(props.headers, props.items, props.excelFilename);
};
</script>

<template>
  <v-toolbar flat class="custom-toolbar">
    <v-tooltip text="Filter" location="top">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon @click="emit('toggleFilters')">
          <v-icon>mdi-filter</v-icon>
        </v-btn>
      </template>
    </v-tooltip>
    <RangeDatepicker
      v-model="dateRange"
      label="Date Range"
      color="primary"
      :rules="[(v) => (v && v.start && v.end) || 'Date range is required']"
    />
    <v-spacer />
    <slot name="actions">
      <v-tooltip text="Info" location="top">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon>
            <v-icon>mdi-information-outline</v-icon>
          </v-btn>
        </template>
      </v-tooltip>
      <v-tooltip text="Refresh" location="top">
        <template v-slot:activator="{ props }">
          <v-btn 
            v-bind="props" 
            icon 
            :loading="isRefreshing"
            @click="emit('refresh')"
          >
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </template>
      </v-tooltip>
      <v-tooltip text="Export to Excel" location="top">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon @click="handleExport">
            <v-icon>mdi-upload-outline</v-icon>
          </v-btn>
        </template>
      </v-tooltip>
    </slot>
  </v-toolbar>
</template>

<style scoped>
.custom-toolbar {
  background-color: #3a3a3a;
  border-radius: 8px;
  padding: 8px;
  box-shadow: none;
}
</style>