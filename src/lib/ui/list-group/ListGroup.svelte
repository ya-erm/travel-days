<script lang="ts">
  export let title: string | null = null;
</script>

<section class="list-group" role="group" aria-labelledby={`list-group.title.${title}`}>
  {#if title}
    <h2 class="list-group-title" id={`list-group.title.${title}`}>{title}</h2>
  {/if}
  <ul class="list-group-container">
    <slot />
  </ul>
  {#if $$slots.description}
    <div class="list-group-description">
      <slot name="description" />
    </div>
  {/if}
</section>

<style>
  .list-group {
    padding-bottom: 0;
  }
  h2 {
    margin: 0;
  }
  .list-group-title {
    color: var(--secondary-text-color);
    text-transform: uppercase;
    margin-bottom: 0.75rem;
    margin-left: 0.75rem;
    font-size: 0.75rem;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .list-group-container {
    background-color: var(--header-background-color);
  }
  .list-group-description {
    color: var(--secondary-text-color);
    line-height: 1.5;
    font-size: 0.8rem;
    margin: 0.75rem;
  }
  .list-group-container {
    border-radius: 0.75rem;
  }
</style>
