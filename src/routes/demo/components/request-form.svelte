<script>
  import isEmpty from 'lodash/isEmpty';
  import { JSONEditor, createAjvValidator } from 'svelte-jsoneditor';

  import Response from './response';

  import toast from '$lib/utils/toast';
  import { request, to, fetchWithRetries } from '$lib/utils';

  let respData = null;
  let waitingResponse = false;
  let content = { json: { action: 'test' } };

  async function sendRequest() {
    respData = null;

    const payload = content.json ?? JSON.parse(content.text);
    const [err, resp] = await to(request.post('/demo', payload));
    if (err || !resp.ok) {
      toast.err('Server error. Please try again later.');
      return;
    }

    waitingResponse = true;

    const fetchResponse = () => request.get('/demo');
    const [fetchErr, data] = await to(fetchWithRetries(fetchResponse, 5, 2500));
    if (fetchErr || isEmpty(data)) {
      waitingResponse = false;
      toast.warn('We received nothing. Please check your receptor & try again.');
      return;
    }

    respData = data;
    waitingResponse = false;
  }

  const validator = createAjvValidator({
    schema: {
      type: 'object',
      properties: {
        action: { type: 'string', minLength: 2 }
      },
      required: ['action'],
      additionalProperties: true
    }
  });
</script>

<div class="flex flex-col h-96 mt-2 mb-8 gap-4">
  <JSONEditor mode="text" mainMenuBar={false} {validator} bind:content />
  <button class="btn btn-neutral w-1/4 self-center" on:click={sendRequest}>Send</button>
</div>

{#if waitingResponse}
  <div class="flex h-96 my-8">
    <h2 class="text-4xl font-bold">
      Waiting for response..<span class="loading loading-ball loading-sm self-start" />
    </h2>
  </div>
{:else if respData}
  <Response json={respData} />
{/if}
