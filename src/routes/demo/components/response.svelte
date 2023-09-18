<script>
  import { JSONEditor } from 'svelte-jsoneditor';

  export let json;

  $: content = { json };
</script>

<h2 class="text-4xl font-bold">Response from API</h2>

<div class="flex flex-col h-96 my-8 gap-4">
  <JSONEditor mode="text" mainMenuBar={false} readOnly={true} {content} />
</div>
