import HTTPTransport from '../../../../services/HTTPTransport.ts';
import BaseAPI from '../../../../api/base-api.ts';
import { BASE_URL } from '../../../../index.ts';

const changeAvatarAPIInstance = new HTTPTransport();

export default class changeAvatarAPI extends BaseAPI {
  // eslint-disable-next-line class-methods-use-this
  public update(data: string | FormData) {
    return changeAvatarAPIInstance.put(
      `${BASE_URL}/user/profile/avatar`,
      { data },
    )
      .then((res) => JSON.parse(res.response));
  }
}
