<script>
  import { setContext } from 'svelte';

  import { receptors } from '$lib/stores';

  import ReceptorDialog from './components/receptor-dialog';
  import ReceptorList from './components/receptor-list';

  /** @type {import('./$types').PageData} */
  export let data;

  let receptorDialogRef = null;

  function editReceptor(item) {
    receptorDialogRef.showDialog(item);
  }

  $: receptors.set(data.receptors);
  setContext('receptors', receptors);
</script>

<div class="max-w-md text-center">
  <h3 class="text-3xl font-bold">Receptors</h3>
  <p class="py-4">
    Automate anything with the power of this brand-new feature. You can easily create a special bond with your data.
  </p>
  <button class="btn" on:click={() => receptorDialogRef.showDialog()}>add receptor</button>
</div>

<ReceptorList {editReceptor} />
<ReceptorDialog bind:this={receptorDialogRef} />
