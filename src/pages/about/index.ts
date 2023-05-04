import Block from "../../services/Block";
import tpl from "./tpl";
import styles from "./about.module.scss";
import avatar from "../../../static/profile-avatar.png"

export default class About extends Block {
  constructor() {
    super('section', {
      styles,
      attr: {
        class: styles.about
      },
      name: "Иван",
      inputs: [
        {
          type: "email",
          name: "email",
          value: "pochta@yandex.ru",
          text: "Почта"
        },
        {
          type: "text",
          name: "login",
          value: "ivanivanov",
          text: "Логин"
        },
        {
          type: "text",
          name: "first_name",
          value: "Иван",
          text: "Имя"
        },
        {
          type: "text",
          name: "second_name",
          value: "Иванов",
          text: "Фамилия"
        },
        {
          type: "text",
          name: "display_name",
          value: "Иван",
          text: "Имя в чате"
        },
        {
          type: "phone",
          name: "phone",
          value: "+7 (909) 967 30 30",
          text: "Телефон"
        },
      ],
      avatar
    })
  }
    render() {
        return this.compile(tpl, this._props);
    }
}
