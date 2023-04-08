import * as styles from "./edit-profile.module.scss";
import tmpl from "./edit-profile.hbs";
import avatar from "../../../../../static/profile-avatar.png";
import button from "../../../../components/button/index.ts";

export const editProfile = () => {
  const context = {
    styles,
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
    submitButton: button("Сохранить"),
    avatar
  };

  return tmpl(context);
};
