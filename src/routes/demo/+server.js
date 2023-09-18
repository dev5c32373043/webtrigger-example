import isEmpty from 'lodash/isEmpty';
import { json, error } from '@sveltejs/kit';

import RecentReceivedRequest from '$lib/server/services/recent-demo-request';
import WebhookRequest from '$lib/server/utils/webhook-request';

import { to } from '$lib/utils';
import { HOST_URL } from '$env/static/private';

export async function GET() {
  const reqData = RecentReceivedRequest.get();
  if (!isEmpty(reqData)) {
    RecentReceivedRequest.set(null);
  }

  return json(reqData);
}

export async function POST({ request }) {
  const payload = await request.json();

  if (!payload.action) {
    throw error(400, { error: 'action is required' });
  }

  payload.metadata = {
    actionMethod: 'PATCH',
    actionURL: `${HOST_URL}/demo`
  };

  const [err, resp] = await to(WebhookRequest.post('/events', payload));
  if (err || resp?.status !== 200) {
    throw error(500, { error: 'Internal server error' });
  }

  return json({ ok: true });
}

export async function PATCH({ request }) {
  const payload = await request.json();
  RecentReceivedRequest.set(payload);

  return json({ ok: true });
}
