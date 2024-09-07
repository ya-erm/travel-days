<script lang="ts">
  import InputLabel from './InputLabel.svelte';

  export let name: string | null = null;
  export let label: string | null = null;
  export let placeholder: string | null = null;
  export let required: boolean = false;
  export let optional: boolean = false;
  export let disabled: boolean = false;
  export let minlength: number | null = null;
  export let maxlength: number | null = null;
  export let error: string | null = null;
  export let testId: string | null = 'TextArea';

  export let value: string | null = null;
  export let onChange: ((value: string) => void) | null = null;
  export let monospace = false;

  export let v2 = false;

  export let ref: HTMLTextAreaElement | null = null;

  const handleChange = (e: Event) => {
    value = (e.target as HTMLTextAreaElement).value;
    onChange?.(value);
  };
</script>

<label class="input-label" data-testId={`${testId}.Container`}>
  {#if label}
    <InputLabel text={label} {optional} {disabled} {error} testId={`${testId}.Label`} {v2} {value} />
  {/if}
  <div class="input-container flex-col">
    <textarea
      bind:this={ref}
      on:input={handleChange}
      data-testId={testId}
      class:error={!!error}
      class:monospace
      {placeholder}
      {minlength}
      {maxlength}
      {required}
      {disabled}
      {value}
      {name}
    />
  </div>

  {#if error}
    <span class="error-text" data-testId={`${testId}.Error`}>{error}</span>
  {/if}
</label>

<style>
  .input-label {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 0.5rem;
  }
  .input-container {
    position: relative;
  }
  textarea {
    border-radius: 0.75rem;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    background-color: var(--header-background-color);
    color: var(--text-color);
    outline: none;
    resize: vertical;
    font-size: 1rem;
    font-family: unset;
    min-height: 40px;
  }
  textarea.monospace {
    font-family: monospace;
  }
  textarea:focus {
    border: 1px solid var(--active-color);
  }
  textarea.error {
    color: var(--red-color);
    border: 1px solid var(--red-color);
  }
  textarea:disabled {
    color: var(--secondary-text-color);
  }
  :global(body.dark-mode textarea) {
    color-scheme: dark;
  }
  .error-text {
    font-size: 0.8rem;
    color: var(--red-color);
  }
</style>
