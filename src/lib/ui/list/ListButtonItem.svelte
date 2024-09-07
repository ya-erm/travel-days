<script lang="ts">
  import Icon from '$lib/ui/Icon.svelte';
  import Button from '$lib/ui/Button.svelte';

  export let icon: string | null = null;
  export let text: string | null = null;
  export let onClick: () => void;
  export let role: string | null = null;
</script>

<li class="w-full flex-col">
  <Button appearance="transparent" align="left" on:click={onClick} {role}>
    <div class="flex items-center gap-0.5 text-ellipsis">
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
  </Button>
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
