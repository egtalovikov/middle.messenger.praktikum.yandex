import styles from "./edit-profile.module.scss";
import tpl from "./tpl";
import avatar from "../../../../../static/profile-avatar.png";
import Button from "../../../../components/button/index";
import Block from "../../../../services/Block";
import Form from "../../../../components/form";

const submitButton = new Button("Сохранить");

const inputs = [
  `
  <div class=${styles.infoBlock}>
    <p class=${styles.text}>Почта</p>
    <input type="email" name="email" value="pochta@yandex.ru" class=${styles.input}>
    <span class=${styles.error}>Введите корректный email</span>
  </div>
  `,
  `
  <div class=${styles.infoBlock}>
    <p class=${styles.text}>Логин</p>
    <input type="text" name="login" value="ivanivanov" class=${styles.input}>
    <span class=${styles.error}>Логин должен содержать только латинские буквы, цифры, дефис и нижнее подчёркивание. Первый символ - буква</span>
  </div>
  `,
  `
  <div class=${styles.infoBlock}>
    <p class=${styles.text}>Имя</p>
    <input type="text" name="first_name" value="Иван" class=${styles.input}>
    <span class=${styles.error}>Поле должно содержать только буквы и дефисы, первая буква должна быть заглавной</span>
  </div>
  `,
  `
  <div class=${styles.infoBlock}>
    <p class=${styles.text}>Фамилия</p>
    <input type="text" name="second_name" value="Иванов" class=${styles.input}>
    <span class=${styles.error}>Поле должно содержать только буквы и дефисы, первая буква должна быть заглавной</span>
  </div>
  `,
  `
  <div class=${styles.infoBlock}>
    <p class=${styles.text}>Имя в чате</p>
    <input type="text" name="display_name" value="Иван" class=${styles.input}>
  </div>
  `,
  `
  <div class=${styles.infoBlock}>
    <p class=${styles.text}>Телефон</p>
    <input type="phone" name="phone" value="+79099673030" class=${styles.input}>
    <span class=${styles.error}>Телефон должен начинаться с плюса и содержать от 10 до 15 цифр</span>
  </div>
  `
];

const form = new Form({ formClassName: styles.form, inputs, submitButton });

export default class EditProfile extends Block {
  constructor() {
    super('section', {
      styles,
      attr: {
        class: styles.about
      },
      avatar,
      form
    },
    )
  }
  render() {
    return this.compile(tpl, { ...this._props, form: this._children.form });
  }
}
