import HTTPTransport from '../../../../services/HTTPTransport.ts';
import BaseAPI from '../../../../api/base-api.ts';

const changePasswordAPIInstance = new HTTPTransport();

export default class changePasswordAPI extends BaseAPI {
  // eslint-disable-next-line class-methods-use-this
  public update(data: { [key: string]: string; } | string) {
    return changePasswordAPIInstance.put('https://ya-praktikum.tech/api/v2/user/password', {
      data,
      headers: {
        'Content-type': 'application/json',
      },
    });
  }
}
