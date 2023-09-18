<script>
  export let propType;
  export let value;
</script>

{#if propType === 'number'}
  <input
    name="value"
    type="number"
    step="0.01"
    placeholder="value"
    class="input input-bordered input-sm w-full"
    bind:value
  />
{:else if propType === 'boolean'}
  <div class="form-control justify-center w-80">
    <input type="checkbox" class="checkbox" bind:checked={value} />
  </div>
{:else if propType === 'date'}
  <input name="value" type="date" placeholder="value" class="input input-bordered input-sm w-full" bind:value />
{:else}
  <input name="value" type="text" placeholder="value" class="input input-bordered input-sm w-full" bind:value />
{/if}
