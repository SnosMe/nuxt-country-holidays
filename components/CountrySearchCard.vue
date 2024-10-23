<template>
  <NCard title="Countries">
    <template #header-extra>
      <NInput
        v-model:value.trim="searchText"
        size="small"
        placeholder="Search…"
      />
    </template>
    <NResult
      v-if="countries.status.value !== 'success'"
      status="error"
      title="Error"
    />
    <NVirtualList
      v-else
      :items="filtered"
      :item-size="32"
      style="min-height: 240px; contain: size;"
    >
      <template #default="{ item: country }">
        <NuxtLink
          :key="country.countryCode!"
          :to="`/${country.countryCode}`"
          custom
        >
          <template #default="{ href }">
            <NButton
              text
              tag="a"
              :href="href"
              style="display: block; line-height: 32px;"
            >
              {{ country.name }}
            </NButton>
          </template>
        </NuxtLink>
      </template>
    </NVirtualList>
  </NCard>
</template>

<script setup lang="ts">
import { NVirtualList, NCard, NInput, NButton, NResult } from 'naive-ui';

const countries = api.AvailableCountries();

const searchText = ref('');

const filtered = computed(() => {
  if (!countries.data.value) return [];
  if (!searchText.value.length) return countries.data.value;

  return countries.data.value.filter((country) => {
    return country.name!.toLowerCase().split(' ')
      .some(word => word.startsWith(searchText.value));
  });
});
</script>
