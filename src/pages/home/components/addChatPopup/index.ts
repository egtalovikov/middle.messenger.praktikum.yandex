import styles from "./addChatPopup.module.scss";
import tpl from "./tpl";
import Button from "../../../../components/button/index";
import Block from "../../../../services/Block";
import Form from "../../../../components/form";

const submitButton = new Button("Сохранить");

const inputs = [
    `<input class=${styles.input} name="title">`
];

const form = new Form({ formClassName: styles.form, inputs, submitButton })


export default class addChatPopup extends Block {
  constructor(popupStyle: any, popupOpenedStyle: string) {
    super('div', {
      styles,
      attr: {
        class: popupStyle
      },
      form,
      events: {
        click: (e: { target: { classList: { contains: (arg0: any) => any; }; }; }) => {
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
