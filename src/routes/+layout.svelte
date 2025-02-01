<script lang="ts">
  import '$lib/translate';

  import Toasts from '@ya-erm/svelte-ui/toasts/Toasts';
  import ThemeProvider from '@ya-erm/svelte-ui/ThemeProvider';

  import Layout from '$lib/ui/Layout.svelte';
</script>

<Toasts />

<Layout>
  <slot />
</Layout>
<ThemeProvider />

<style>
  :global(body) {
    margin: 0;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', sans-serif;
  }
</style>
