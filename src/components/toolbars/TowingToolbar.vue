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
</script>

<template>
  <BaseToolbar
    :fromDate="fromDate"
    :toDate="toDate"
    @update:fromDate="$emit('update:fromDate', $event)"
    @update:toDate="$emit('update:toDate', $event)"
    @refresh="$emit('refresh')"
  />
</template>