import HTTPTransport from '../../services/HTTPTransport.ts';
import BaseAPI from '../../api/base-api.ts';
import { BASE_URL } from '../../index.ts';

const aboutAPIInstance = new HTTPTransport();

export default class AboutAPI extends BaseAPI {
  // eslint-disable-next-line class-methods-use-this
  public request() {
    return aboutAPIInstance.post(`${BASE_URL}/auth/logout`);
  }
}
