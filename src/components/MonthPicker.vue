<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isExpanded = ref(false)
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
  isExpanded.value = false
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

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
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
  <div class="picker-container" :class="{ expanded: isExpanded }">
    <div class="picker-header" @click="toggleExpand">
      <div class="header-content">
        <i class="fas fa-calendar-alt calendar-icon"></i>
        <span class="selected-display">{{ formattedSelection }}</span>
      </div>
      <button class="expand-btn" :class="{ expanded: isExpanded }">
        <i :class="isExpanded ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
      </button>
    </div>
    <div v-show="isExpanded" class="picker-content">
      <div class="year-navigation">
        <button 
          @click="decrementYear" 
          class="year-nav-btn"
          :disabled="currentYear <= minYear"
        >&lt;</button>
        <span class="current-year">{{ currentYear }}</span>
        <button 
          @click="incrementYear" 
          class="year-nav-btn"
          :disabled="currentYear >= maxYear"
        >&gt;</button>
      </div>
      <div class="months-grid">
        <button
          v-for="(month, index) in months"
          :key="month"
          class="month-btn"
          :class="{ selected: index === selectedMonthIndex }"
          @click="handleMonthSelect(index)"
        >
          {{ month.slice(0, 3) }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.picker-container {
  background: #454545; /* Set background to grey */
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 250px; /* Make the box smaller */
  overflow: hidden;
  color: white; /* Set font color to black */
  margin: 2px 0; /* Reduce space between the toolbar and the top and bottom */
}

.picker-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem; /* Adjust padding to make the box smaller */
  cursor: pointer;
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.calendar-icon {
  color: white; /* Set icon color to black */
  font-size: 1.1rem;
}

.picker-header:hover {
  background: #545454; /* Slightly darker grey on hover */
}

.selected-display {
  font-size: 1.1rem;
  font-weight: 500;
}

.expand-btn {
  background: none;
  border: none;
  font-size: 0.8rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  color: white; /* Set button color to black */
}

.expand-btn.expanded {
  transform: rotate(180deg);
}

.picker-content {
  padding: 0.5rem; /* Adjust padding to make the box smaller */
  border-top: 1px solid #bbb; /* Slightly darker grey for border */
}

.year-navigation {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.25rem; /* Reduce margin to make the box smaller */
}

.current-year {
  font-size: 1.2rem;
  font-weight: 500;
  min-width: 4rem;
}

.year-nav-btn {
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  color: black; /* Set button color to black */
  transition: color 0.3s;
}

.year-nav-btn:disabled {
  color: #999;
  cursor: not-allowed;
}

.year-nav-btn:not(:disabled):hover {
  color: #666;
}

.months-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  padding: 0.5rem;
}

.month-btn {
  background: #e0e0e0; /* Light grey background */
  border: 1px solid #ccc; /* Light grey border */
  border-radius: 4px;
  padding: 0.5rem 0.25rem; /* Adjust padding to make the box smaller */
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  color: black; /* Set button text color to black */
}

.month-btn:hover {
  background: #d0d0d0; /* Slightly darker grey on hover */
  border-color: #248E88;
}

.month-btn.selected {
  background: #248E88;
  color: white;
  border-color: #248E88;
}

@media (prefers-color-scheme: dark) {
  .picker-container {
    background: #2a2a2a;
  }
  
  .picker-header:hover {
    background: #333;
  }
  
  .picker-content {
    border-top-color: #444;
  }
  
  .month-btn {
    background: #1a1a1a;
    border-color: #444;
    color: #fff;
  }
  
  .month-btn:hover {
    background: #333;
  }
  
  .month-btn.selected {
    background: #248E88;
    color: white;
    border-color: #248E88;
  }
  
  .year-nav-btn {
    color: #248E88;
  }
  
  .year-nav-btn:not(:disabled):hover {
    color: #1a6f6a;
  }
  
  .year-nav-btn:disabled {
    color: #666;
  }
  
  .expand-btn {
    color: #999;
  }
}
</style>