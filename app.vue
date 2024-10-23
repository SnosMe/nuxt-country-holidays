<template>
  <NuxtLoadingIndicator />
  <NuxtPage style="max-width: 900px; margin: 0 auto;" />
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} • Public Holidays` : 'Public Holidays';
  },
});
</script>
