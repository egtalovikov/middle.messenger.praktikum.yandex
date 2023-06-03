import Block from "../../services/Block";
import tpl from "./tpl";
import styles from "./about.module.scss";
import avatar from "../../../static/profile-avatar.png";
import UserLogoutController from "../../controllers/user-logout";
import Handlebars from "handlebars";
import changeAvatarPopup from "./components/changeAvatarPopup";
import Form from "../../components/form";

const popup = new changeAvatarPopup(styles.popup, styles.popupOpened);

const inputs = [
  {
    type: "email",
    name: "email",
    text: "Почта"
  },
  {
    type: "text",
    name: "login",
    text: "Логин"
  },
  {
    type: "text",
    name: "first_name",
    text: "Имя"
  },
  {
    type: "text",
    name: "second_name",
    text: "Фамилия"
  },
  {
    type: "text",
    name: "display_name",
    text: "Имя в чате"
  },
  {
    type: "phone",
    name: "phone",
    text: "Телефон"
  },
];

const form = new Form({ formClassName: "", inputs, submitButton: "", convertInputs: true, disabled: true });

export default class About extends Block {
  constructor() {
    super('section', {
      styles,
      attr: {
        class: styles.about
      },
      popup,
      avatar,
      form,
      events: {
        click: (e : Event) => {
            e.stopPropagation();
            if (e.target === this._element.querySelector("#logout")) {
              new UserLogoutController().logout();
            }
            if (e.target === this._element.querySelector(`.${styles["change-avatar"]}`)) {
              this._element.querySelector(`.${styles.popup}`)?.classList.add(styles.popupOpened);
            }
        },
    },
    })
  }
    render() {
        return this.compile(tpl, { ...this._props, popup: this._children.popup, form: this._children.form });
    }
}
Handlebars.registerHelper('isnull', function (value) {
    return value !== null;
  });