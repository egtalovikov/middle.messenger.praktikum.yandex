import Index from './layout/index/index.ts';
import Home from './pages/home/index.ts';
import Login from './pages/home/modules/login/index.ts';
import Register from './pages/home/modules/register/index.ts';
import About from './pages/about/index.ts';
import ChangePassword from './pages/about/modules/change-password/index.ts';
import EditProfile from './pages/about/modules/edit-profile/index.ts';
import InternalServerError from './pages/internal-server-error/index.ts';
import NotFound from './pages/not-found/index.ts';
import Router from './utils/Router.ts';
import Store from './services/Store/index.ts';
import UserGetInfoController from './controllers/user-get-info.ts';
import GetChatsController from './controllers/get-chats.ts';
import GetChatTokenController from './controllers/get-chat-token.ts';
import { setMessages, setSocket } from './services/Store/Actions.ts';

export const BASE_URL = 'https://ya-praktikum.tech/api/v2';

const UserGetInfo = new UserGetInfoController();

const GetChats = new GetChatsController();

// eslint-disable-next-line import/prefer-default-export
export const router = new Router('.app');

UserGetInfo.getInfo();
GetChats.getChats();
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Store.getState().chats?.forEach((chat: { id: string | number; }) => {
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

router.use('/settings', Index, 'main', {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
  content: new About(),
})
  .use('/messenger', Index, 'main', {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    content: new Home(),
  })
  .use('/change-password', Index, 'main', {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    content: new ChangePassword(),
  })
  .use('/edit-profile', Index, 'main', {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    content: new EditProfile(),
  })
  .use('/', Index, 'main', {
    content: new Login(),
  })
  .use('/sign-up', Index, 'main', {
    content: new Register(),
  })
  .use('/not-found', Index, 'main', {
    content: new NotFound(),
  })
  .use('/internal-server-error', Index, 'main', {
    content: new InternalServerError(),
  })
  .start();
