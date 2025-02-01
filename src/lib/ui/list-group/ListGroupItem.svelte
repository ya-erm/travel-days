<script lang="ts">
  export let href: string | undefined = undefined;
  export let onClick: (() => void) | undefined = undefined;
</script>

<li class="list-group-item">
  {#if href}
    <a class="item" {href} {...$$restProps}>
      <slot />
    </a>
  {:else}
    <button class="item" on:click={onClick} {...$$restProps}>
      <slot />
    </button>
  {/if}
</li>

<style>
  .list-group-item {
    display: flex;
    align-items: center;
    position: relative;
  }
  .list-group-item:not(:last-child) {
    margin-bottom: 1px;
  }
  .list-group-item:not(:last-child):after {
    position: absolute;
    content: '';
    left: 0;
    right: 0;
    bottom: -1px;
    height: 1px;
    background-color: var(--border-color);
  }
  .list-group-item > .item {
    min-height: 2.25rem;
    width: 100%;
    text-decoration: inherit;
    color: inherit;
    flex-grow: 1;
    display: flex;
    align-items: center;
  }
  .list-group-item > button.item {
    border: none;
    background: none;
    font-size: inherit;
    padding: 0;
  }
  .list-group-item:first-child > .item {
    border-top-left-radius: 0.75rem;
    border-top-right-radius: 0.75rem;
  }
  .list-group-item:last-child > .item {
    border-bottom-left-radius: 0.75rem;
    border-bottom-right-radius: 0.75rem;
  }
  .item:focus-visible {
    outline: 2px solid var(--active-color);
    z-index: 1;
  }
</style>
