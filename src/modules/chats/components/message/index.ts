import tpl from './tpl.ts';
import styles from './message.module.scss';
import readMarker from '../../../../../static/read-marker.svg';
import Block from '../../../../services/Block.ts';

interface Props {
  message: string,
  owner: boolean,
  time: string,
  isRead?: boolean
}

export default class Message extends Block {
  constructor(props: Props) {
    super('li', {
      styles,
      attr: {
        class: `${styles.messageBlock} ${props.owner ? styles.messageBlockOwner : ''}`,
      },
      message: props.message,
      owner: props.owner,
      time: props.time,
      isRead: props.isRead,
      readMarker,
    });
  }

  render() {
    return this.compile(tpl, this._props);
  }
}
