import HTTPTransport from '../services/HTTPTransport';
import { BaseAPI } from './base-api';

const userAPIInstance = new HTTPTransport();

export default class UserAPI extends BaseAPI {
    public request() {
        return userAPIInstance.get('https://ya-praktikum.tech/api/v2/auth/user')
            .then((res) => JSON.parse(res.response))
    }

    public async update(data: { [key: string]: string; } | string) {
        const res = await userAPIInstance.put('https://ya-praktikum.tech/api/v2/user/profile', {
            data,
            headers: {
                'Content-type': "application/json"
            }
        });
        return JSON.parse(res.response);
    }
};
