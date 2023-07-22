import ChatsAPI from '../modules/chats/chats.api.ts';

const chatsApi = new ChatsAPI();

export default class GetChatTokenController {
  // eslint-disable-next-line class-methods-use-this, consistent-return
  public async getChatToken(chatId: any) {
    try {
      const { token } = await chatsApi.request(chatId);
      return token;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}
