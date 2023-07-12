import Store from './Store';

const store = new Store();

const setUser = (user: any) => {
    store.set('user', {...user, avatar: `https://ya-praktikum.tech/api/v2/resources${user.avatar}`});
}

const setAvatar = (avatar: any) => {
    store.set('user.avatar', `https://ya-praktikum.tech/api/v2/resources${avatar}`);
}

const setChats = (chats: any) => {
    if (chats.reason) {
        return;
    } else { 
        chats.map(x => {
            if (x.avatar !== null) {
                x.avatar = `https://ya-praktikum.tech/api/v2/resources${x.avatar}`;
            }
        })
        store.set('chats', chats)
    }
}

const setMessages = (chatId: string | number, messages: any) => {
    if (!(messages instanceof Array)) {
        let messagesArr = store._state.messages[chatId];
        messagesArr.push(messages);
        store.set(`messages.${chatId}`, messages);
    } else {
        messages.reverse();
        store.set(`messages.${chatId}`, messages);
    }
}

const setSocket = (chatId: any, socket: unknown) => {
    store.set(`sockets.${chatId}`, socket)
}

export { setUser, setAvatar, setChats, setMessages, setSocket };
