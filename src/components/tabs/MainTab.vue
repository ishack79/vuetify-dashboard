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
  'main-tab': true,
  'main-tab--active': props.isActive
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
.main-tab {
  background: transparent;
  border: none;
  color: #666666;
  cursor: pointer;
  font-size: 1rem;
  padding: 1rem 2rem;
  position: relative;
  transition: color 0.3s ease;
}

.main-tab:hover {
  color: #dfdfdf;
}

.main-tab--active {
  color: #dfdfdf;
}
</style>