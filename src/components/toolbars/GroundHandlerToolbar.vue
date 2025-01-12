<script setup>
import { ref } from 'vue';
import MonthPicker from '../MonthPicker.vue';

const props = defineProps({
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

// Reactive property to manage the active slide
const activeSlide = ref('Month'); // Default to "Month"
const selectedMonth = ref(new Date(new Date().getFullYear(), 0, 1));
</script>

<template>
  <v-toolbar flat class="custom-toolbar">
    <v-slide-group v-model="activeSlide" show-arrows>
      <v-slide-group-item
        v-for="option in ['Month', 'Year']"
        :key="option"
        :value="option"
        v-slot="{ isSelected, toggle }"
      >
        <v-btn
          :color="isSelected ? 'primary' : 'secondary'"
          class="ma-2"
          rounded
          @click="() => { if (!isSelected) toggle(); }"
        >
          {{ option }}
        </v-btn>
      </v-slide-group-item>
    </v-slide-group>
    <v-tooltip text="Filter" location="top">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon>
          <v-icon>mdi-filter</v-icon>
        </v-btn>
      </template>
    </v-tooltip>
    <MonthPicker v-model="selectedMonth" />
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
      <v-tooltip text="Excel" location="top">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon>
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