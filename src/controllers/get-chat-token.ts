import ChatsAPI from "../modules/chats/chats.api";

const chatsApi = new ChatsAPI();

export default class GetChatTokenController {
    public async getChatToken(chatId: any) {
        try {
           const { token } = await chatsApi.request(chatId);
           return token;
        } catch (error) {
            console.log(error);
        }
    }
} 
