import HomeAPI from "../pages/home/home.api";
import prepareDataToRequest from "../utils/prepareDataToRequest";
import GetChatsController from "./get-chats";

const homeApi = new HomeAPI();

export default class CreateChatController {
    public async createChat(data) {
        try {
            await homeApi.create(prepareDataToRequest(data));
            await new GetChatsController().getChats();

        } catch (error) {
            console.log(error);
        }
    }
} 