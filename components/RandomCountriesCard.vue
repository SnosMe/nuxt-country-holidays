<template>
  <NCard title="Upcoming Holidays">
    <template #header-extra>
      <NButton
        size="small"
        :loading="holidaysLoading"
        @click="randomize"
      >
        Random
      </NButton>
    </template>
    <NList>
      <NListItem
        v-for="{ country, holiday } in randomCountryHolidays"
        :key="country.countryCode!"
      >
        <NuxtLink
          :to="`/${country.countryCode}`"
          custom
        >
          <template #default="{ href }">
            <NButton
              text
              tag="a"
              :href="href"
              style="font-weight: 500;"
            >
              {{ country.name }}
            </NButton>
          </template>
        </NuxtLink>
        <div>{{ holiday.name }}</div>
        <div data-allow-mismatch>
          {{ new Date(holiday.date!).toLocaleDateString(undefined, { dateStyle: 'medium' }) }}
        </div>
      </NListItem>
    </NList>
  </NCard>
</template>

<script setup lang="ts">
import { NCard, NList, NListItem, NButton } from 'naive-ui';
import type { components } from '../api';

const countries = await api.AvailableCountries();

interface CountryUpcomingHoliday {
  country: components['schemas']['CountryV3Dto'];
  holiday: components['schemas']['PublicHolidayV3Dto'];
}
const holidaysLoading = ref(false);
const randomCountryHolidays = shallowReactive<CountryUpcomingHoliday[]>([]);

function pickRandom<T>(values: readonly T[], count: number): T[] {
  const rand = useRandom();
  count = Math.min(values.length, count);
  const out: T[] = [];
  while (out.length < count) {
    const index = Math.floor(rand.next() * values.length);
    if (!out.includes(values[index])) {
      out.push(values[index]);
    }
  }
  return out;
}

async function randomize() {
  const randomCountries = pickRandom(countries.data.value ?? [], 3);
  holidaysLoading.value = true;
  const holidays = await Promise.all(
    randomCountries.map(country => api.NextPublicHolidays(country.countryCode!)));
  holidaysLoading.value = false;
  if (holidays.every(res => res.data.value != null)) {
    randomCountryHolidays.length = 0;
    for (let i = 0; i < randomCountries.length; ++i) {
      randomCountryHolidays.push({
        country: randomCountries[i],
        holiday: holidays[i].data.value![0],
      });
    }
  }
}

await randomize();
</script>
