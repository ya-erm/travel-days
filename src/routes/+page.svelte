<script lang="ts">
  import { goto } from '$app/navigation';
  import { routes } from '$lib/routes';
  import { onMount } from 'svelte';

  onMount(async () => {
    await goto(routes.trips.path);
  });
</script>
