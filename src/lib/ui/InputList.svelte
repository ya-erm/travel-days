<script lang="ts">
  import Icon from '$lib/ui/Icon.svelte';
  import InputLabel from '$lib/ui/InputLabel.svelte';
  import resizeObserver from '$lib/utils/resizeObserver';
  import ButtonBase from '$lib/ui/ButtonBase.svelte';

  export let label: string | null = null;
  export let placeholder: string | null = null;
  export let required: boolean = false;
  export let optional: boolean = false;
  export let disabled: boolean = false;
  export let id: string | null = null;

  export let value: string | null = null;
  export let onChange: ((value: string) => void) | null = null;
  export let onSelect: ((option: Option | null) => void) | null = null;

  export let icon: string | null = 'mdi:search';
  export let iconRounded = false;
  export let noOptionsText: string | null = null;
  export let error: string | null = null;
  export let clearable = false;

  export let v2 = false;

  type Option = { id: string; icon?: string; title: string; description?: string };

  export let items: Array<Option>;

  let selectedItemId: string | null = null;

  let ref: HTMLInputElement | null = null;

  let listVisible = false;

  const handleChange = (e: Event) => {
    value = (e.target as HTMLInputElement).value;
    onChange?.(value);
  };

  const getOptionId = (optionId: string | null) => (optionId ? `${id}.option.${optionId}` : '');

  const selectOption = (option: Option | undefined) => {
    if (!option) return;
    selectedItemId = option.id;
    document.getElementById(getOptionId(option.id))?.scrollIntoView({ block: 'nearest' });
  };

  const handleConfirm = () => {
    if (selectedItemId) {
      const item = items.find((item) => selectedItemId === item.id);
      if (item) {
        value = item.title;
        onChange?.(item.title);
        listVisible = false;
        onSelect?.(item);
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    let index = items.findIndex((item) => selectedItemId === item.id);
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        index -= 1;
        if (index < 0) index = items.length - 1;
        selectOption(items[index]);
        listVisible = true;
        break;

      case 'ArrowDown':
        e.preventDefault();
        index += 1;
        if (index >= items.length) index = 0;
        selectOption(items[index]);
        listVisible = true;
        break;

      case 'Enter':
        e.preventDefault();
        handleConfirm();
        break;

      case 'Escape':
        e.preventDefault();
        listVisible = false;
        break;
    }
  };

  let startSlot: HTMLElement | null = null;

  const onStartSlotResize = () => {
    const startSlotWidth = startSlot?.getBoundingClientRect().width ?? 0;
    ref?.style.setProperty('padding-left', startSlotWidth ? `${startSlotWidth}px` : '0.75rem');
  };
</script>

<div class="flex-col gap-0.5">
  {#if label}
    <label class="flex-col" for={`${id}.input`}>
      <InputLabel text={label} {optional} {disabled} {error} {v2} {value} id={`${id}.label`} />
    </label>
  {/if}
  <div class="container relative">
    <div
      class="input-container"
      on:focusout={(e) => {
        // @ts-ignore
        if (!e.currentTarget.contains(e.relatedTarget)) {
          listVisible = false;
        }
      }}
    >
      <div class="flex relative">
        <div
          class="start-slot flex items-center"
          bind:this={startSlot}
          use:resizeObserver={{ onResize: onStartSlotResize }}
        >
          <slot name="start" />
          {#if icon}
            <div class="start-icon flex-center" class:error={!!error}>
              <div class="flex-center" class:rounded={iconRounded}>
                <Icon name={icon} />
              </div>
            </div>
          {/if}
        </div>
        <input
          bind:this={ref}
          on:input={handleChange}
          on:keydown={handleKeyDown}
          on:focus={() => (listVisible = true)}
          class="input"
          class:error={!!error}
          class:withIcon={icon}
          {placeholder}
          {required}
          {disabled}
          {value}
          role="combobox"
          aria-autocomplete="list"
          aria-owns={`${id}.list`}
          aria-controls={`${id}.list`}
          aria-activedescendant={getOptionId(selectedItemId)}
          aria-expanded={listVisible}
          aria-labelledby={`${id}.label`}
          id={`${id}.input`}
        />
      </div>
      {#if listVisible}
        <ul class="list" id={`${id}.list`} role="listbox" tabindex="-1">
          {#each items as item (item.id)}
            <li
              role="option"
              class="item w-full"
              id={getOptionId(item.id)}
              aria-selected={selectedItemId === item.id}
              class:selected={selectedItemId === item.id}
            >
              <ButtonBase
                tabindex="-1"
                class="w-full"
                on:click={() => {
                  selectedItemId = item.id;
                  handleConfirm();
                }}
              >
                <div class="flex items-center gap-0.5 text-ellipsis p-0.5">
                  {#if item.icon}
                    <div class="icon flex-center">
                      <Icon name={item.icon} />
                    </div>
                  {/if}
                  <div class="value flex-1 flex gap-0.5">
                    <span>{item.title}</span>
                    {#if item.description}
                      <span class="secondary">{item.description}</span>
                    {/if}
                  </div>
                </div>
              </ButtonBase>
            </li>
          {/each}
        </ul>
        {#if items.length === 0 && noOptionsText}
          <div class="flex items-center gap-0.5 p-0.5 secondary">
            <span>{noOptionsText}</span>
          </div>
        {/if}
      {/if}
    </div>
  </div>
</div>

<style>
  .container {
    min-height: 40px;
  }

  .input-container {
    position: absolute;
    border-radius: 0.75rem;
    border: 1px solid var(--border-color);
    background-color: var(--header-background-color);
    color: var(--text-color);
    width: 100%;
    min-height: 40px;
    overflow: hidden;
  }

  .input-container:focus-within {
    border: 1px solid var(--active-color);
    z-index: 1;
  }

  .input {
    font-size: 1rem;
    width: 100%;
    border: none;
    background-color: transparent;
    color: inherit;
    outline: none;
    padding: 0.75rem;
    position: relative;
  }
  .input.withIcon {
    padding-left: 42px;
  }

  .start-slot {
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
  }
  .start-icon {
    padding: 0.5rem;
    color: var(--secondary-text-color);
  }
  .start-icon > div {
    border: 1px solid transparent;
  }
  .start-icon > div.rounded {
    border-radius: 50%;
    border: 1px solid var(--border-color);
    overflow: hidden;
  }
  .start-icon.error {
    color: var(--red-color);
  }

  .list {
    width: 100%;
    list-style: none;
    padding: 0;
    margin: 0;

    border-top: 1px solid var(--border-color);
    overflow-y: scroll;
    max-height: 150px;
  }

  .selected {
    background-color: var(--active-color);
    color: var(--white-color);
  }

  @media (hover: hover) {
    .item:not(.selected):hover {
      background: var(--hover-background-color);
    }
  }

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

  .secondary {
    color: var(--secondary-text-color);
  }
  .selected .secondary {
    color: var(--white-color);
    opacity: 0.7;
  }
</style>
