import HTTPTransport from '../../../../services/HTTPTransport.ts';
import BaseAPI from '../../../../api/base-api.ts';

const changeAvatarAPIInstance = new HTTPTransport();

export default class changeAvatarAPI extends BaseAPI {
  // eslint-disable-next-line class-methods-use-this
  public update(data: string | FormData) {
    return changeAvatarAPIInstance.put(
      'https://ya-praktikum.tech/api/v2/user/profile/avatar',
      { data },
    )
      .then((res) => JSON.parse(res.response));
  }
}
