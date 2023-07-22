import HomeAPI from '../pages/home/home.api.ts';
import prepareDataToRequest from '../utils/prepareDataToRequest.ts';
import GetChatsController from './get-chats.ts';

const homeApi = new HomeAPI();

export default class CreateChatController {
  // eslint-disable-next-line class-methods-use-this
  public async createChat(data: { [key: string]: string; }) {
    try {
      await homeApi.create(prepareDataToRequest(data));
      await new GetChatsController().getChats();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}
