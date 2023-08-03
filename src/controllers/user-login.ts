import { router } from '../index.ts';
import prepareDataToRequest from '../utils/prepareDataToRequest.ts';
import LoginAPI from '../pages/home/modules/login/login.api.ts';
import validateLoginFields from '../utils/validateLoginFields.ts';
import { validateRules } from '../utils/validateRules.ts';
import GetChatsController from './get-chats.ts';
import Store from '../services/Store/index.ts';
import Index from '../layout/index/index.ts';
import Home from '../pages/home/index.ts';
import GetChatTokenController from './get-chat-token.ts';
import { setMessages, setSocket } from '../services/Store/Actions.ts';

const loginApi = new LoginAPI();
const userLoginValidator = validateLoginFields(validateRules);

export default class UserLoginController {
  // eslint-disable-next-line class-methods-use-this, no-undef
  public async login(data: LoginFormModel) {
    try {
      const validateData = userLoginValidator(data);

      if (!validateData.isCorrect) {
        throw new Error('Данные не валидны');
      }

      const user = await loginApi.request(prepareDataToRequest(data));

      if (user.id) {
        router.go('/messenger');
        const GetChats = new GetChatsController();
        GetChats.getChats();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        Store._state.chats?.forEach((chat: { id: string | number; }) => {
          router.use(`/messenger/${chat.id}`, Index, 'main', {
            content: new Home(chat),
          });
          new GetChatTokenController().getChatToken(chat.id)
            .then((token) => {
              // eslint-disable-next-line no-undef
              const socket = new WebSocket(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                `wss://ya-praktikum.tech/ws/chats/${Store.getState().user.id}/${chat.id}/${token}`,
              );
              socket.addEventListener('open', () => {
                socket.send(JSON.stringify({
                  content: '0',
                  type: 'get old',
                }));
              });
              socket.addEventListener('message', (event) => {
                setMessages(chat.id, JSON.parse(event.data));
                setSocket(chat.id, socket);
              });
            })
            // eslint-disable-next-line no-console
            .catch((err) => console.log(err));
        });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}
