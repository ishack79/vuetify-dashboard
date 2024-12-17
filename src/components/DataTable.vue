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
    :items-per-page="15"
    hover
    class="elevation-1 rounded-lg"
  >
    <template #[`item.lvp`]="{ item }">
      <v-chip
        v-if="item.lvp"
        :color="item.lvp === 'Y' ? 'success' : 'warning'"
        size="small"
        label
      >
        {{ item.lvp }}
      </v-chip>
    </template>

    <template #[`item.flight`]="{ item }">
      <v-chip
        v-if="item.flight"
        :color="'info'"
        size="small"
        label
      >
        {{ item.flight }}
      </v-chip>
    </template>

    <template #[`item.groundHandler`]="{ item }">
      <v-chip
        v-if="item.groundHandler"
        :color="'info'"
        size="small"
        label
      >
        {{ item.groundHandler }}
      </v-chip>
    </template>

    <template #[`item.rwy`]="{ item }">
      <v-chip
        v-if="item.rwy"
        :color="'info'"
        size="small"
        label
      >
        {{ item.rwy }}
      </v-chip>
    </template>

    <template #[`item.type`]="{ item }">
      <v-chip
        v-if="item.type"
        :color="'info'"
        size="small"
        label
      >
        {{ item.type }}
      </v-chip>
    </template>
  </v-data-table>
</template>