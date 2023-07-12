import styles from "./manageUserPopup.module.scss";
import tpl from "./tpl";
import Button from "../../../../components/button/index";
import Block from "../../../../services/Block";
import Form from "../../../../components/form";
import ManageUserController from "../../../../controllers/manage-user";

const submitButton = new Button("Сохранить");

const inputs = [
    ``
];

const form = new Form({ formClassName: styles.form, inputs, submitButton })


export default class manageUserPopup extends Block {
  constructor(popupStyle: any, popupOpenedStyle: any, chat: any, title: string, buttonText: string) {
    super('div', {
      styles,
      attr: {
        class: popupStyle
      },
      form,
      chat,
      popupStyle,
      popupOpenedStyle,
      title,
      buttonText
    }
    )
  }

  protected addEvents(): void {
    document.querySelector(`.${this._props.popupStyle}`)?.addEventListener('click', (e : any) => {
      if (e.target?.classList.contains(this._props.popupStyle) || e.target?.classList.contains(styles.closeButton)) {
        document.querySelector(`.${this._props.popupStyle}`)?.classList.remove(this._props.popupOpenedStyle);
      }
    })
    this._element.querySelector('form')?.addEventListener('submit', (e : any) => {
      e.preventDefault();
      e.stopPropagation();
      if (this._props.buttonText === 'Добавить') {
        new ManageUserController().addUser({ users: [Number(e.target?.elements[0].value)], chatId: this._props.chat.id });
      }
      if (this._props.buttonText === 'Удалить') {
        new ManageUserController().deleteUser({ users: [Number(e.target?.elements[0].value)], chatId: this._props.chat.id });
      }
    })
  }

  render() {
    return this.compile(tpl, { ...this._props, form: this._children.form });
  }
}
