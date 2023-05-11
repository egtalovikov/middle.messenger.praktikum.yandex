enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
};

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
    return keys.reduce((result, key, index) => {
      return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
  }

type HTTPMethod = (url: string, options?: OptionsWithoutMethod) => Promise<XMLHttpRequest>

class HTTPTransport {
    get: HTTPMethod = (url, options = {}) => (
        this.request(url, {...options, method: METHODS.GET})
      )
      put: HTTPMethod = (url, options = {}) => (
        this.request(url, {...options, method: METHODS.PUT})
      )
      post: HTTPMethod = (url, options = {}) => (
        this.request(url, {...options, method: METHODS.POST})
      )
      delete: HTTPMethod = (url, options = {}) => (
        this.request(url, {...options, method: METHODS.DELETE})
      )

    request(url: string, options: Options = { method: METHODS.GET }): Promise<XMLHttpRequest> {
        const { headers = {}, method, data } = options;

        return new Promise((resolve, reject) => {
            if (!method) {
                reject('No method');
                return;
        }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(
                method, 
                isGet && !!data
                        ? `${url}${queryStringify(data)}`
                        : url,
        );

        Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
        });


            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}
