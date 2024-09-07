<script lang="ts">
  import { activeLocale, languages, translate, type Locales } from '$lib/translate';
  import Button from '$lib/ui/Button.svelte';
  import ButtonBase from '$lib/ui/ButtonBase.svelte';
  import Icon from '$lib/ui/Icon.svelte';
  import Modal from '$lib/ui/Modal.svelte';

  export let opened: boolean;

  let accepted = false;

  let previousLocale: Locales;
  $: if (!previousLocale) {
    previousLocale = $activeLocale;
  }

  const selectLocale = (locale: string) => {
    activeLocale.set(locale as Locales);
  };

  const handleClose = () => {
    if (!accepted) {
      activeLocale.set(previousLocale);
    }
    opened = false;
  };

  const handleAccept = () => {
    accepted = true;
    opened = false;
  };
</script>

<Modal id="language-modal" header={$translate('language.select_language')} {opened} onClose={handleClose}>
  <div class="items flex-col" role="listbox">
    {#each Object.entries(languages) as [locale, language] (locale)}
      {@const selected = $activeLocale === locale}
      <ButtonBase on:click={() => selectLocale(locale)} role="option" aria-selected={selected}>
        <div class="option w-full flex justify-between gap-0.5 p-0.5" class:active={selected}>
          <div class="flex gap-0.5">
            <Icon name={language.icon} />
            <span>{language.name}</span>
          </div>
          {#if selected}
            <Icon name="mdi:check" />
          {/if}
        </div>
      </ButtonBase>
    {/each}
  </div>
  <div class="grid-col-2 gap-1">
    <Button text={$translate('common.cancel')} color="secondary" on:click={handleClose} />
    <Button text={$translate('common.accept')} color="primary" on:click={handleAccept} />
  </div>
</Modal>

<style>
  .items {
    padding: 0;
    margin: 1rem 0;
    min-width: 14rem;
    list-style: none;
    gap: 0.25rem;
  }
  .active {
    color: var(--active-color);
  }
  @media (hover: hover) {
    .option:hover {
      background: var(--hover-background-color);
    }
  }
</style>
