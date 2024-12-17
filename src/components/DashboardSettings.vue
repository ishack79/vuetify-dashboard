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
      <v-card-text class="settings-container">
        <v-list class="settings-list">
          <v-list-item
            v-for="item in settings"
            :key="item.id"
            class="mb-2"
          >
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
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
.settings-content {
  height: 100vh;
  color: #e2e8f0;
  display: flex;
  flex-direction: column;
}

.settings-card {
  background: rgba(65, 65, 65, 0.95) !important;
  border: 1px solid rgba(131, 131, 131, 0.1);
  padding: 16px;
  border-radius: 8px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.settings-container {
  flex: 1;
  overflow-y: auto;
  height: calc(100vh - 200px);
}

.settings-list {
  background: transparent !important;
  height: 100%;
}

.chart-checkbox {
  width: 100%;
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
  background-color: rgba(36, 36, 36, 0.9);
}

:deep(.v-card-text) {
  height: 100%;
  padding: 0;
}
</style>