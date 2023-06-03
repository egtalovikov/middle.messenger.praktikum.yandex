import tpl from "./tpl";
import styles from "./chats.module.scss";
import avatar from "../../../static/profile-avatar.png";
import Message from "./components/message";
import Block from "../../services/Block";
import Form from "../../components/form";
import Handlebars from "handlebars";
import GetChatTokenController from "../../controllers/get-chat-token";
import manageUserPopup from "./components/manageUserPopup";

const arr = [
  {
    message: "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
    owner: false,
    time: "11:56"
  },
  {
    message: "Круто!",
    owner: true,
    time: "11:56",
    isRead: true
  },
];

const submitButton = `<button class=${styles.sendButton}></button>`;

export default class Chats extends Block {
  constructor(chat) {
    super('div', {
      styles,
      attr: {
        class: styles.wrapper
      },
      name: "Вадим",
      avatar,
      chat,
      addUserPopupComponent: new manageUserPopup(styles.addPopup, styles.addPopupOpened, chat, "Введите ID (добавление)", "Добавить"),
      deleteUserPopupComponent: new manageUserPopup(styles.deletePopup, styles.deletePopupOpened, chat, "Введите ID (удаление)", "Удалить"),
      date: "19 июня",
      messages: arr.map(({ message, owner, time, isRead }) => new Message(
        { message, owner, time, isRead: isRead })).map(x => x.getContent().outerHTML),
      form: new Form({ formClassName: styles.form, inputs: [`<input class=${styles.input} name="message" placeholder="Сообщение" />
      <span class=${styles.error}>Сообщение не должно быть пустым</span>`], submitButton }),
      events: {
        click: (e) => {
          e.stopPropagation();
          if (e.target === this._element.querySelector(`.${styles["openMenuButton"]}`)) {
            this._element.querySelector(`.${styles.menu}`)?.classList.add(styles.menuActive);
          }
          if (!e.target.classList.contains(styles.menu) && !e.target.classList.contains(styles.openMenuButton)) {
            this._element.querySelector(`.${styles.menu}`)?.classList.remove(styles.menuActive);
          }
          if (e.target === this._element.querySelector(`.${styles["addUserMenuButton"]}`)) {
            this._element.querySelector(`.${styles.addPopup}`)?.classList.add(styles.addPopupOpened);
          }
          if (e.target === this._element.querySelector(`.${styles["deleteUserMenuButton"]}`)) {
            this._element.querySelector(`.${styles.deletePopup}`)?.classList.add(styles.deletePopupOpened);
          }
      },
    }
    })
  }

  render() {
    if (this._props.chat?.id) {
      new GetChatTokenController().getChatToken(this._props.chat.id)
      .then(token => {
        const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${this._props.user.id}/${this._props.chat.id}/${token}`);
        socket.addEventListener('message', event => {

        })
      })
      .catch(err => console.log(err))
    }
    return this.compile(tpl, {...this._props, form: this._children.form, addUserPopupComponent: this._children.addUserPopupComponent, deleteUserPopupComponent: this._children.deleteUserPopupComponent })
  }
};

Handlebars.registerHelper('isnull', function (value) {
  return value !== null;
});
