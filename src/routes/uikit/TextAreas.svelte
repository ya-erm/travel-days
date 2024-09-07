<script lang="ts">
  import Checkbox from '$lib/ui/Checkbox.svelte';
  import TextArea from '$lib/ui/TextArea.svelte';

  let v2 = false;
  let monospace = false;
  let disabled = false;
</script>

<h2>TextArea</h2>
<div class="flex-col gap-1">
  <div class="flex gap-1">
    <Checkbox label="v2" bind:checked={v2} />
    <Checkbox label="disabled" bind:checked={disabled} />
    <Checkbox label="monospace" bind:checked={monospace} />
  </div>
  <TextArea value="" placeholder="Placeholder" {v2} {monospace} {disabled} />
  <TextArea label="Label" value="Value" {v2} {monospace} {disabled} />
  <TextArea label="Error" value="Value" error="Error text example" {v2} {monospace} {disabled} />
</div>
