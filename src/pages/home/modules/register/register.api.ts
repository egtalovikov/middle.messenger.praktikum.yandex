import HTTPTransport from '../../../../services/HTTPTransport';
import { BaseAPI } from '../../../../api/base-api';

const registerAPIInstance = new HTTPTransport();

export default class RegisterAPI extends BaseAPI {
    public create(user: string) {
        return registerAPIInstance.post('https://ya-praktikum.tech/api/v2/auth/signup', {
            data: user,
            headers: {
                'Content-type': "application/json"
            }})
    }
}
