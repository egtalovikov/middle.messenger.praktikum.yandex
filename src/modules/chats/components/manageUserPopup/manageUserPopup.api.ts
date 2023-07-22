/* eslint-disable class-methods-use-this */
import HTTPTransport from '../../../../services/HTTPTransport.ts';
import BaseAPI from '../../../../api/base-api.ts';
import { BASE_URL } from '../../../../index.ts';

const manageUserPopupAPIInstance = new HTTPTransport();

export default class ManageUserPopupAPI extends BaseAPI {
  public update(data: string) {
    return manageUserPopupAPIInstance.put(`${BASE_URL}/chats/users`, {
      headers: {
        'Content-type': 'application/json',
      },
      data,
    });
  }

  public delete(data: string) {
    return manageUserPopupAPIInstance.delete(`${BASE_URL}/chats/users`, {
      headers: {
        'Content-type': 'application/json',
      },
      data,
    });
  }
}
