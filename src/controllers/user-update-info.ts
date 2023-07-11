import UserAPI from "../api/user-api";
import store from "../services/Store/Store";
import prepareDataToRequest from "../utils/prepareDataToRequest";

const userApi = new UserAPI();

export default class UserUpdateInfoController {
    public async updateInfo(data: {[key: string]: string;}) {
        try {
            const user = await userApi.update(prepareDataToRequest(data));
            store.set('user', user);

        } catch (error) {
            console.log(error);
        }
    }
} 
