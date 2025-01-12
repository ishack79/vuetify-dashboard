<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const menu = ref(false)
const currentYear = ref(new Date().getFullYear())

const months = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
]

const selectedMonthIndex = computed(() => {
  if (!props.modelValue) return -1
  return new Date(props.modelValue).getMonth()
})

const handleMonthSelect = (monthIndex: number) => {
  const value = `${currentYear.value}-${String(monthIndex + 1).padStart(2, '0')}`
  emit('update:modelValue', value)
  menu.value = false
}

const maxYear = computed(() => new Date().getFullYear())
const minYear = computed(() => maxYear.value - 2)

const incrementYear = () => {
  if (currentYear.value < maxYear.value) {
    currentYear.value++
  }
}

const decrementYear = () => {
  if (currentYear.value > minYear.value) {
    currentYear.value--
  }
}

const formattedSelection = computed(() => {
  if (!props.modelValue) return 'Select Month'
  return new Date(props.modelValue).toLocaleString('default', { 
    month: 'long',
    year: 'numeric'
  })
})
</script>

<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    location="center"
  >
    <template v-slot:activator="{ props }">
      <v-text-field
        :model-value="formattedSelection"
        prepend-inner-icon="mdi-calendar"
        readonly
        v-bind="props"
        hide-details="auto"
        density="compact"
        style="max-width: 200px;"
      />
    </template>
    <v-card class="month-picker-popup" min-width="300">
      <v-card-text>
        <div class="year-navigation">
          <v-btn
            icon="mdi-chevron-left"
            variant="text"
            @click="decrementYear"
            :disabled="currentYear <= minYear"
          />
          <span class="current-year">{{ currentYear }}</span>
          <v-btn
            icon="mdi-chevron-right"
            variant="text"
            @click="incrementYear"
            :disabled="currentYear >= maxYear"
          />
        </div>
        <div class="months-grid">
          <v-btn
            v-for="(month, index) in months"
            :key="month"
            :class="{ selected: index === selectedMonthIndex }"
            variant="text"
            @click="handleMonthSelect(index)"
          >
            {{ month.slice(0, 3) }}
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<style scoped>
.month-picker-popup {
  background: #454545;
}

.year-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0 1rem;
}

.current-year {
  font-size: 1.2rem;
  font-weight: 500;
  color: #fff;
}

.months-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}

.months-grid .v-btn {
  width: 100%;
  height: 40px;
}

.months-grid .v-btn.selected {
  background: #248E88;
  color: white;
}

.months-grid .v-btn:hover {
  background: rgba(36, 142, 136, 0.1);
}
</style>