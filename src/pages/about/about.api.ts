import HTTPTransport from '../../services/HTTPTransport';
import { BaseAPI } from '../../api/base-api';

const aboutAPIInstance = new HTTPTransport();

export default class AboutAPI extends BaseAPI {
    public request() {
        return aboutAPIInstance.post('https://ya-praktikum.tech/api/v2/auth/logout')
    }
}