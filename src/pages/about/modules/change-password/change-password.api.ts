import HTTPTransport from '../../../../services/HTTPTransport.ts';
import BaseAPI from '../../../../api/base-api.ts';
import { BASE_URL } from '../../../../index.ts';

const changePasswordAPIInstance = new HTTPTransport();

export default class changePasswordAPI extends BaseAPI {
  // eslint-disable-next-line class-methods-use-this
  public update(data: { [key: string]: string; } | string) {
    return changePasswordAPIInstance.put(`${BASE_URL}/user/password`, {
      data,
      headers: {
        'Content-type': 'application/json',
      },
    });
  }
}
