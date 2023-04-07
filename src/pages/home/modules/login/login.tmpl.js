import * as styles from "./login.module.scss";
import tmpl from "./login.hbs";
import button from "../../../../components/button/index.js";
import input from "../../../../components/input/index.js";

export const login = () => {
  const context = {
    styles,
    title: "Вход",
    submitButton: button("Войти"),
    registerLink: "/signup",
    registerLinkText: "Нет аккаунта?",
    inputs: [
      input("login", "text", "Логин"),
      input("password", "password", "Пароль"),
    ],
  };

  return tmpl(context);
};
