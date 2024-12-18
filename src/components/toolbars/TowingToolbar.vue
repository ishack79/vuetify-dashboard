<script setup>
import BaseToolbar from './BaseToolbar.vue';

defineProps({
  fromDate: String,
  toDate: String
});

const emit = defineEmits(['update:fromDate', 'update:toDate', 'refresh']);
</script>

<template>
  <BaseToolbar
    :from-date="fromDate"
    :to-date="toDate"
    @update:from-date="$emit('update:fromDate', $event)"
    @update:to-date="$emit('update:toDate', $event)"
    @refresh="$emit('refresh')"
  >
    <template #actions>
      <v-tooltip text="Filter" location="top">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon>
            <v-icon>mdi-filter</v-icon>
          </v-btn>
        </template>
      </v-tooltip>
    </template>
  </BaseToolbar>
</template>