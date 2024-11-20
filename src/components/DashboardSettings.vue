<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
  modelValue: Boolean,
  settings: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['update:modelValue', 'updateSetting']);

const enabledCount = computed(() => props.settings.filter(s => s.enabled).length);

const toggleChart = (chart) => {
  if (!chart.enabled && enabledCount.value >= 4) {
    return;
  }
  emit('updateSetting', { ...chart, enabled: !chart.enabled });
};
</script>

<template>
  <div class="settings-content">
    <h2 class="text-h4 mb-6">Select charts</h2>
    <v-card class="settings-card mx-auto">
      <v-card-text>
        <v-virtual-scroll
          :items="settings"
          height="50%"
          item-height="8%"
        >
          <template v-slot:default="{ item }">
            <v-list-item>
              <v-checkbox
                :model-value="item.enabled"
                :label="item.name"
                :disabled="!item.enabled && enabledCount >= 4"
                color="primary"
                hide-details
                class="chart-checkbox"
                @change="toggleChart(item)"
              >
                <template v-slot:prepend>
                  <v-icon :icon="item.icon" class="me-2" />
                </template>
              </v-checkbox>
            </v-list-item>
          </template>
        </v-virtual-scroll>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
.settings-content {
  height: 100%;
  color: #e2e8f0;
}

.settings-card {
  background: rgba(42, 43, 77, 0.95) !important;
  border: 1px solid rgba(99, 102, 241, 0.1);
  padding: 16px;
  border-radius: 8px;
}

.chart-checkbox {
  width: 100%;
  margin-bottom: 8px;
}

:deep(.v-selection-control__input) {
  opacity: 1 !important;
}

:deep(.v-selection-control) {
  min-height: 40px;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

:deep(.v-selection-control:hover) {
  background-color: rgba(99, 102, 241, 0.1);
}
</style>