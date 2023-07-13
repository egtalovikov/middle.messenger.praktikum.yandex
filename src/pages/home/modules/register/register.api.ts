import HTTPTransport from '../../../../services/HTTPTransport.ts';
import BaseAPI from '../../../../api/base-api.ts';

const registerAPIInstance = new HTTPTransport();

export default class RegisterAPI extends BaseAPI {
  // eslint-disable-next-line class-methods-use-this
  public create(user: string) {
    return registerAPIInstance.post('https://ya-praktikum.tech/api/v2/auth/signup', {
      data: user,
      headers: {
        'Content-type': 'application/json',
      },
    });
  }
}
