import styles from './login.module.scss';
import tpl from './tpl.ts';
import Button from '../../../../components/button/index.ts';
import Block from '../../../../services/Block.ts';
import Form from '../../../../components/form/index.ts';
import Input from '../../../../components/input/index.ts';

const inputs = [
  { name: 'login', type: 'text', placeholder: 'Логин' },
  { name: 'password', type: 'password', placeholder: 'Пароль' },
].map((input) => new Input(input)).map((x) => x.getContent().outerHTML);

const submitButton = new Button('Войти');

const form = new Form({ formClassName: styles.form, inputs, submitButton });

export default class Login extends Block {
  constructor() {
    super('section', {
      form,
    });
  }

  render() {
    return this.compile(tpl, {
      styles,
      title: 'Вход',
      registerLink: '/sign-up',
      registerLinkText: 'Нет аккаунта?',
      form: this._children.form,
    });
  }
}
