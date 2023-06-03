import Store from './Store';

const store = new Store();

const setUser = user => {
    store.set('user', {...user, avatar: `https://ya-praktikum.tech/api/v2/resources${user.avatar}`});
}

const setAvatar = avatar => {
    store.set('user.avatar', `https://ya-praktikum.tech/api/v2/resources${avatar}`);
}

const setChats = chats => {
    chats.map(x => {
        if (x.avatar !== null) {
            x.avatar = `https://ya-praktikum.tech/api/v2/resources${x.avatar}`;
        }
    })
    store.set('chats', chats)
}

export { setUser, setAvatar, setChats };