import styles from './addChatPopup.module.scss';
import tpl from './tpl.ts';
import Button from '../../../../components/button/index.ts';
import Block from '../../../../services/Block.ts';
import Form from '../../../../components/form/index.ts';

const submitButton = new Button('Сохранить');

const inputs = [
  `<input class=${styles.input} name="title">`,
];

const form = new Form({ formClassName: styles.form, inputs, submitButton });

export default class addChatPopup extends Block {
  constructor(popupStyle: any, popupOpenedStyle: string) {
    super('div', {
      styles,
      attr: {
        class: popupStyle,
      },
      form,
      events: {
        click: (e: { target: { classList: { contains: (arg0: any) => any; }; }; }) => {
          if (e.target.classList.contains(popupStyle)
          || e.target.classList.contains(styles.closeButton)) {
            // eslint-disable-next-line no-undef
            document.querySelector(`.${popupStyle}`)?.classList.remove(popupOpenedStyle);
          }
        },
      },
    });
  }

  render() {
    return this.compile(tpl, { ...this._props, form: this._children.form });
  }
}
