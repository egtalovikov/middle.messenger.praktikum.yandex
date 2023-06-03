import styles from "./changeAvatarPopup.module.scss";
import tpl from "./tpl";
import Button from "../../../../components/button/index";
import Block from "../../../../services/Block";
import Form from "../../../../components/form";

const submitButton = new Button("Сохранить");

const inputs = [
    `<input class=${styles.input} type="file" name="avatar">`
];

const form = new Form({ formClassName: styles.form, inputs, submitButton, enctype: 'multipart/form-data' })


export default class changeAvatarPopup extends Block {
  constructor(popupStyle, popupOpenedStyle) {
    super('div', {
      styles,
      attr: {
        class: popupStyle
      },
      form,
      events: {
        click: (e) => {
                if (e.target.classList.contains(popupStyle) || e.target.classList.contains(styles.closeButton)) {
                  document.querySelector(`.${popupStyle}`)?.classList.remove(popupOpenedStyle);
                }
        },
      }
    }
    )
  }
  render() {
    return this.compile(tpl, { ...this._props, form: this._children.form });
  }
}