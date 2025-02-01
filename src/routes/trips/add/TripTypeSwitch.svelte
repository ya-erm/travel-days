<script lang="ts">
  import { type ComponentProps } from 'svelte';

  import MultiSwitch from '@ya-erm/svelte-ui/MultiSwitch';

  import type { TripType } from '$lib/data/trips';
  import { translate } from '$lib/translate';

  export let value: TripType;

  const options: ComponentProps<MultiSwitch>['options'] = [
    {
      id: 'airplane',
      icon: 'material-symbols-light:travel',
      title: $translate('trips.add.airplane'),
    },
    {
      id: 'car',
      icon: 'mdi:car-side',
      title: $translate('trips.add.car'),
    },
    {
      id: 'ship',
      icon: 'material-symbols-light:directions-boat-rounded',
      title: $translate('trips.add.ship'),
    },
  ];

  $: selected = options.find((option) => option.id === value);

  const onChange: ComponentProps<MultiSwitch>['onChange'] = (option) => {
    selected = option;
    value = option.id as TripType;
  };
</script>

<MultiSwitch {options} {selected} {onChange} ariaLabel={$translate('trips.add.trip_type')} />
