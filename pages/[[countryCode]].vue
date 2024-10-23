<template>
  <NFlex style="padding: 12px;">
    <NBreadcrumb>
      <NuxtLink
        to="/"
        custom
      >
        <template #default="{ href }">
          <NBreadcrumbItem :href="href">
            Countries
          </NBreadcrumbItem>
        </template>
      </NuxtLink>
      <NBreadcrumbItem>{{ country.data.value!.commonName }}</NBreadcrumbItem>
    </NBreadcrumb>
    <NCard :title="`${country.data.value!.officialName}, ${country.data.value!.region}`">
      <template #header-extra>
        <NTag>{{ country.data.value!.countryCode }}</NTag>
      </template>
      <NList>
        <NListItem
          v-for="holiday in holidays.data.value!"
          :key="holiday.date!"
        >
          <div>
            {{ holiday.name }} <NTag
              v-if="holiday.global"
              size="small"
            >
              National
            </NTag>
          </div>
          <div style="font-size: 12px;">
            {{ holiday.localName }}
          </div>
          <div data-allow-mismatch>
            {{ new Date(holiday.date!).toLocaleDateString(undefined, { dateStyle: 'medium' }) }}
          </div>
        </NListItem>
      </NList>
    </NCard>
    <NButtonGroup>
      <NuxtLink
        v-for="i in 11"
        :key="i"
        :to="{ query: { year: 2019 + i } }"
        custom
      >
        <template #default="{ href }">
          <NButton
            tag="a"
            :href="href"
            size="small"
            secondary
            :type="year == 2019 + i ? 'primary' : undefined"
          >
            {{ 2019 + i }}
          </NButton>
        </template>
      </NuxtLink>
    </NButtonGroup>
  </NFlex>
</template>

<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem, NCard, NList, NListItem, NButtonGroup, NButton, NFlex, NTag } from 'naive-ui';

const route = useRoute();

const year = computed<number>(() => {
  const y = Number(route.query['year']);
  return Number.isNaN(y) ? new Date().getFullYear() : y;
});

const [country, holidays] = await Promise.all([
  api.CountryInfo(route.params.countryCode as string),
  api.PublicHolidays(year, route.params.countryCode as string),
]);

useHead({
  title: country.data.value!.commonName,
});
</script>
