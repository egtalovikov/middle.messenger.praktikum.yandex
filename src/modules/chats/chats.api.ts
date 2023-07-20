import HTTPTransport from '../../services/HTTPTransport.ts';
import BaseAPI from '../../api/base-api.ts';
import { BASE_URL } from '../../index.ts';

const chatsAPIInstance = new HTTPTransport();

export default class ChatsAPI extends BaseAPI {
  // eslint-disable-next-line class-methods-use-this
  public request(chatId: string | undefined) {
    return chatsAPIInstance.post(`${BASE_URL}/chats/token/${chatId}`, {
      headers: {
        'Content-type': 'application/json',
        mode: 'cors',
      },
    })
      .then((res) => JSON.parse(res.response));
  }

  // eslint-disable-next-line class-methods-use-this
  public delete(data: string | undefined) {
    return chatsAPIInstance.delete(`${BASE_URL}/chats`, {
      headers: {
        'Content-type': 'application/json',
        mode: 'cors',
      },
      data,
    })
      .then((res) => JSON.parse(res.response));
  }
}
