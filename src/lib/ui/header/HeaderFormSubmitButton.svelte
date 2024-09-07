<script lang="ts">
  import { translate } from '$lib/translate';
  import Button from '$lib/ui/Button.svelte';

  const handleSave = () => {
    document.querySelector('form')?.dispatchEvent(new Event('submit'));
  };
</script>

<Button appearance="transparent" on:click={handleSave} text={$translate('common.done')} />
