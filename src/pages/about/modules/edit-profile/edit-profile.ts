import Handlebars from 'handlebars';
import styles from './edit-profile.module.scss';
import tpl from './tpl.ts';
import avatar from '../../../../../static/profile-avatar.png';
import Button from '../../../../components/button/index.ts';
import Block from '../../../../services/Block.ts';
import Form from '../../../../components/form/index.ts';

const submitButton = new Button('Сохранить');

const inputs = [
  {
    text: 'Почта',
    type: 'email',
    name: 'email',
    errorText: 'Введите корректный email',
  },
  {
    text: 'Логин',
    type: 'text',
    name: 'login',
    errorText: `Логин должен содержать только латинские буквы, 
    цифры, дефис и нижнее подчёркивание. Первый символ - буква`,
  },
  {
    text: 'Имя',
    type: 'text',
    name: 'first_name',
    errorText: 'Поле должно содержать только буквы и дефисы, первая буква должна быть заглавной',
  },
  {
    text: 'Фамилия',
    type: 'text',
    name: 'second_name',
    errorText: 'Поле должно содержать только буквы и дефисы, первая буква должна быть заглавной',
  },
  {
    text: 'Имя в чате',
    type: 'text',
    name: 'display_name',
  },
  {
    text: 'Телефон',
    type: 'phone',
    name: 'phone',
    errorText: 'Телефон должен начинаться с плюса и содержать от 10 до 15 цифр',
  },
];

const form = new Form({
  formClassName: styles.form, inputs, submitButton, convertInputs: true,
});

export default class EditProfile extends Block {
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
    return this.compile(tpl, {
      ...this._props,
      form: this._children.form,
      popup: this._children.popup,
    });
  }
}

Handlebars.registerHelper('iszero', (value) => value !== null);
