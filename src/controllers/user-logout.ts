import AboutAPI from "../pages/about/about.api";
import { router } from "..";

const aboutApi = new AboutAPI();

export default class UserLogoutController {
    public async logout() {
        try {
            aboutApi.request();

            router.go('/');

        } catch (error) {
            console.log(error);
        }
    }
} 
