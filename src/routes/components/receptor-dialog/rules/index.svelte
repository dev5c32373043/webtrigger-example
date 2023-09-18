<script>
  import Rule from './rule';

  export let data = [];

  function addRule() {
    const emptyRule = { id: Date.now(), propType: 'string', key: '', value: '', op: 'eq' };
    data = [emptyRule, ...data];
  }

  function removeRule(ruleId) {
    data = data.filter(r => r.id !== ruleId);
  }
</script>

<button type="button" class="btn btn-sm mb-2" on:click={addRule}>Add rule</button>

{#each data as rule (rule.id)}
  <Rule bind:rule {removeRule} />
{/each}
