<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  export let id: string = 'modal';
  export let opened: boolean;
  export let header: string | null = null;
  export let width: string | number | null = null;

  export let onClose: (() => void) | null = null;

  let dialog: HTMLDialogElement;

  const handleClose = () => {
    opened = false;
    onClose?.();
  };

  $: if (opened) {
    dialog?.showModal();
  } else if (dialog?.open) {
    dialog?.close();
  }

  onMount(() => {
    const handleClick = (e: MouseEvent) => {
      const dialogElement = dialog;
      const isClickedOnBackDrop = e.target === dialogElement;
      if (isClickedOnBackDrop) {
        dialogElement.close();
      }
    };
    dialog.addEventListener('click', handleClick);
    return () => dialog.removeEventListener('click', handleClick);
  });
</script>

{#if opened}
  <div class="modal-background" in:fade={{ duration: 300 }} out:fade={{ duration: 300 }} aria-hidden />
{/if}

<div class="flex-center">
  <dialog
    class="modal"
    open={opened}
    aria-modal="true"
    bind:this={dialog}
    on:close={handleClose}
    in:fade={{ duration: 100 }}
    out:fade={{ duration: 100 }}
    style:width={typeof width === 'string' ? width : `${width}rem`}
    aria-labelledby={`${id}.header`}
  >
    {#if $$slots.header}
      <slot name="header" />
    {:else if !!header}
      <h2 class="header" id={`${id}.header`}>{header}</h2>
    {/if}
    <slot />
  </dialog>
</div>

<style>
  dialog {
    color: var(--primary-text-color);
  }
  dialog::backdrop {
    background: transparent;
  }

  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background: rgba(0, 0, 0, 0.3);
  }
  :global(body.dark-mode .modal-background) {
    background: rgba(0, 0, 0, 0.7);
  }
  .modal {
    max-width: calc(100vw - 2rem);
    max-height: calc(100vh - 2rem);
    border-radius: 1.5em;
    background: var(--header-background-color);
    border: 1px solid var(--border-color);
    padding: 1em;
    overflow: auto;
    z-index: 101;
  }
  .header {
    font-weight: 600;
    font-size: inherit;
    text-align: center;
    margin: 0;
    margin-bottom: 1rem;
  }
</style>
