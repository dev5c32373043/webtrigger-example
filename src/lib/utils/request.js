import isEmpty from 'lodash/isEmpty';

export class FetchWrapper {
  constructor() {
    this.reqInterceptors = [];
    this.resInterceptors = [];
  }

  get(path, opts) {
    return this.perform('GET', path, null, opts);
  }
  post(path, data, opts) {
    return this.perform('POST', path, data, opts);
  }
  put(path, data, opts) {
    return this.perform('PUT', path, data, opts);
  }
  patch(path, data, opts) {
    return this.perform('PATCH', path, data, opts);
  }
  delete(path, opts) {
    return this.perform('DELETE', path, null, opts);
  }

  async perform(method, path, data, extraOpts = {}) {
    const opts = { path, method, ...extraOpts };

    opts.headers ||= {};

    if (!isEmpty(data)) {
      opts.body = JSON.stringify(data);
      opts.headers['Content-Type'] = 'application/json';
    }

    for (const interceptor of this.reqInterceptors) {
      interceptor(opts);
    }

    const resp = await fetch(opts.path, opts);

    for (const interceptor of this.resInterceptors) {
      interceptor(resp);
    }

    const result = { status: resp.status, ok: resp.ok };

    if (resp.headers.get('content-type').includes('application/json')) {
      result.data = await resp.json();
    }

    return result;
  }
  reqInterceptor(fn) {
    this.reqInterceptors.push(fn);
  }
  resInterceptor(fn) {
    this.resInterceptors.push(fn);
  }
}

export const request = new FetchWrapper();
