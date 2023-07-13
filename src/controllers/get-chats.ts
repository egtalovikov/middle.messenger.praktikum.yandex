import HomeAPI from '../pages/home/home.api.ts';
import { Actions } from '../services/Store/index.ts';

const homeApi = new HomeAPI();

export default class GetChatsController {
  // eslint-disable-next-line class-methods-use-this
  public async getChats() {
    try {
      const chats = await homeApi.request();
      Actions.setChats(chats);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}
