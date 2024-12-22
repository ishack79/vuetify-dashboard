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
  transition: all 0.3s ease;
  white-space: nowrap;
}

.main-tab:hover {
  color: #dfdfdf;
}

.main-tab--active {
  background: rgba(35, 36, 36, 0.95);
  color: #dfdfdf;
}

.main-tab + .main-tab {
  margin-left: 1px;
}
</style>