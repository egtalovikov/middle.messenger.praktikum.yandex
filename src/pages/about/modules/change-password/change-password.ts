import styles from './change-password.module.scss';
import tpl from './tpl.ts';
import avatar from '../../../../../static/profile-avatar.png';
import Button from '../../../../components/button/index.ts';
import Block from '../../../../services/Block.ts';
import Form from '../../../../components/form/index.ts';

const submitButton = new Button('Сохранить');

const inputs = [
  `
    <div class=${styles.infoBlock}>
        <p class=${styles.text}>Старый пароль</p>
        <input type="password" name="oldPassword" value="•••••••••" class=${styles.input}>
        <span class=${styles.error}>
        Пароль должен содержать от 8 до 40 символов, хотя бы одну заглавную букву и цифру</span>
    </div>
    `,
  `
    <div class=${styles.infoBlock}>
        <p class=${styles.text}>Новый пароль</p>
        <input type="password" name="newPassword" value="•••••••••••" class=${styles.input}>
        <span class=${styles.error}>
        Пароль должен содержать от 8 до 40 символов, хотя бы одну заглавную букву и цифру</span>
    </div>
    `,
  `
    <div class=${styles.infoBlock}>
        <p class=${styles.text}>Повторите новый пароль</p>
        <input type="password" name="confirmNewPassword" value="•••••••••••" class=${styles.input}>
        <span class=${styles.error}>
        Пароль должен содержать от 8 до 40 символов, хотя бы одну заглавную букву и цифру</span>
    </div>
    `,
];

const form = new Form({ formClassName: styles.form, inputs, submitButton });

export default class ChangePassword extends Block {
  constructor() {
    super('section', {
      styles,
      attr: {
        class: styles.about,
      },
      avatar,
      form,
    });
  }

  render() {
    return this.compile(tpl, { ...this._props, form: this._children.form });
  }
}
