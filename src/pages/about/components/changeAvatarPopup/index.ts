import styles from './changeAvatarPopup.module.scss';
import tpl from './tpl.ts';
import Button from '../../../../components/button/index.ts';
import Block from '../../../../services/Block.ts';
import Form from '../../../../components/form/index.ts';

const submitButton = new Button('Сохранить');

const inputs = [
  `<input class=${styles.input} type="file" name="avatar">`,
];

const form = new Form({
  formClassName: styles.form, inputs, submitButton, enctype: 'multipart/form-data',
});

export default class changeAvatarPopup extends Block {
  constructor(popupStyle: unknown, popupOpenedStyle: string) {
    super('div', {
      styles,
      attr: {
        class: popupStyle,
      },
      form,
      events: {
        click: (e: { target: { classList: { contains: (arg0: unknown) => unknown; }; }; }) => {
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
