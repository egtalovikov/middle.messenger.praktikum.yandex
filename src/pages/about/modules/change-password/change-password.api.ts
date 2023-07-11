import HTTPTransport from '../../../../services/HTTPTransport';
import { BaseAPI } from '../../../../api/base-api';

const changePasswordAPIInstance = new HTTPTransport();

export default class changePasswordAPI extends BaseAPI {
    public update(data: { [key: string]: string; } | string) {
        return changePasswordAPIInstance.put('https://ya-praktikum.tech/api/v2/user/password', {
            data, headers: {
                'Content-type': "application/json"
            }
        })
    }
}
