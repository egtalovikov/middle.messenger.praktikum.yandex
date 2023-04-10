import * as styles from "./register.module.scss";
import tmpl from "./register.hbs";
import button from "../../../../components/button/index.ts";
import input from "../../../../components/input/index.ts";

export const register = () => {
  const context = {
    styles,
    title: "Регистрация",
    submitButton: button("Зарегистрироваться"),
    registerLink: "/signin",
    registerLinkText: "Войти",
    inputs: [
      input("email", "email", "Почта"),
      input("login", "text", "Логин"),
      input("first_name", "text", "Имя"),
      input("second_name", "text", "Фамилия"),
      input("phone", "tel", "Телефон"),
      input("password", "password", "Пароль"),
      input("confirm_password", "password", "Пароль (ещё раз)"),
    ]
  };

  return tmpl(context);
};
