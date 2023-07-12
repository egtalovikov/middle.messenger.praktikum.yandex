import Index from './layout/index';
import Home from './pages/home';
import Login from './pages/home/modules/login';
import Register from './pages/home/modules/register';
import About from './pages/about';
import ChangePassword from './pages/about/modules/change-password';
import EditProfile from './pages/about/modules/edit-profile';
import InternalServerError from './pages/internal-server-error';
import NotFound from './pages/not-found';
import Router from './utils/Router';
import Store from './services/Store';
import UserGetInfoController from './controllers/user-get-info';
import GetChatsController from './controllers/get-chats';
import GetChatTokenController from './controllers/get-chat-token';
import { setMessages, setSocket } from './services/Store/Actions';

const UserGetInfo = new UserGetInfoController();

const GetChats = new GetChatsController();

export const router = new Router(".app");

UserGetInfo.getInfo()
GetChats.getChats();
Store.getState().chats?.forEach((chat: { id: string | number; }) => {
	router.use(`/messenger/${chat.id}`, Index, 'main', {
		content: new Home(chat)
	})
	new GetChatTokenController().getChatToken(chat.id)
		.then(token => {
			const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${Store.getState().user.id}/${chat.id}/${token}`);
			socket.addEventListener('open', () => {
				socket.send(JSON.stringify({
					content: '0',
					type: 'get old',
				}))
			})
			socket.addEventListener('message', event => {
				setMessages(chat.id, JSON.parse(event.data));
				setSocket(chat.id, socket);
			})
		})
		.catch(err => console.log(err))
})

router.use('/settings', Index, 'main', {
	content: new About(),
})
	.use('/messenger', Index, 'main', {
		content: new Home(),
	})
	.use('/change-password', Index, 'main', {
		content: new ChangePassword(),
	})
	.use('/edit-profile', Index, 'main', {
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
