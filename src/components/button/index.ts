import styles from './button.module.scss';
import tpl from './tpl.ts';
import Block from '../../services/Block.ts';

export default class Button extends Block {
  constructor(text: string, events?: {}) {
    super('button', {
      styles,
      text,
      attr: {
        class: styles.button,
        'aria-label': text,
        id: 'submitButton',
      },
      events,
    });
  }

  render() {
    return this.compile(tpl, this._props);
  }
}
