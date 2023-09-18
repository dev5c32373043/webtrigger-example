<script>
  import { getContext } from 'svelte';

  import ListItem from './list-item';
  import EmptyData from './empty-data';

  const receptors = getContext('receptors');

  export let editReceptor;
</script>

{#if $receptors.length > 0}
  <ul class="md:w-full lg:w-2/4">
    {#each $receptors as receptor (receptor.id)}
      <ListItem {receptor} {editReceptor} />
    {/each}
  </ul>
{:else}
  <EmptyData />
{/if}
