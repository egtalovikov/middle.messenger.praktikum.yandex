import Handlebars from 'handlebars';
import Block from '../../services/Block.ts';
import tpl from './tpl.ts';
import styles from './about.module.scss';
import avatar from '../../../static/profile-avatar.png';
import UserLogoutController from '../../controllers/user-logout.ts';
import ChangeAvatarPopup from './components/changeAvatarPopup/index.ts';
import Form from '../../components/form/index.ts';

const popup = new ChangeAvatarPopup(styles.popup, styles.popupOpened);

const inputs = [
  {
    type: 'email',
    name: 'email',
    text: 'Почта',
  },
  {
    type: 'text',
    name: 'login',
    text: 'Логин',
  },
  {
    type: 'text',
    name: 'first_name',
    text: 'Имя',
  },
  {
    type: 'text',
    name: 'second_name',
    text: 'Фамилия',
  },
  {
    type: 'text',
    name: 'display_name',
    text: 'Имя в чате',
  },
  {
    type: 'phone',
    name: 'phone',
    text: 'Телефон',
  },
];

const form = new Form({
  formClassName: '', inputs, submitButton: '', convertInputs: true, disabled: true,
});

export default class About extends Block {
  constructor() {
    super('section', {
      styles,
      attr: {
        class: styles.about,
      },
      popup,
      avatar,
      form,
      events: {
        click: (e : Event) => {
          e.stopPropagation();
          if (e.target === this._element.querySelector('#logout')) {
            new UserLogoutController().logout();
            // eslint-disable-next-line no-undef
            localStorage.clear();
          }
          if (e.target === this._element.querySelector(`.${styles['change-avatar']}`)) {
            this._element.querySelector(`.${styles.popup}`)?.classList.add(styles.popupOpened);
          }
        },
      },
    });
  }

  render() {
    return this.compile(tpl, {
      ...this._props,
      popup: this._children.popup,
      form: this._children.form,
    });
  }
}
Handlebars.registerHelper('isnull', (value) => value !== null);
