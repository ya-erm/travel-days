<script lang="ts">
  import Icon from '$lib/ui/Icon.svelte';
  import { findRoute } from '$lib/routes';
  import { translate } from '$lib/translate';
  import Button from '../Button.svelte';

  export let href: string | null = null;
  export let onClick: (() => void) | null = null;
  export let title: string | null = null;

  const goBack = () => {
    history.back();
  };
</script>

<div class="back-button">
  {#if href}
    <a {href} on:click={onClick}>
      <Icon name="mdi:chevron-left" />
      {title ?? $translate(findRoute(href)?.title ?? 'common.back')}
    </a>
  {:else}
    <Button appearance="transparent" on:click={onClick ?? goBack} aria-label={title ?? $translate('common.back')}>
      <div class="flex items-center">
        <Icon name="mdi:chevron-left" />
        <span>
          {title ?? $translate('common.back')}
        </span>
      </div>
    </Button>
  {/if}
</div>

<style>
  .back-button {
    margin-left: -0.5rem;
  }
  a {
    display: flex;
    align-items: center;
    color: var(--active-color);
    text-decoration: none;
    padding: 0.5rem;
  }
</style>
