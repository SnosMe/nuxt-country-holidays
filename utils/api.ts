import type { paths } from '../api';

const API_BASE = 'https://date.nager.at';

export const api = {
  AvailableCountries: () => {
    type ResT = paths['/api/v3/AvailableCountries']['get']['responses']['200']['content']['application/json'];
    return useFetch<ResT>(`${API_BASE}/api/v3/AvailableCountries`, { dedupe: 'defer' });
  },
  NextPublicHolidays: (countryCode: string) => {
    type ResT = paths['/api/v3/NextPublicHolidays/{countryCode}']['get']['responses']['200']['content']['application/json'];
    return useFetch<ResT>(`${API_BASE}/api/v3/NextPublicHolidays/${countryCode}`, {});
  },
  CountryInfo: (countryCode: string) => {
    type ResT = paths['/api/v3/CountryInfo/{countryCode}']['get']['responses']['200']['content']['application/json'];
    return useFetch<ResT>(`${API_BASE}/api/v3/CountryInfo/${countryCode}`, {});
  },
  PublicHolidays: (year: Ref<number>, countryCode: string) => {
    type ResT = paths['/api/v3/PublicHolidays/{year}/{countryCode}']['get']['responses']['200']['content']['application/json'];
    return useFetch<ResT>(() => `${API_BASE}/api/v3/PublicHolidays/${year.value}/${countryCode}`, {});
  },
};
