import HTTPTransport from '../services/HTTPTransport';
import { BaseAPI } from './base-api';

const userAPIInstance = new HTTPTransport();

export default class UserAPI extends BaseAPI {
    public request() {
        return userAPIInstance.get('https://ya-praktikum.tech/api/v2/auth/user')
            .then((res) => JSON.parse(res.response));
    }

    public update(data) {
        return userAPIInstance.put('https://ya-praktikum.tech/api/v2/user/profile', {
            data,
            headers: {
                'Content-type': "application/json"
            }
        })
            .then((res) => JSON.parse(res.response))
    }
};