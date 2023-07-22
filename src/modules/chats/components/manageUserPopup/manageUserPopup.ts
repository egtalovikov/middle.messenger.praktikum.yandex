/* eslint-disable no-undef */
import styles from './manageUserPopup.module.scss';
import tpl from './tpl.ts';
import Button from '../../../../components/button/index.ts';
import Block from '../../../../services/Block.ts';
import Form from '../../../../components/form/index.ts';
import ManageUserController from '../../../../controllers/manage-user.ts';

const submitButton = new Button('Сохранить');

const inputs = [
  '',
];

const form = new Form({ formClassName: styles.form, inputs, submitButton });

export default class ManageUserPopup extends Block {
  constructor(props: {
    popupStyle: unknown;
    popupOpenedStyle: unknown;
    chat: unknown;
    title: unknown;
    buttonText: unknown; }) {
    super('div', {
      styles,
      attr: {
        class: props.popupStyle,
      },
      form,
      chat: props.chat,
      popupStyle: props.popupStyle,
      popupOpenedStyle: props.popupOpenedStyle,
      title: props.title,
      buttonText: props.buttonText,
    });
  }

  protected addEvents(): void {
    document.querySelector(`.${this._props.popupStyle}`)?.addEventListener('click', (e : any) => {
      if (e.target?.classList.contains(this._props.popupStyle)
       || e.target?.classList.contains(styles.closeButton)) {
        document.querySelector(`.${this._props.popupStyle}`)
          ?.classList.remove(this._props.popupOpenedStyle);
      }
    });
    this._element.querySelector('form')?.addEventListener('submit', (e : any) => {
      e.preventDefault();
      e.stopPropagation();
      if (this._props.buttonText === 'Добавить') {
        new ManageUserController()
          .addUser({ users: [Number(e.target?.elements[0].value)], chatId: this._props.chat.id })
          .then(() => {
            document.querySelector(`.${this._props.popupStyle}`)
              ?.classList.add(this._props.popupOpenedStyle);
          });
      }
      if (this._props.buttonText === 'Удалить') {
        new ManageUserController()
          .deleteUser({
            users: [Number(e.target?.elements[0].value)],
            chatId: this._props.chat.id,
          })
          .then(() => {
            document.querySelector(`.${this._props.popupStyle}`)
              ?.classList.add(this._props.popupOpenedStyle);
          });
      }
    });
  }

  render() {
    return this.compile(tpl, { ...this._props, form: this._children.form });
  }
}
