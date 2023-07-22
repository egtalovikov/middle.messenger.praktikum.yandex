import styles from './addChatPopup.module.scss';
import tpl from './tpl.ts';
import Button from '../../../../components/button/index.ts';
import Block from '../../../../services/Block.ts';
import Form from '../../../../components/form/index.ts';

const inputs = [
  `<input class=${styles.input} name="title">`,
];

export default class addChatPopup extends Block {
  constructor(popupStyle: unknown, popupOpenedStyle: string) {
    super('div', {
      styles,
      attr: {
        class: popupStyle,
      },
      form: new Form({ formClassName: styles.form, inputs, submitButton: new Button('Сохранить') }),
      events: {
        click: (e: { target: {
          closest(arg0: unknown): any; classList: { contains: (arg0: unknown) => unknown; };
}; }) => {
          if (e.target.classList.contains(popupStyle)
          || e.target.classList.contains(styles.closeButton)) {
            // eslint-disable-next-line no-undef
            e.target.closest(`.${popupStyle}`).classList.remove(popupOpenedStyle);
          }
        },
      },
    });
  }

  render() {
    return this.compile(tpl, { ...this._props, form: this._children.form });
  }
}
