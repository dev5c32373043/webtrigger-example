<script>
  import isPlainObject from 'lodash/isPlainObject';
  import isEmpty from 'lodash/isEmpty';

  import Rules from './rules';
  import toast from '$lib/utils/toast';
  import validateReceptor from '$lib/validators/receptor';

  import { enhance } from '$app/forms';
  import { objectDiff } from '$lib/utils';
  import { receptors } from '$lib/stores';

  const formInitState = { name: '', description: '', action: '', actionMethod: 'POST', rules: [] };

  let dialogRef;
  let requestInAction = false;
  let tmpReceptor = null;
  let dialogFormData = { ...formInitState };
  let formErrors = {};

  export const showDialog = tmp => {
    if (isPlainObject(tmp) && !isEmpty(tmp)) {
      dialogFormData = structuredClone(tmp);
      tmpReceptor = tmp;
    }

    dialogRef.showModal();
  };

  export const closeDialog = () => {
    dialogFormData = { ...formInitState };
    dialogRef.close();
  };

  function onSubmit({ formData, cancel }) {
    if (dialogFormData.rules.length > 0) {
      formData.append('rules', JSON.stringify(dialogFormData.rules));
    }

    if (dialogFormData.id) {
      const diff = objectDiff(tmpReceptor, dialogFormData);
      if (isEmpty(diff)) {
        cancel();
        closeDialog();
        return;
      }

      for (const field in dialogFormData) {
        if (diff.hasOwnProperty(field) || field === 'id') continue;
        formData.delete(field);
      }
    }

    const validationMode = dialogFormData.id ? 'partial' : 'default';
    const errors = validateReceptor(dialogFormData, validationMode);
    if (Object.keys(errors).length > 0) {
      formErrors = errors;
      cancel();
      return;
    }

    requestInAction = true;

    return async ({ result }) => {
      requestInAction = false;

      const { data } = result;

      if (result.type === 'success') {
        if (dialogFormData.id) {
          receptors.set($receptors.map(r => (r.id === data.id ? data : r)));
        } else {
          receptors.set([data, ...$receptors]);
        }

        closeDialog();
        return;
      }

      if (result.type === 'failure') {
        if (result.status === 400) {
          formErrors = data.errors;
          return;
        }

        toast.err('Server error. Please try again later.');
      }
    };
  }

  $: action = dialogFormData.id ? '?/updateReceptor' : '?/createReceptor';
</script>

<dialog class="modal modal-bottom sm:modal-middle" bind:this={dialogRef}>
  <form method="POST" class="modal-box sm:max-w-2xl" {action} use:enhance={onSubmit}>
    <h3 class="font-bold text-lg">Receptor</h3>

    <div class="py-4">
      <label class="label" for="receptor-name">
        <span class="label-text">*Name</span>
      </label>
      <input
        id="receptor-name"
        name="name"
        type="text"
        placeholder="Would be nice to have some name"
        class="input input-bordered w-full"
        class:input-error={formErrors.name}
        bind:value={dialogFormData.name}
        required
      />
      {#if formErrors.name}
        <label class="label" for="receptor-name">
          <span class="label-text-alt text-red-600">{formErrors.name}</span>
        </label>
      {/if}
    </div>

    <div class="py-4">
      <label class="label" for="receptor-description">
        <span class="label-text">Description</span>
      </label>
      <textarea
        id="receptor-description"
        name="description"
        class="textarea textarea-bordered w-full"
        placeholder="Enter memorable description"
        class:input-error={true}
        bind:value={dialogFormData.description}
      />
      {#if formErrors.description}
        <label class="label" for="receptor-description">
          <span class="label-text-alt text-red-600">{formErrors.description}</span>
        </label>
      {/if}
    </div>

    <div class="py-4">
      <label class="label" for="receptor-action">
        <span class="label-text">*Action</span>
      </label>
      <input
        id="receptor-action"
        name="action"
        type="text"
        placeholder="Action"
        class="input input-bordered w-full"
        class:input-error={formErrors.action}
        bind:value={dialogFormData.action}
        required
      />
      {#if formErrors.action}
        <label class="label" for="receptor-action">
          <span class="label-text-alt text-red-600">{formErrors.action}</span>
        </label>
      {/if}
    </div>

    <div class="py-4">
      <label class="label" for="receptor-action-url">
        <span class="label-text">*Action URL</span>
      </label>

      <div class="flex gap-2">
        <select
          name="actionMethod"
          class="select select-bordered select-md w-30"
          bind:value={dialogFormData.actionMethod}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PATCH">PATCH</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>

        <input
          id="receptor-action-url"
          name="actionURL"
          type="url"
          placeholder="https://host.com"
          class="input input-bordered w-full"
          class:input-error={formErrors.actionURL}
          bind:value={dialogFormData.actionURL}
          required
        />

        {#if formErrors.actionURL}
          <label class="label" for="receptor-action-url">
            <span class="label-text-alt text-red-600">{formErrors.actionURL}</span>
          </label>
        {/if}
      </div>
    </div>

    <Rules bind:data={dialogFormData.rules} />

    <div class="modal-action">
      <button type="button" class="btn" on:click={closeDialog}>Close</button>
      <button type="submit" class="btn" disabled={requestInAction}>
        {#if requestInAction}
          <span class="loading loading-spinner" />
        {/if}
        Save
      </button>
    </div>

    {#if dialogFormData.id}
      <input type="hidden" name="id" bind:value={dialogFormData.id} />
    {/if}
  </form>
</dialog>
