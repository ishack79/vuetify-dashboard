<script setup>
import { ref, watch } from 'vue';
import { useDisplay } from 'vuetify';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
    validator: (value) => {
      return value && 'start' in value && 'end' in value;
    }
  },
  label: {
    type: String,
    default: 'Date Range'
  },
  color: {
    type: String,
    default: 'primary'
  },
  rules: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:modelValue']);
const menu = ref(false);
const { width, xs } = useDisplay();

const formatDateRange = (range) => {
  if (!range.start || !range.end) return '';
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
  };
  return `${formatDate(range.start)} - ${formatDate(range.end)}`;
};

const dates = ref({
  start: props.modelValue.start,
  end: props.modelValue.end
});

watch(() => props.modelValue, (newVal) => {
  dates.value = {
    start: newVal.start,
    end: newVal.end
  };
}, { deep: true });

const handleDatesChange = () => {
  emit('update:modelValue', { ...dates.value });
  if (dates.value.start && dates.value.end) {
    menu.value = false;
  }
};
</script>

<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    location="center"
  >
    <template v-slot:activator="{ props: menuProps }">
      <v-text-field
        :model-value="formatDateRange(modelValue)"
        :label="label"
        :rules="rules"
        prepend-inner-icon="mdi-calendar-range"
        readonly
        v-bind="menuProps"
        hide-details="auto"
        style="max-width: 300px;"
        density="compact"
      />
    </template>
    <div class="position-relative">
      <v-date-picker
        v-model="dates"
        :color="color"
        :width="xs ? width - 30 : 'auto'"
        range
        show-adjacent-months
        @update:model-value="handleDatesChange"
      >
        <template v-slot:header="{ header }">
          <div class="v-date-picker-header">
            {{ header }}
          </div>
        </template>
      </v-date-picker>
      <v-btn
        class="position-absolute top-0 right-0"
        color="white"
        icon="mdi-close"
        size="small"
        variant="text"
        @click="menu = false"
      />
    </div>
  </v-menu>
</template>

<style scoped>
.v-overlay__content:has(> .v-date-picker) {
  min-width: auto !important;
}

.v-picker-title {
  padding: 0 !important;
}

@media only screen and (max-width: 600px) {
  .v-overlay__content:has(> .v-date-picker) {
    left: 0 !important;
  }
}

.position-absolute {
  position: absolute;
}

.top-0 {
  top: 0;
}

.right-0 {
  right: 0;
}
</style>