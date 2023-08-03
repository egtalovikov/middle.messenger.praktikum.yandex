import { BASE_URL } from '../../index.ts';
import Store from './Store.ts';

const store = new Store();

const setUser = (user: any) => {
  store.set('user', {
    ...user,
    avatar: `${BASE_URL}/resources${user.avatar}`,
  });
};

const setAvatar = (avatar: unknown) => {
  store.set('user.avatar', `${BASE_URL}/resources${avatar}`);
};

const setChats = (chats: any) => {
  if (!chats.reason) {
    // eslint-disable-next-line array-callback-return
    chats.map((x: any) => {
      if (x.avatar !== null) {
        // eslint-disable-next-line no-param-reassign
        x.avatar = `${BASE_URL}/resources${x.avatar}`;
      }
    });
    store.set('chats', chats);
  }
};

const setMessages = (chatId: string | number, messages: unknown) => {
  if (!(messages instanceof Array)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const messagesArr = store._state.messages[chatId];
    messagesArr.push(messages);
    store.set(`messages.${chatId}`, messages);
  } else {
    messages.reverse();
    store.set(`messages.${chatId}`, messages);
  }
};

const setSocket = (chatId: unknown, socket: unknown) => {
  store.set(`sockets.${chatId}`, socket);
};

const setPopupText = (status: string) => {
  store.set('popupText', status);
};

export {
  setUser, setAvatar, setChats, setMessages, setSocket, setPopupText,
};
