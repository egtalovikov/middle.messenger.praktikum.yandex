import Block from "../../../../services/Block";
import tpl from "./tpl";
import styles from "./chatsList.module.scss";
import avatar from "../../../../../static/mock-avatar.svg";
import { router } from "../../../..";
import Handlebars from "handlebars";

export default class ChatsList extends Block {
  constructor(chat: any) {
    super('ul', {
      styles,
      attr: {
        class: styles.chats
      },
      avatar,
      chat,
      events: {
        click: (e: { target: { closest: (arg0: string) => { (): any; new(): any; getAttribute: { (arg0: string): any; new(): any; }; }; }; }) => {
          router.go(`/messenger/${e.target.closest('li').getAttribute('data-chat-id')}`);
        }
      }
    });
  }

  render() {
    return this.compile(tpl);
  }
}

Handlebars.registerHelper("deleteFirstAndLast", function(str) {
  return str.replace(/^.|.$/g,"");
});

Handlebars.registerHelper("getTime", function(time) {
  return `${new Date(time).getHours()}:${new Date(time).getMinutes()}`;
});
