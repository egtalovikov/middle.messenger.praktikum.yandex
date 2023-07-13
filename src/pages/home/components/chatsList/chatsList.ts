import Handlebars from 'handlebars';
import Block from '../../../../services/Block.ts';
import tpl from './tpl.ts';
import styles from './chatsList.module.scss';
import avatar from '../../../../../static/mock-avatar.svg';
import { router } from '../../../../index.ts';

export default class ChatsList extends Block {
  constructor(chat: any) {
    super('ul', {
      styles,
      attr: {
        class: styles.chats,
      },
      avatar,
      chat,
      events: {
        click: (e: { target: { closest: (arg0: string) => { (): any; new(): any;
          // eslint-disable-next-line no-shadow
          getAttribute: { (arg0: string): any; new(): any; }; }; }; }) => {
          router.go(`/messenger/${e.target.closest('li').getAttribute('data-chat-id')}`);
        },
      },
    });
  }

  render() {
    return this.compile(tpl);
  }
}

Handlebars.registerHelper('deleteFirstAndLast', (str) => str.replace(/^.|.$/g, ''));

Handlebars.registerHelper(
  'getTime',
  (time) => `${new Date(time).getHours()}:${new Date(time).getMinutes()}`,
);
