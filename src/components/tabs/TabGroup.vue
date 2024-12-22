<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'main',
    validator: (value) => ['main', 'sub'].includes(value)
  }
});

const classes = computed(() => ({
  'tab-group': true,
  [`tab-group--${props.variant}`]: true
}));
</script>

<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<style scoped>
.tab-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1rem;
}

.tab-group--main {
  border-bottom: 1px solid rgba(223, 223, 223, 0.1);
}

.tab-group--sub {
  padding: 0.5rem 1rem;
  background: rgba(35, 36, 36, 0.95);
  border-radius: 8px;
}
</style>