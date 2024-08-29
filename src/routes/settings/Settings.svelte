<script lang="ts">
  import { version } from '$app/environment';
  import { goto } from '$app/navigation';

  import { route, routes } from '$lib/routes';
  import { activeLocaleName, translate } from '$lib/translate';
  import LanguageModal from '$lib/translate/LanguageModal.svelte';
  import Button from '$lib/ui/Button.svelte';
  import Icon from '$lib/ui/Icon.svelte';
  import Loader from '$lib/ui/Loader.svelte';
  import Portal from '$lib/ui/Portal.svelte';
  import ListGroup from '$lib/ui/list/ListGroup.svelte';
  import ListLinkItem from '$lib/ui/list/ListLinkItem.svelte';
  import ListSelectItem from '$lib/ui/list/ListSelectItem.svelte';
  import ListSwitchItem from '$lib/ui/list/ListSwitchItem.svelte';
  import { darkMode } from '$lib/ui/theme';
  import createBooleanStore from '$lib/utils/createBooleanStore';

  const [languageModalOpened, openLanguageModal] = createBooleanStore();

  let showLogoutPortal = false;
</script>

<ListGroup title={$translate('settings.common')}>
  <ListSelectItem title={$translate('settings.language')} value={$activeLocaleName} onClick={openLanguageModal} />
  <ListSwitchItem title={$translate('settings.darkMode')} bind:checked={$darkMode} />
</ListGroup>

<ListGroup title={$translate('settings.debug_tools')}>
  <ListLinkItem title={$translate('settings.logs')} href={route('settings.logs')} />
  <ListLinkItem title={$translate('settings.report_problem')} href="https://github.com/ya-erm/travel-days/issues" />
  <ListLinkItem title={'UI Kit'} href={route('uikit')} />
</ListGroup>

<div class="mt-1 flex-col items-center gap-0.5">
  <a class="text-decoration-none" href="https://github.com/ya-erm/travel-days/issues" target="_blank" rel="noreferrer">
    <Button appearance="link" underlined={false}>
      <span>
        <span>{$translate('settings.report_problem')}</span>
        <Icon name="ri:external-link-line" size={1} />
      </span>
    </Button>
  </a>
  <div class="build-info">
    <span>{$translate('settings.version', { values: { version } })}</span>
    <span>•</span>
    <Button appearance="link" underlined={false} text="UI Kit" on:click={() => goto(routes.uikit.path)} />
  </div>
</div>

<LanguageModal bind:opened={$languageModalOpened} />
<Portal visible={showLogoutPortal}>
  <div class="logout-portal flex-col items-center justify-center h-full">
    <h3>{$translate('auth.logging_out')}</h3>
    <Loader visible={true} />
  </div>
</Portal>

<style>
  .build-info {
    font-size: 0.9em;
  }
  .logout-portal {
    background: var(--background-color);
  }
  .logout-portal > h3 {
    font-weight: normal;
  }
</style>
