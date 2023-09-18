import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';

export const to = async promise => promise.then(data => [null, data]).catch(err => [err]);

export const safeParseJson = (jsonStr, defaultVal = null) => {
  try {
    const json = JSON.parse(jsonStr);
    return json;
  } catch (e) {
    return defaultVal;
  }
};

export const objectDiff = (obj1, obj2) => {
  const diff = {};

  for (const key in obj1) {
    if (!isEqual(obj1[key], obj2[key])) {
      diff[key] = obj2[key];
    }
  }

  return diff;
};

export async function fetchWithRetries(fetchFn, maxRetries = 3, retryDelay = 500) {
  if (typeof fetchFn !== 'function') {
    throw new Error('fetchFn must be a function');
  }

  for (let retry = 0; retry < maxRetries; retry++) {
    const [, resp] = await to(fetchFn());
    if (resp?.ok && !isEmpty(resp.data)) return resp.data;

    if (retry < maxRetries - 1) {
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }

  throw new Error(`Request failed after ${maxRetries} retries`);
}
