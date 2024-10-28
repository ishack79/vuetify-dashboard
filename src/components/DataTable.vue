<script setup>
defineProps({
  headers: {
    type: Array,
    required: true
  },
  items: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="25"
    hover
    class="elevation-1 rounded-lg"
  >
    <template #[`item.status`]="{ item }">
      <v-chip
        v-if="item.raw && item.raw.status"
        :color="item.raw.status === 'On Time' ? 'success' : 'warning'"
        size="small"
        label
      >
        {{ item.raw.status }}
      </v-chip>
    </template>
  </v-data-table>
</template>