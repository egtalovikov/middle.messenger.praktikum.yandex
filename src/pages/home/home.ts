import Block from "../../services/Block";
import tpl from "./tpl";
import styles from "./home.module.scss";
import Chats from "../../modules/chats";
import Form from "../../components/form";
import ChatsList from "./components/chatsList";
import addChatPopup from "./components/addChatPopup";

const popup = new addChatPopup(styles.popup, styles.popupOpened);

export default class Home extends Block {
  constructor(chat) {
    super('section', {
      Chats: new Chats(chat),
      styles,
      attr: {
        class: styles.home
      },
      form: new Form({formClassName: styles.form, inputs: [`<input class=${styles.input} placeholder="Поиск" />`]}),
      chat: chat ? chat : undefined,
      chatsList: new ChatsList(chat),
      popup,
      events: {
        click: (e) => {
          e.stopPropagation();
          if (e.target === this._element.querySelector(`.${styles["addButton"]}`)) {
            this._element.querySelector(`.${styles.popup}`)?.classList.add(styles.popupOpened);
          }
      },
      }
    });
  }

    render() {
        return this.compile(tpl, {...this._props, form: this._children.form, chatsList: this._children.chatsList, popup: this._children.popup, chats: this._children.chats });
    }
}
