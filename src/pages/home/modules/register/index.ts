import styles from './register.module.scss';
import tpl from './tpl.ts';
import Button from '../../../../components/button/index.ts';
import Block from '../../../../services/Block.ts';
import Form from '../../../../components/form/index.ts';
import Input from '../../../../components/input/index.ts';

const inputs = [
  { name: 'email', type: 'email', placeholder: 'Почта' },
  { name: 'login', type: 'text', placeholder: 'Логин' },
  { name: 'first_name', type: 'text', placeholder: 'Имя' },
  { name: 'second_name', type: 'text', placeholder: 'Фамилия' },
  { name: 'phone', type: 'tel', placeholder: 'Телефон' },
  { name: 'password', type: 'password', placeholder: 'Пароль' },
  { name: 'confirm_password', type: 'password', placeholder: 'Пароль (ещё раз)' },
].map((input) => new Input(input)).map((x) => x.getContent().outerHTML);

const submitButton = new Button('Зарегистрироваться');

const form = new Form({ formClassName: styles.form, inputs, submitButton });

export default class Register extends Block {
  constructor() {
    super('section', {
      form,
    });
  }

  render() {
    return this.compile(tpl, {
      styles,
      title: 'Регистрация',
      registerLink: '/signin',
      registerLinkText: 'Войти',
      form: this._children.form,
    });
  }
}
