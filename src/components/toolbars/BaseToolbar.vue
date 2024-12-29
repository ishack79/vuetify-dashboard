<script setup>
import Datepicker from '../Datepicker.vue';
import { exportToExcel } from '../../utils/excelExport';

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
  }
});

const emit = defineEmits(['update:fromDate', 'update:toDate', 'refresh', 'toggleFilters']);

const handleExport = () => {
  const filename = `export_${new Date().toISOString().split('T')[0]}.xlsx`;
  exportToExcel(props.headers, props.items, filename);
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
    <Datepicker
      :model-value="fromDate"
      :rules="[(v) => !!v || 'From date is required!']"
      clearable
      hide-details="auto"
      color="primary"
      label="From Date"
      @update:model-value="(val) => emit('update:fromDate', val)"
    />
    <Datepicker
      :model-value="toDate"
      :rules="[(v) => !!v || 'To date is required!']"
      clearable
      hide-details="auto"
      color="primary"
      label="To Date"
      @update:model-value="(val) => emit('update:toDate', val)"
    />
    <v-spacer />
    <slot name="actions">
      <v-tooltip text="Refresh" location="top">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon @click="emit('refresh')">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </template>
      </v-tooltip>
      <v-tooltip text="Info" location="top">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon>
            <v-icon color="info">mdi-information</v-icon>
          </v-btn>
        </template>
      </v-tooltip>
      <v-tooltip text="Export to Excel" location="top">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon @click="handleExport">
            <v-icon color="success">mdi-file-excel-box</v-icon>
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