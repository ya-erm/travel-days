<script lang="ts">
  import type { TripPoint } from '$lib/data/trips';
  import Button from '$lib/ui/Button.svelte';
  import Icon from '$lib/ui/Icon.svelte';
  import InputLabel from '$lib/ui/InputLabel.svelte';

  export let label: string | null = null;
  export let value: TripPoint | null = null;
  export let placeholder: string | null = null;
  export let onClick: (() => void) | null = null;

  $: icon = value?.country?.code ? `flag:${value?.country.code.toLocaleLowerCase()}-1x1` : null;

  $: text = (() => {
    const countryName = value?.country?.name;
    const cityName = value?.airport?.name !== value?.city.name ? value?.city?.name : null;
    const place = cityName && countryName ? `${cityName}, ${countryName}` : (countryName ?? cityName);
    const airport = value?.airport ? `${value?.airport.code} - ${value?.airport.name}` : null;
    return airport && place ? `${airport}, ${place}` : airport;
  })();
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="label flex-col gap-0.5">
  {#if label}
    <InputLabel text={label} />
  {/if}
  <Button color="white" bordered on:click={onClick}>
    <div class="w-full flex items-center gap-0.5">
      <div class="flex-center icon">
        {#if icon}
          <Icon name={icon} />
        {:else}
          <Icon
            name="material-symbols-light:question-mark-rounded"
            color={'var(--secondary-text-color)'}
            size={1.25}
            padding={0.125}
          />
        {/if}
      </div>
      <div class="value flex-1" class:placeholder={!text}>
        {text || placeholder}
      </div>
      <Icon name="material-symbols-light:chevron-right-rounded" />
    </div>
  </Button>
</label>

<style>
  .icon {
    overflow: hidden;
    border-radius: 50%;
    border: 1px solid var(--border-color);
  }
  .value {
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .placeholder {
    opacity: 0.8;
  }
</style>
