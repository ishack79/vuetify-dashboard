<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: Boolean,
  settings: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['update:modelValue', 'updateSetting']);

const toggleChart = (chart) => {
  emit('updateSetting', { ...chart, enabled: !chart.enabled });
};
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    transition="dialog-bottom-transition"
  >
    <v-card class="settings-modal">
      <v-toolbar density="compact" class="pe-3">
        <v-toolbar-title class="text-h6">Dashboard Settings</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          icon
          class="close-btn"
          @click="emit('update:modelValue', false)"
          :ripple="false"
        >
          <v-icon icon="mdi-close" size="large" />
        </v-btn>
      </v-toolbar>
      
      <v-card-text>
        <h2 class="text-h4 mb-6">Customize Dashboard</h2>
        <v-card class="settings-card mx-auto" max-width="600">
          <v-card-text>
            <p class="text-subtitle-1 mb-4">Select charts to display:</p>
            <v-virtual-scroll
              :items="settings"
              height="400"
              item-height="64"
            >
              <template v-slot:default="{ item }">
                <v-list-item>
                  <v-checkbox
                    :model-value="item.enabled"
                    :label="item.name"
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
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.settings-modal {
  background: rgba(35, 36, 66, 0.95) !important;
}

.settings-card {
  background: rgba(42, 43, 77, 0.95) !important;
  border: 1px solid rgba(99, 102, 241, 0.1);
}

.v-toolbar {
  background: transparent !important;
  border: none !important;
}

.close-btn {
  background-color: rgba(239, 68, 68, 0.1) !important;
  color: rgb(239, 68, 68) !important;
  border: 2px solid rgb(239, 68, 68) !important;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background-color: rgb(239, 68, 68) !important;
  color: white !important;
  transform: scale(1.1);
}

.chart-checkbox {
  width: 100%;
}

:deep(.v-selection-control__input) {
  opacity: 1 !important;
}

:deep(.v-selection-control) {
  min-height: 40px;
}
</style>