enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
};

type Options = {
    method: METHOD;
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

class HTTPTransport {
    get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHOD.GET });
    };

    post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHOD.POST });
    };

    put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHOD.PUT });
    };
    delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHOD.DELETE });
    };

    request(url: string, options: Options = { method: METHOD.GET }): Promise<XMLHttpRequest> {
        const { headers = {}, method, data } = options;

        return new Promise((resolve, reject) => {
            if (!method) {
                reject('No method');
                return;
        }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHOD.GET;

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
