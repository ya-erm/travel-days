<script>
  import Checkbox from '$lib/ui/Checkbox.svelte';
  import Layout from '$lib/ui/Layout.svelte';
  import ListGroup from '$lib/ui/list-group/ListGroup.svelte';
  import ListGroupItem from '$lib/ui/list-group/ListGroupItem.svelte';
  import ListInputItem from '$lib/ui/list-group/ListInputItem.svelte';
  import ListLinkItem from '$lib/ui/list-group/ListLinkItem.svelte';
  import ListSelectItem from '$lib/ui/list-group/ListSelectItem.svelte';
  import ListSelectOption from '$lib/ui/list-group/ListSelectOption.svelte';
  import ListSwitchItem from '$lib/ui/list-group/ListSwitchItem.svelte';
  import Portal from '$lib/ui/Portal.svelte';

  let title = true;
  let description = false;

  let switchChecked = false;
  let inputValue = '';

  let portalVisible = false;
</script>

<h2>List Groups</h2>

<div class="mb-1 flex flex-wrap gap-1">
  <Checkbox label="title" bind:checked={title} />
  <Checkbox label="description" bind:checked={description} />
</div>

<ListGroup title={title ? 'List Group' : null}>
  <ListGroupItem>
    <div class="px-0.5">ListGroupItem</div>
  </ListGroupItem>
  <ListSelectItem title="ListSelectItem" value="value" onClick={() => (portalVisible = true)} />
  <ListSwitchItem title="ListSwitchItem" bind:checked={switchChecked} />
  <ListLinkItem title="ListLinkItem" href="#" />
  <ListInputItem placeholder="ListInputItem" bind:value={inputValue} />
  <div slot="description" style:display={!description ? 'none' : undefined}>ListGroup description</div>
</ListGroup>

<Portal visible={portalVisible}>
  <Layout
    header={{
      title: 'Select value',
      backButton: {
        onClick: () => {
          portalVisible = false;
        },
      },
    }}
  >
    <div class="p-1">
      <ListGroup title="List Group">
        <ListSelectOption value="ListSelectOption #1" checked={true} onClick={() => (portalVisible = false)} />
        <ListSelectOption value="ListSelectOption #2" checked={false} onClick={() => (portalVisible = false)} />
      </ListGroup>
    </div>
  </Layout>
</Portal>
