import tpl from "./tpl";
import styles from "./chats.module.scss";
import avatar from "../../../static/profile-avatar.png";
import Message from "./components/message";
import Block from "../../services/Block";
import Handlebars from "handlebars";
import manageUserPopup from "./components/manageUserPopup";

const submitButton = `<button class=${styles.sendButton}></button>`;

export default class Chats extends Block {
  constructor(chat: any) {
    super('div', {
      styles,
      attr: {
        class: styles.wrapper
      },
      name: "Вадим",
      avatar,
      chat,
      addUserPopupComponent: new manageUserPopup(styles.addPopup, styles.addPopupOpened, chat, "Введите ID (добавление)", "Добавить"),
      deleteUserPopupComponent: new manageUserPopup(styles.deletePopup, styles.deletePopupOpened, chat, "Введите ID (удаление)", "Удалить"),
      date: "19 июня",
      submitButton,
      events: {
        click: (e: { stopPropagation: () => void; target: Element | null; }) => {
          e.stopPropagation();
          if (e.target === this._element.querySelector(`.${styles["openMenuButton"]}`)) {
            this._element.querySelector(`.${styles.menu}`)?.classList.add(styles.menuActive);
          }
          if (!e.target?.classList.contains(styles.menu) && !e.target?.classList.contains(styles.openMenuButton)) {
            this._element.querySelector(`.${styles.menu}`)?.classList.remove(styles.menuActive);
          }
          if (e.target === this._element.querySelector(`.${styles["addUserMenuButton"]}`)) {
            this._element.querySelector(`.${styles.addPopup}`)?.classList.add(styles.addPopupOpened);
          }
          if (e.target === this._element.querySelector(`.${styles["deleteUserMenuButton"]}`)) {
            this._element.querySelector(`.${styles.deletePopup}`)?.classList.add(styles.deletePopupOpened);
          }
        },
        validate: (e: Event | any) => {
          const el = e instanceof Event ? e.target : e;
          if (el.name !== 'display_name') {
            el.nextElementSibling?.removeAttribute("style");
            let isValid = true;
            this._element.querySelector('button')?.removeAttribute("disabled");
            switch (el.name) {
              case 'email':
                if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(el.value)) {
                  isValid = false;
                  el.nextElementSibling.setAttribute("style", "display:block")
                }
                break;
              case 'login':
                if (!/^[a-zA-Z0-9_-]{3,20}$/.test(el.value)) {
                  isValid = false;
                  el.nextElementSibling.setAttribute("style", "display:block")
                }
                break;
              case 'first_name':
                if (!/^[А-ЯЁA-Z][а-яёa-z\-]*$/.test(el.value)) {
                  isValid = false;
                  el.nextElementSibling.setAttribute("style", "display:block")
                }
                break;
              case 'second_name':
                if (!/^[А-ЯЁA-Z][а-яёa-z\-]*$/.test(el.value)) {
                  isValid = false;
                  el.nextElementSibling.setAttribute("style", "display:block")
                }
                break;
              case 'phone':
                if (!/^\+?[0-9]{10,15}$/.test(el.value)) {
                  isValid = false;
                  el.nextElementSibling.setAttribute("style", "display:block")
                }
                break;
              case 'password':
              case 'oldPassword':
              case 'newPassword':
              case 'confirmNewPassword':
              case 'confirm_password':
                if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,40}$/.test(el.value)) {
                  isValid = false;
                  el.nextElementSibling.setAttribute("style", "display:block")
                }
                break;
              case 'message':
                if (!/.+/.test(el.value)) {
                  isValid = false;
                  el.nextElementSibling.setAttribute("style", "display:block")
                }
                break;
            }
            if (!isValid) {
              this._element.querySelector('button')?.setAttribute("disabled", "true");
            }
            return isValid;
          }
        }
      }
    })
  }

  protected addEvents(): void {
    this._element.querySelector(`.${this._props.styles.input}`)?.addEventListener('focus', (e) => this._props.events?.validate(e));
    this._element.querySelector(`.${this._props.styles.input}`)?.addEventListener('blur', (e) => this._props.events?.validate(e));
    if (this._props.messages && this._props.chat !== undefined) {
      this._element.querySelector(`.${this._props.styles.form}`)?.addEventListener('submit', (e) => {
        e.preventDefault();
          this._props.sockets[this._props.chat.id].send(JSON.stringify({
            content: JSON.stringify(this._element.querySelector(`.${this._props.styles.input}`)?.value),
            type: 'message',
          }))
      })
    }
    super.addEvents();
  }

  protected removeEvents(): void {
    this._element.querySelector(`.${this._props.styles.input}`)?.removeEventListener('focus', (e) => this._props.events?.validate(e));
    this._element.querySelector(`.${this._props.styles.input}`)?.removeEventListener('blur', (e) => this._props.events?.validate(e));
    if (this._props.messages && this._props.chat !== undefined) {
      this._element.querySelector(`.${this._props.styles.form}`)?.removeEventListener('submit', (e) => {
        e.preventDefault();
        if (document.querySelector(`.${this._props.styles.input}`)?.value !== "") {
          this._props.sockets[this._props.chat.id].send(JSON.stringify({
            content: JSON.stringify(this._element.querySelector(`.${this._props.styles.input}`)?.value),
            type: 'message',
          }))
        }
      })
    }
    super.removeEvents();
  }

  render() {
    const messages = this._props.messages && this._props.chat !== undefined ? this._props.messages[this._props.chat.id].map(({ content, user_id, time, is_read } : any) => new Message(
      { message: content.replace(/^.|.$/g,""), owner: this._props.user.id === user_id ? true : false, time: `${new Date(time).getHours()}:${new Date(time).getMinutes()}`, isRead: is_read })).map((x: { getContent: () => { (): any; new(): any; outerHTML: any; }; }) => x.getContent().outerHTML) : [];
    return this.compile(tpl, { ...this._props, form: this._children.form, addUserPopupComponent: this._children.addUserPopupComponent, deleteUserPopupComponent: this._children.deleteUserPopupComponent, messages })
  }
};

Handlebars.registerHelper('isnull', function (value) {
  return value !== null;
});