import * as styles from "./change-password.module.scss";
import tmpl from "./change-password.hbs";
import avatar from "../../../../../static/profile-avatar.png";
import button from "../../../../components/button/index.js";

export const changePassword = () => {
  const context = {
    styles,
    inputs: [
      {
        type: "password",
        name: "oldPassword",
        value: "•••••••••",
        text: "Старый пароль"
      },
      {
        type: "password",
        name: "newPassword",
        value: "•••••••••••",
        text: "Новый пароль"
      },
      {
        type: "password",
        name: "confirmNewPassword",
        value: "•••••••••••",
        text: "Повторите новый пароль"
      },
    ],
    submitButton: button("Сохранить"),
    avatar
  };

  return tmpl(context);
};
