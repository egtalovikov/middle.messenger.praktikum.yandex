import HTTPTransport from '../../services/HTTPTransport';
import { BaseAPI } from '../../api/base-api';

const chatsAPIInstance = new HTTPTransport();

export default class ChatsAPI extends BaseAPI {
    public request(chatId) {
        return chatsAPIInstance.post(`https://ya-praktikum.tech/api/v2/chats/token/${chatId}`, {
            headers: {
                'Content-type': "application/json",
                "mode": "cors"
            }
        })
            .then((res) => JSON.parse(res.response));
    }
};