<script lang="ts">
  import Icon from '$lib/ui/Icon.svelte';

  export let icon: string | null = null;
  export let text: string | null = null;
</script>

<li class="w-full flex-col">
  <div class="flex items-center gap-0.5">
    <div class="icon flex-center">
      {#if icon}
        <Icon name={icon} />
      {/if}
      <slot name="icon" />
    </div>
    <span class="value flex-1">
      {text}
    </span>
  </div>
</li>

<style>
  .icon {
    border-radius: 50%;
    border: 1px solid var(--border-color);
    overflow: hidden;
  }
  .value {
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
</style>
