import tpl from "./tpl";
import styles from "./chats.module.scss";
import avatar from "../../../static/profile-avatar.png";
import Message from "./components/message";
import Block from "../../services/Block";
import Form from "../../components/form";

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

const submitButton = `<button class=${styles.sendButton}></button>`

const form = new Form({ formClassName: styles.form, inputs: [`<input class=${styles.input} name="message" placeholder="Сообщение" />
                                                              <span class=${styles.error}>Сообщение не должно быть пустым</span>`], submitButton })

export default class Chats extends Block {
  constructor() {
    super('div', {
      styles,
      attr: {
        class: styles.wrapper
      },
      name: "Вадим",
      avatar,
      date: "19 июня",
      messages: arr.map(({ message, owner, time, isRead }) => new Message(
        { message, owner, time, isRead: isRead })).map(x => x.getContent().outerHTML),
      form
    })
  }
  render() {
    return this.compile(tpl, {...this._props, form: this._children.form})
  }
};
