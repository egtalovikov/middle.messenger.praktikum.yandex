import { router } from '../index.ts';
import ChatsAPI from '../modules/chats/chats.api.ts';
import prepareDataToRequest from '../utils/prepareDataToRequest.ts';
import GetChatsController from './get-chats.ts';

const chatsApi = new ChatsAPI();

export default class DeleteChatController {
  // eslint-disable-next-line class-methods-use-this
  public async deleteChat(data: { [key: string]: string; }) {
    try {
      await chatsApi.delete(prepareDataToRequest({ chatId: data }));
      await new GetChatsController().getChats();
      router.go('/messenger');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}
