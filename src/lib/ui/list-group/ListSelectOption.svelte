<script lang="ts">
  import Icon from '../Icon.svelte';
  import ListGroupItem from './ListGroupItem.svelte';

  export let value: string;
  export let checked: boolean = false;
  export let onClick: (() => void) | undefined = undefined;
</script>

<ListGroupItem {onClick}>
  <label class="container">
    <span>{value}</span>
    <input type="radio" {checked} />
    {#if checked}
      <Icon name="mdi:check" size={1.25} color="var(--active-color)" />
    {/if}
  </label>
</ListGroupItem>

<style>
  .container {
    flex-grow: 1;
    display: flex;
    align-self: stretch;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    padding: 0 0.75rem;
  }
  input {
    display: none;
  }
</style>
