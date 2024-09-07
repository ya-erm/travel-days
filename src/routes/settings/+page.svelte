<script lang="ts">
  import { translate } from '$lib/translate';
  import { useTitle } from '$lib/ui/header';

  import Settings from './Settings.svelte';

  useTitle($translate('settings.title'));
</script>

<div class="p-1 flex-col gap-1">
  <Settings />
</div>
