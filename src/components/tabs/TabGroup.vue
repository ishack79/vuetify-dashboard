<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'main',
    validator: (value) => ['main', 'sub'].includes(value)
  }
});

const tabsContainer = ref(null);
const showLeftArrow = ref(false);
const showRightArrow = ref(false);

const classes = computed(() => ({
  'tab-group': true,
  [`tab-group--${props.variant}`]: true
}));

const checkScroll = () => {
  if (!tabsContainer.value) return;
  
  const { scrollLeft, scrollWidth, clientWidth } = tabsContainer.value;
  showLeftArrow.value = scrollLeft > 0;
  showRightArrow.value = scrollLeft < scrollWidth - clientWidth;
};

const scroll = (direction) => {
  if (!tabsContainer.value) return;
  const scrollAmount = direction === 'left' ? -200 : 200;
  tabsContainer.value.scrollBy({ left: scrollAmount, behavior: 'smooth' });
};

onMounted(() => {
  checkScroll();
  window.addEventListener('resize', checkScroll);
  if (tabsContainer.value) {
    tabsContainer.value.addEventListener('scroll', checkScroll);
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScroll);
  if (tabsContainer.value) {
    tabsContainer.value.removeEventListener('scroll', checkScroll);
  }
});
</script>

<template>
  <div class="tab-group-wrapper">
    <button 
      v-show="showLeftArrow" 
      class="scroll-button scroll-button--left"
      @click="scroll('left')"
    >
      <v-icon>mdi-chevron-left</v-icon>
    </button>
    
    <div :class="classes" ref="tabsContainer">
      <slot></slot>
    </div>
    
    <button 
      v-show="showRightArrow" 
      class="scroll-button scroll-button--right"
      @click="scroll('right')"
    >
      <v-icon>mdi-chevron-right</v-icon>
    </button>
  </div>
</template>

<style scoped>
.tab-group-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.tab-group {
  display: flex;
  align-items: center;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-behavior: smooth;
}

.tab-group::-webkit-scrollbar {
  display: none;
}

.tab-group--main {
  padding: 0 1rem;
  background: transparent;
}

.tab-group--sub {
  padding: 0.5rem 1rem;
  background: rgba(35, 36, 36, 0.95);
  border-radius: 8px;
  margin: 0 1rem;
  gap: 0.5rem;
}

.scroll-button {
  position: absolute;
  z-index: 1;
  background: rgba(35, 36, 36, 0.95);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #dfdfdf;
  transition: all 0.3s ease;
}

.scroll-button:hover {
  background: rgba(45, 46, 46, 0.95);
}

.scroll-button--left {
  left: 0;
}

.scroll-button--right {
  right: 0;
}

.tab-group--main .scroll-button {
  top: 50%;
  transform: translateY(-50%);
}

.tab-group--sub .scroll-button {
  top: 50%;
  transform: translateY(-50%);
}
</style>