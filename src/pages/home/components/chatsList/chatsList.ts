import Block from "../../../../services/Block";
import tpl from "./tpl";
import styles from "./chatsList.module.scss";
import avatar from "../../../../../static/mock-avatar.svg";
import { router } from "../../../..";

export default class ChatsList extends Block {
  constructor(chat) {
    super('ul', {
      styles,
      attr: {
        class: styles.chats
      },
      avatar,
      chat,
      events: {
        click: (e) => {
          this._element.querySelectorAll(`.${styles.chat}`).forEach(x => x.classList.remove(styles.chatActive))
          e.target.closest('li').classList.add(styles.chatActive)
          router.go(`/messenger/${e.target.closest('li').getAttribute('data-chat-id')}`);
        }
      }
    });
  }

  render() {
    this._props.chats?.map(x => {
      if (this._props.chat?.id === x.id) {
        console.log(this._props.chat?.id)
        console.log(x.id)
        x['chatActive'] = 'active';
      }
    })
    return this.compile(tpl);
  }
}