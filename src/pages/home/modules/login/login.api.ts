import HTTPTransport from '../../../../services/HTTPTransport.ts';
import BaseAPI from '../../../../api/base-api.ts';
import UserAPI from '../../../../api/user-api.ts';

const loginAPIInstance = new HTTPTransport();

export default class LoginAPI extends BaseAPI {
  // eslint-disable-next-line class-methods-use-this
  public request(data: string) {
    return loginAPIInstance.post('https://ya-praktikum.tech/api/v2/auth/signin', {
      data,
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(() => new UserAPI().request());
  }
}
