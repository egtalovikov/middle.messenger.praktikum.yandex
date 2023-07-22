/* eslint-disable class-methods-use-this */
import HTTPTransport from '../../services/HTTPTransport.ts';
import BaseAPI from '../../api/base-api.ts';
import { BASE_URL } from '../../index.ts';

const homeAPIInstance = new HTTPTransport();

export default class HomeAPI extends BaseAPI {
  public request() {
    return homeAPIInstance.get(`${BASE_URL}/chats`, {
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => JSON.parse(res.response));
  }

  public create(data: string) {
    return homeAPIInstance.post(`${BASE_URL}/chats`, {
      headers: {
        'Content-type': 'application/json',
      },
      data,
    })
      .then((res) => JSON.parse(res.response));
  }
}
