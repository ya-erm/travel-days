<script lang="ts">
  export let maxHeight: number | string | null = null;
  export let role: string | null = null;

  const _maxHeight = typeof maxHeight === 'number' ? `${maxHeight}rem` : maxHeight;
</script>

<ul class="list w-full" style:max-height={_maxHeight} {role}>
  <slot />
</ul>

<style>
  .list {
    list-style: none;
    padding: 0;
    margin: 0;

    overflow-y: scroll;
  }
</style>
