<script lang="ts">
  export let visible: boolean;
  export let testId: string = 'Portal';

  let dialog: HTMLDialogElement;

  $: if (visible && !dialog?.open) {
    dialog?.showModal();
  } else if (!visible && dialog?.open) {
    dialog?.close();
  }
</script>

<dialog
  open={visible}
  aria-modal={true}
  bind:this={dialog}
  on:cancel={(e) => {
    e.preventDefault();
  }}
  class="portal"
  data-testId={testId}
>
  {#if visible}
    <slot />
  {/if}
</dialog>

<style>
  dialog {
    border: none;
    max-width: 100vw;
    max-height: 100vh;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }
  .portal {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 1;
  }
</style>
