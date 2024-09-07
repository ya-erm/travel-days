<script lang="ts">
  import { page } from '$app/stores';
  import { type ComponentProps } from 'svelte';

  import { translate } from '$lib/translate';
  import DateTimeInput from '$lib/ui/DateTimeInput.svelte';
  import Layout from '$lib/ui/Layout.svelte';
  import Portal from '$lib/ui/Portal.svelte';
  import TextArea from '$lib/ui/TextArea.svelte';
  import { deleteSearchParam, getSearchParam, setSearchParam } from '$lib/utils';

  import TripPointForm from './TripPointForm.svelte';
  import TripPointInput from './TripPointInput.svelte';
  import TripTypeSwitch from './TripTypeSwitch.svelte';

  let tripType: ComponentProps<TripTypeSwitch>['value'] = 'airplane';

  type TripPoint = ComponentProps<TripPointForm>['point'];

  let departurePoint: TripPoint | null = null;
  let arrivalPoint: TripPoint | null = null;

  const handleSubmit = () => {
    // TODO
    console.log('Submit');
  };

  $: pointSelectingParam = getSearchParam($page, 'pointSelecting');
  $: pointSelecting = pointSelectingParam === 'from' || pointSelectingParam === 'to';
  $: if (!!pointSelectingParam && !pointSelecting) {
    void deleteSearchParam($page, 'pointSelecting');
  }
  const openPointSelecting = async (type: 'from' | 'to') => {
    await setSearchParam($page, 'pointSelecting', type, { replace: false });
  };
  const closePointSelecting = async () => {
    history.back();
    await deleteSearchParam($page, 'pointSelecting');
  };

  const handlePointSubmit: ComponentProps<TripPointForm>['onSubmit'] = (point) => {
    if (pointSelectingParam === 'from') {
      departurePoint = point;
    } else if (pointSelectingParam === 'to') {
      arrivalPoint = point;
    }
    void closePointSelecting();
  };
</script>

<form class="flex-col gap-1" on:submit|preventDefault={handleSubmit}>
  <TripTypeSwitch bind:value={tripType} />
  <TripPointInput
    label={$translate('trips.add.from')}
    placeholder={$translate('trips.add.from_placeholder')}
    onClick={() => openPointSelecting('from')}
  />
  <TripPointInput
    label={$translate('trips.add.to')}
    placeholder={$translate('trips.add.to_placeholder')}
    onClick={() => openPointSelecting('to')}
  />
  <DateTimeInput label={$translate('trips.add.departure')} />
  <DateTimeInput label={$translate('trips.add.arrival')} />
  <TextArea label={$translate('trips.add.additional_info')} />
</form>

<Portal visible={pointSelecting}>
  <Layout
    header={{
      backButton: {
        onClick: closePointSelecting,
      },
      leftButton: null,
      rightButton: null,
      title: $translate(pointSelectingParam === 'from' ? 'trips.add.from' : 'trips.add.to'),
    }}
  >
    <div class="p-1">
      <TripPointForm
        point={pointSelectingParam === 'from' ? departurePoint : arrivalPoint}
        onSubmit={handlePointSubmit}
      />
    </div>
  </Layout>
</Portal>
