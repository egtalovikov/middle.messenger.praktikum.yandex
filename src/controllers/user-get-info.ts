import UserAPI from "../api/user-api";
import { Actions } from "../services/Store";

const userApi = new UserAPI();

export default class UserGetInfoController {
    public async getInfo() {
        try {
            await userApi.request()
            .then(user => Actions.setUser(user));
        } catch (error) {
            console.log(error);
        }
    }
} 
