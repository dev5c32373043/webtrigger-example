<script>
  import ValueInput from './value-input';
  import opByType from './op-by-type';

  export let rule;
  export let removeRule;

  function onPropTypeChange(ev) {
    rule = { ...rule, propType: ev.target.value, value: '' };
  }

  $: availableOps = Object.entries(opByType[rule.propType]);
</script>

<div class="inline-flex my-2 gap-2">
  <select
    name="propType"
    class="select select-bordered select-sm w-full max-w-xs"
    value={rule.propType}
    on:change={onPropTypeChange}
  >
    <option value="string">string</option>
    <option value="number">number</option>
    <option value="boolean">boolean</option>
    <option value="date">date</option>
  </select>

  <input
    name="key"
    type="rule.text"
    placeholder="key"
    class="input input-bordered input-sm w-full"
    bind:value={rule.key}
  />

  <select name="op" class="select select-bordered select-sm w-full max-w-xs" bind:value={rule.op}>
    {#each availableOps as [opValue, opKey] (opValue)}
      <option value={opValue}>{opKey}</option>
    {/each}
  </select>

  <ValueInput propType={rule.propType} bind:value={rule.value} />

  <button class="btn btn-square btn-sm btn-outline" on:click={() => removeRule(rule.id)}>
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
      ><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg
    >
  </button>
</div>
