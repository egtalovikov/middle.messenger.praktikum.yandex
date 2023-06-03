import HTTPTransport from '../../services/HTTPTransport';
import { BaseAPI } from '../../api/base-api';

const homeAPIInstance = new HTTPTransport();

export default class HomeAPI extends BaseAPI {
    public request() {
        return homeAPIInstance.get('https://ya-praktikum.tech/api/v2/chats', {
            headers: {
                'Content-type': "application/json"
            }
        })
            .then((res) => JSON.parse(res.response));
    }

    public create(data) {
        return homeAPIInstance.post('https://ya-praktikum.tech/api/v2/chats', {
            headers: {
                'Content-type': "application/json"
            }, data
        })
            .then((res) => JSON.parse(res.response));
    }
};