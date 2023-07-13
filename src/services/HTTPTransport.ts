// eslint-disable-next-line no-shadow
enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

type Options = {
    method: METHODS;
    data?: any;
    headers?: any;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

function queryStringify(data: {[key: string]: string}) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${
    index < keys.length - 1 ? '&' : ''}`, '?');
}

// eslint-disable-next-line no-undef
type HTTPMethod = (url: string, options?: OptionsWithoutMethod) => Promise<XMLHttpRequest>

export default class HTTPTransport {
  get: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: METHODS.GET })
  );

  put: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: METHODS.PUT })
  );

  post: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: METHODS.POST })
  );

  delete: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: METHODS.DELETE })
  );

  // eslint-disable-next-line class-methods-use-this, no-undef
  request(url: string, options: Options = { method: METHODS.GET }): Promise<XMLHttpRequest> {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('No method');
        return;
      }

      // eslint-disable-next-line no-undef
      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && !!data
          ? `${url}${queryStringify(data)}`
          : url,
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      // eslint-disable-next-line func-names
      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      xhr.withCredentials = true;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}
