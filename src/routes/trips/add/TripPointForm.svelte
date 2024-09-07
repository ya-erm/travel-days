<script lang="ts">
  import { airports } from '$lib/data/airports';
  import { cities } from '$lib/data/cities';
  import { countries } from '$lib/data/countries';
  import { translate } from '$lib/translate';
  import Button from '$lib/ui/Button.svelte';
  import InputList from '$lib/ui/InputList.svelte';

  type TripPoint = {
    countryCode: string;
    cityCode: string;
    airportCode?: string;
  };

  export let point: TripPoint | null = null;
  export let onSubmit: (point: TripPoint) => void;

  let countryCode = point?.countryCode;
  let cityCode = point?.cityCode;
  let airportCode = point?.airportCode;

  $: country = $countries.find(({ code }) => code === countryCode);
  $: city = $cities.find(({ code }) => code === cityCode);
  $: airport = $airports.find(({ code }) => code === airportCode);

  let countrySearch = country?.name ?? '';
  let citySearch = city?.name ?? '';
  let airportSearch = airport?.name ?? '';

  function search<T extends { name: string; code: string }>(list: T[], text: string) {
    return list
      .filter(
        (item) => item.name.toLowerCase().includes(text.toLowerCase()) || item.code.startsWith(text.toUpperCase()),
      )
      .sort((a, b) => {
        const a1 = a.name.toLowerCase();
        const b1 = b.name.toLowerCase();
        const c1 = text.toLowerCase();
        if (b.code.startsWith(text.toUpperCase())) return 1;
        if (a.code.startsWith(text.toUpperCase())) return -1;
        if (a1.startsWith(c1) && !b1.startsWith(c1)) return -1;
        if (!a1.startsWith(c1) && b1.startsWith(c1)) return 1;
        return 0;
      });
  }

  $: filteredCountries = search($countries, countrySearch);
  $: filteredCities = search(
    $cities.filter((item) => (countryCode ? item.country?.code === countryCode : citySearch.length >= 2)),
    citySearch,
  );
  $: filteredAirports = search(
    $airports.filter((item) => {
      if (countryCode && cityCode) {
        return item.city?.country?.code === countryCode && item.city?.code === cityCode;
      }
      if (countryCode) {
        return item.city?.country?.code === countryCode;
      }
      if (cityCode) {
        return item.city?.code === cityCode;
      }
      return airportSearch.length >= 2;
    }),
    airportSearch,
  );

  $: icon = countrySearch === country?.name && countryCode ? `flag:${countryCode.toLocaleLowerCase()}-1x1` : null;

  const handleSubmit = () => {
    if (!countryCode || !cityCode) {
      return;
    }
    // TODO
    console.log('Submit', { countryCode, cityCode, airportCode });
    onSubmit({ countryCode, cityCode, airportCode });
  };
</script>

<form class="flex-col gap-1" on:submit|preventDefault={handleSubmit}>
  <InputList
    id="country:input-list"
    bind:value={countrySearch}
    onChange={(text) => {
      if (text !== country?.name) {
        countryCode = undefined;
      }
    }}
    label={$translate('trips.add.country')}
    placeholder={$translate('trips.add.country_placeholder')}
    noOptionsText={countrySearch.length <= 2 ? 'Начните вводить название' : 'Ничего не найдено'}
    icon={icon ?? 'mdi:search'}
    iconRounded={!!icon}
    required
    items={filteredCountries.map((item) => ({
      icon: `flag:${item.code.toLocaleLowerCase()}-1x1`,
      title: item.name,
      description: item.code,
      id: item.code,
    }))}
    onSelect={(item) => {
      countryCode = item?.id;
    }}
  />

  <InputList
    id="city:input-list"
    bind:value={citySearch}
    onChange={(text) => {
      if (text !== city?.name) {
        cityCode = undefined;
      }
    }}
    label={$translate('trips.add.city')}
    placeholder={$translate('trips.add.city_placeholder')}
    noOptionsText={countrySearch.length <= 2 ? 'Начните вводить название' : 'Ничего не найдено'}
    icon={city ? 'mdi:city-variant-outline' : 'mdi:search'}
    required
    items={filteredCities.map((item) => ({
      title: item.name,
      description: !country ? item.country?.name : undefined,
      id: item.code,
    }))}
    onSelect={(item) => {
      cityCode = item?.id;
      if (!countryCode) {
        const city = $cities.find(({ code }) => code === cityCode);
        countryCode = city?.country?.code;
        countrySearch = city?.country?.name ?? '';
      }
    }}
  />

  <InputList
    id="airport:input-list"
    bind:value={airportSearch}
    onChange={(text) => {
      if (text !== airport?.name) {
        airportCode = undefined;
      }
    }}
    label={$translate('trips.add.airport')}
    placeholder={$translate('trips.add.airport_placeholder')}
    noOptionsText={countrySearch.length <= 2 ? 'Начните вводить название' : 'Ничего не найдено'}
    icon={airport ? 'material-symbols-light:travel' : 'mdi:search'}
    required
    items={filteredAirports.map((item) => ({
      title: item.name,
      description: `${item.code} - ${item.city?.name}, ${item.city?.country?.name}`,
      id: item.code,
    }))}
    onSelect={(item) => {
      airportCode = item?.id;
      const airport = $airports.find(({ code }) => code === airportCode);
      if (!countryCode) {
        countryCode = airport?.country?.code;
        countrySearch = airport?.country?.name ?? '';
      }
      if (!cityCode) {
        cityCode = airport?.city?.code;
        citySearch = airport?.city?.name ?? '';
      }
    }}
  />

  <Button type="submit">{$translate('common.continue')}</Button>
</form>
