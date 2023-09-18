import pick from 'lodash/pick';

import { fail } from '@sveltejs/kit';
import { safeParseJson, to } from '$lib/utils';
import WebhookRequest from '$lib/server/utils/webhook-request';
import { RECEPTOR_PROPS } from '$lib/constants';

import validateReceptor from '$lib/validators/receptor';

export async function load() {
  const query = new URLSearchParams({
    take: 50,
    orderBy: 'createdAt',
    orderType: 'desc'
  });

  const resp = await WebhookRequest.get(`/receptors?${query}`);
  return { receptors: resp.data };
}

export const actions = {
  async createReceptor({ request }) {
    const formData = await request.formData();
    const receptorData = pick(Object.fromEntries(formData), RECEPTOR_PROPS);
    const payload = { ...receptorData };
    if (formData.has('rules')) {
      payload.rules = safeParseJson(formData.get('rules'), []);
    }

    const errors = validateReceptor(payload);
    if (errors.length > 0) {
      return fail(400, { errors });
    }

    const [err, resp] = await to(WebhookRequest.post('/receptors', payload));
    if (resp?.status === 400) {
      return fail(400, resp.data);
    }

    if (err || resp?.status !== 201) {
      return fail(500, { error: 'Internal server error' });
    }

    return resp.data;
  },

  async updateReceptor({ request }) {
    const formData = await request.formData();
    const id = formData.get('id');
    if (!Number.isFinite(id)) {
      return fail(400, { error: 'id is required' });
    }

    const receptorData = pick(Object.fromEntries(formData), RECEPTOR_PROPS);
    const payload = { ...receptorData };
    if (formData.has('rules')) {
      payload.rules = safeParseJson(formData.get('rules'), []);
    }

    const errors = validateReceptor(payload, 'partial');
    if (errors.length > 0) {
      return fail(400, { errors });
    }

    const [err, resp] = await to(WebhookRequest.patch(`/receptors/${id}`, payload));
    if (resp?.status === 400) {
      return fail(400, resp.data);
    }

    if (err || resp?.status !== 200) {
      return fail(500, { error: 'Internal server error' });
    }

    return resp.data;
  },

  async removeReceptor({ request }) {
    const data = await request.formData();
    const id = parseInt(data.get('id'), 10);

    if (!Number.isFinite(id)) {
      return fail(400, { error: 'id is required' });
    }

    const [err, resp] = await to(WebhookRequest.delete(`/receptors/${id}`));
    if (err || resp.status !== 200) {
      return fail(500, { error: 'Internal server error' });
    }

    return { id };
  }
};
