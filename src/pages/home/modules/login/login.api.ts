import HTTPTransport from '../../../../services/HTTPTransport';
import { BaseAPI } from '../../../../api/base-api';
import UserAPI from '../../../../api/user-api';

const loginAPIInstance = new HTTPTransport();

export default class LoginAPI extends BaseAPI {
    public request(data: string) {
        return loginAPIInstance.post('https://ya-praktikum.tech/api/v2/auth/signin', {
            data,
            headers: {
                'Content-type': "application/json"
            }
        })
            .then(() => new UserAPI().request());
    }
}