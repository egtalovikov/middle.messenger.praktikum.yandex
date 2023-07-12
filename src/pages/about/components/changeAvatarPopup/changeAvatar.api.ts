import HTTPTransport from '../../../../services/HTTPTransport';
import { BaseAPI } from '../../../../api/base-api';

const changeAvatarAPIInstance = new HTTPTransport();

export default class changeAvatarAPI extends BaseAPI {
    public update(data: string | FormData) {
        return changeAvatarAPIInstance.put('https://ya-praktikum.tech/api/v2/user/profile/avatar', { data })
        .then((res) => JSON.parse(res.response));
    }
}
