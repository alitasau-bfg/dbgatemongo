<script lang="ts" context="module">
  function getExpandIcon(expandable, subItemsComponent, isExpanded, expandIconFunc) {
    if (!subItemsComponent) return null;
    if (!expandable) return 'icon invisible-box';
    return expandIconFunc(isExpanded);
  }
</script>

<script lang="ts">
  import { tick } from 'svelte';
  import { plusExpandIcon } from '../icons/expandIcons';

  export let isHidden;
  export let filter;
  export let module;
  export let data;
  export let subItemsComponent;
  export let expandOnClick;
  export let isExpandable = undefined;
  export let expandIconFunc = plusExpandIcon;
  export let checkedObjectsStore = null;
  export let disableContextMenu = false;
  export let isExpandedBySearch = false;
  export let passProps;

  let isExpanded = false;

  async function handleExpand() {
    if (subItemsComponent && expandOnClick) {
      await tick();
      isExpanded = !isExpanded;
    }
  }

  function handleExpandButton() {
    isExpanded = !isExpanded;
  }

  $: expandable = data && isExpandable && isExpandable(data);

  $: if (!expandable && isExpanded) isExpanded = false;
</script>

{#if !isHidden}
  <svelte:component
    this={module.default}
    {data}
    on:click={handleExpand}
    on:expand={handleExpandButton}
    expandIcon={getExpandIcon(!isExpandedBySearch && expandable, subItemsComponent, isExpanded, expandIconFunc)}
    {checkedObjectsStore}
    {module}
    {disableContextMenu}
    {passProps}
  />

  {#if (isExpanded || isExpandedBySearch) && subItemsComponent}
    <div class="subitems">
      <svelte:component this={subItemsComponent} {data} {filter} {passProps} />
    </div>
  {/if}
{/if}

<style>
  .subitems {
    margin-left: 28px;
  }
</style>
