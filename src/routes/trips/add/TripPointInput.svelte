<script lang="ts">
  import Button from '$lib/ui/Button.svelte';
  import Icon from '$lib/ui/Icon.svelte';
  import InputLabel from '$lib/ui/InputLabel.svelte';

  export let label: string | null = null;
  export let icon: string | null = null;
  export let placeholder: string | null = null;
  export let text: string | null = null;
  export let onClick: (() => void) | null = null;
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="label flex-col gap-0.5">
  {#if label}
    <InputLabel text={label} />
  {/if}
  <Button color="white" bordered on:click={onClick}>
    <div class="w-full flex items-center gap-0.5">
      <div class="icon">
        {#if icon}
          <Icon name={icon} />
        {:else}
          <Icon
            name="material-symbols-light:question-mark-rounded"
            color={'var(--secondary-text-color)'}
            size={1.25}
            padding={0.125}
          />
        {/if}
      </div>
      <div class="value flex-1" class:placeholder={!text}>
        {text || placeholder}
      </div>
      <Icon name="material-symbols-light:chevron-right-rounded" />
    </div>
  </Button>
</label>

<style>
  .icon {
    border-radius: 50%;
    border: 1px solid var(--border-color);
  }
  .value {
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .placeholder {
    opacity: 0.8;
  }
</style>
