import HTTPTransport from '../../services/HTTPTransport.ts';
import BaseAPI from '../../api/base-api.ts';

const chatsAPIInstance = new HTTPTransport();

export default class ChatsAPI extends BaseAPI {
  // eslint-disable-next-line class-methods-use-this
  public request(chatId: string | undefined) {
    return chatsAPIInstance.post(`https://ya-praktikum.tech/api/v2/chats/token/${chatId}`, {
      headers: {
        'Content-type': 'application/json',
        mode: 'cors',
      },
    })
      .then((res) => JSON.parse(res.response));
  }
}
