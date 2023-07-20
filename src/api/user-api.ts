/* eslint-disable class-methods-use-this */
import { BASE_URL } from '../index.ts';
import HTTPTransport from '../services/HTTPTransport.ts';
import BaseAPI from './base-api.ts';

const userAPIInstance = new HTTPTransport();

export default class UserAPI extends BaseAPI {
  public request() {
    return userAPIInstance.get(`${BASE_URL}/auth/user`)
      .then((res) => JSON.parse(res.response));
  }

  public async update(data: { [key: string]: string; } | string) {
    const res = await userAPIInstance.put(`${BASE_URL}/user/profile`, {
      data,
      headers: {
        'Content-type': 'application/json',
      },
    });
    return JSON.parse(res.response);
  }
}
