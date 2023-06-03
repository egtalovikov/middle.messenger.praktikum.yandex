import HomeAPI from "../pages/home/home.api";
import { Actions } from "../services/Store";

const homeApi = new HomeAPI();

export default class GetChatsController {
    public async getChats() {
        try {
           const chats = await homeApi.request();
           Actions.setChats(chats);

        } catch (error) {
            console.log(error);
        }
    }
} 