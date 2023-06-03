import HTTPTransport from '../../../../services/HTTPTransport';
import { BaseAPI } from '../../../../api/base-api';

const addUserPopupAPIInstance = new HTTPTransport();

export default class AddUserPopupAPI extends BaseAPI {
    public update(data) {
        return addUserPopupAPIInstance.put('https://ya-praktikum.tech/api/v2/chats/users', {
            headers: {
                'Content-type': "application/json"
            }, data})
    }
    public delete(data) {
        return addUserPopupAPIInstance.delete('https://ya-praktikum.tech/api/v2/chats/users', {
            headers: {
                'Content-type': "application/json"
            }, data})
    }
};