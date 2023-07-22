import Handlebars from 'handlebars';
import Block from '../../../../services/Block.ts';
import tpl from './tpl.ts';
import styles from './chatsList.module.scss';
import avatar from '../../../../../static/mock-avatar.svg';
import { router } from '../../../../index.ts';

export default class ChatsList extends Block {
  constructor(chat: unknown) {
    super('ul', {
      styles,
      attr: {
        class: styles.chats,
      },
      avatar,
      chat,
      events: {
        click: (e: { target: { closest: (arg0: string) => { (): unknown; new(): unknown;
          // eslint-disable-next-line no-shadow
          getAttribute: { (arg0: string): unknown; new(): unknown; }; }; }; }) => {
          router.go(`/messenger/${e.target.closest('li').getAttribute('data-chat-id')}`);
        },
      },
    });
  }

  render() {
    return this.compile(tpl);
  }
}

Handlebars.registerHelper('deleteFirstAndLast', (str) => {
  if (str !== null) {
    str.replace(/^.|.$/g, '');
  }
});

Handlebars.registerHelper(
  'getTime',
  // eslint-disable-next-line consistent-return
  (time) => {
    if (time !== null) {
      return `${new Date(time).getHours()}:${new Date(time).getMinutes()}`;
    }
    return null;
  },
);
