import HTTPTransport from '../../../../services/HTTPTransport.ts';
import BaseAPI from '../../../../api/base-api.ts';
import { BASE_URL } from '../../../../index.ts';

const registerAPIInstance = new HTTPTransport();

export default class RegisterAPI extends BaseAPI {
  // eslint-disable-next-line class-methods-use-this
  public create(user: string) {
    return registerAPIInstance.post(`${BASE_URL}/auth/signup`, {
      data: user,
      headers: {
        'Content-type': 'application/json',
      },
    });
  }
}
