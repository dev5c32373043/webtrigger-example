<script>
  import { enhance } from '$app/forms';
  import { receptors } from '$lib/stores';

  export let receptor;
  export let editReceptor;

  let requestInAction = false;

  function onRemoval() {
    requestInAction = true;
    return async ({ result, update }) => {
      requestInAction = false;

      const { data } = result;
      if (result.type === 'success') {
        receptors.set($receptors.filter(r => r.id !== data.id));
        return;
      }

      await update();
    };
  }
</script>

<li class="flex items-start gap-4 px-4 py-3 my-3 rounded shadow-md shadow-slate-200">
  <div class="flex items-center self-center text-sky-500">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
      aria-label="Dashboard icon"
      role="graphics-symbol"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
      />
    </svg>
  </div>

  <div class="flex flex-col gap-0 min-h-[2rem] items-start justify-center w-full">
    <h4 class="text-base text-slate-700">{receptor.name}</h4>
    <p class="w-full text-sm truncate text-slate-500">{receptor.description}</p>
  </div>

  <div class="flex justify-center gap-2">
    <form method="POST" action="?/removeReceptor" use:enhance={onRemoval}>
      <input type="hidden" name="id" value={receptor.id} />
      <button class="btn btn-ghost" type="submit" disabled={requestInAction}>
        {#if requestInAction}
          <span class="loading loading-spinner" />
        {/if}
        Remove
      </button>
    </form>

    <button class="btn btn-ghost" on:click={() => editReceptor(receptor)}>Edit</button>
  </div>
</li>
