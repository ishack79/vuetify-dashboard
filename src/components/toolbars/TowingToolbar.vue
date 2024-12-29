<script setup>
import BaseToolbar from './BaseToolbar.vue';

defineProps({
  fromDate: {
    type: Date,
    required: true
  },
  toDate: {
    type: Date,
    required: true
  }
});

const emit = defineEmits(['update:fromDate', 'update:toDate', 'refresh']);

const excelFilename = `towing_report_${new Date().toISOString().split('T')[0]}.xlsx`;
</script>

<template>
  <BaseToolbar
    :fromDate="fromDate"
    :toDate="toDate"
    :excel-filename="excelFilename"
    @update:fromDate="$emit('update:fromDate', $event)"
    @update:toDate="$emit('update:toDate', $event)"
    @refresh="$emit('refresh')"
  />
</template>