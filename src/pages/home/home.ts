import Block from '../../services/Block.ts';
import tpl from './tpl.ts';
import styles from './home.module.scss';
import Chats from '../../modules/chats/index.ts';
import Form from '../../components/form/index.ts';
import ChatsList from './components/chatsList/index.ts';
import AddChatPopup from './components/addChatPopup/index.ts';

const popup = new AddChatPopup(styles.popup, styles.popupOpened);

export default class Home extends Block {
  constructor(chat: any) {
    super('section', {
      Chats: new Chats(chat),
      styles,
      attr: {
        class: styles.home,
      },
      form: new Form({
        formClassName: styles.form,
        inputs: [`<input class=${styles.input} placeholder="Поиск" />`],
      }),
      chat: chat || undefined,
      chatsList: new ChatsList(chat),
      popup,
      events: {
        // eslint-disable-next-line no-undef
        click: (e: { stopPropagation: () => void; target: Element | null; }) => {
          e.stopPropagation();
          if (e.target === this._element.querySelector(`.${styles.addButton}`)) {
            this._element.querySelector(`.${styles.popup}`)?.classList.add(styles.popupOpened);
          }
        },
      },
    });
  }

  render() {
    return this.compile(tpl, {
      ...this._props,
      form: this._children.form,
      chatsList: this._children.chatsList,
      popup: this._children.popup,
      chats: this._children.chats,
    });
  }
}
