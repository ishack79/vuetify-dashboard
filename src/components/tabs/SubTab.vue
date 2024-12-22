<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['select']);

const classes = computed(() => ({
  'sub-tab': true,
  'sub-tab--active': props.isActive
}));
</script>

<template>
  <button
    :class="classes"
    @click="emit('select')"
  >
    {{ title }}
  </button>
</template>

<style scoped>
.sub-tab {
  background: transparent;
  border: none;
  color: #666666;
  cursor: pointer;
  font-size: 0.875rem;
  padding: 0.75rem 1.5rem;
  position: relative;
  transition: all 0.3s ease;
}

.sub-tab:hover {
  color: #dfdfdf;
}

.sub-tab--active {
  color: #dfdfdf;
}

.sub-tab--active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: currentColor;
  transform: scaleX(1);
  transition: transform 0.3s ease;
}

.sub-tab:not(.sub-tab--active)::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: currentColor;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.sub-tab:hover::after {
  transform: scaleX(1);
}
</style>