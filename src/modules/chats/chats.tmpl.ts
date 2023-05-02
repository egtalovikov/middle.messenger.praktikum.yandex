import tmpl from "./chats.hbs";
import styles from "./chats.module.scss";
import avatar from "../../../static/profile-avatar.png";
import message from "./components";

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
]

const messages = arr.map(x => message(x));

export const chats = () => {
  const context = {
    styles,
    name: "Вадим",
    avatar,
    date: "19 июня",
    messages
  };

  return tmpl(context);
};
