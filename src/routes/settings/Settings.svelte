<script lang="ts">
  import { version } from '$app/environment';

  import { route } from '$lib/routes';
  import { activeLocaleName, translate } from '$lib/translate';
  import LanguageModal from '$lib/translate/LanguageModal.svelte';
  import Icon from '$lib/ui/Icon.svelte';
  import Loader from '$lib/ui/Loader.svelte';
  import Portal from '$lib/ui/Portal.svelte';
  import ListGroup from '$lib/ui/list-group/ListGroup.svelte';
  import ListLinkItem from '$lib/ui/list-group/ListLinkItem.svelte';
  import ListSelectItem from '$lib/ui/list-group/ListSelectItem.svelte';
  import ListSwitchItem from '$lib/ui/list-group/ListSwitchItem.svelte';
  import { darkMode } from '$lib/ui/theme';
  import createBooleanStore from '$lib/utils/createBooleanStore';

  const [languageModalOpened, openLanguageModal] = createBooleanStore();

  let showLogoutPortal = false;
</script>

<ListGroup title={$translate('settings.common')}>
  <ListSelectItem
    title={$translate('settings.language')}
    value={$activeLocaleName}
    onClick={openLanguageModal}
    aria-haspopup="dialog"
  />
  <ListSwitchItem title={$translate('settings.darkMode')} bind:checked={$darkMode} />
</ListGroup>

<ListGroup title={$translate('settings.debug_tools')}>
  <ListLinkItem title={$translate('settings.logs')} href={route('settings.logs')} />
  <ListLinkItem title={$translate('settings.report_problem')} href="https://github.com/ya-erm/travel-days/issues" />
  <ListLinkItem title={'UI Kit'} href={route('uikit')} />
</ListGroup>

<div class="flex-col items-center gap-0.5">
  <a class="text-decoration-none" href="https://github.com/ya-erm/travel-days/issues" target="_blank" rel="noreferrer">
    <span>
      <span>{$translate('settings.report_problem')}</span>
      <Icon name="ri:external-link-line" size={1} />
    </span>
  </a>
  <div class="build-info">
    <span>{$translate('settings.version', { values: { version } })}</span>
    <span>•</span>
    <a class="text-decoration-none" href={route('uikit')}>UI Kit</a>
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
