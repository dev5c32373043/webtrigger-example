import { WEBHOOK_SERVICE_URL, WEBHOOK_SERVICE_TOKEN } from '$env/static/private';

import { FetchWrapper } from '../../utils/request';

const webhookRequest = new FetchWrapper();

webhookRequest.reqInterceptor(opts => {
  opts.path = `${WEBHOOK_SERVICE_URL}${opts.path}`;
  opts.headers['access-token'] = WEBHOOK_SERVICE_TOKEN;
});

export default webhookRequest;
