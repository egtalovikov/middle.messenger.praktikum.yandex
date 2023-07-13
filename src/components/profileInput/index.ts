/* eslint-disable no-undef */
import Handlebars from 'handlebars';
import styles from './profileInput.module.scss';
import tpl from './tpl.ts';
import Block from '../../services/Block.ts';

interface Props {
    inputs: [],
    disabled: Boolean
}

export default class profileInput extends Block {
  constructor({ inputs, disabled } : Props) {
    super('div', {
      styles,
      inputs,
      disabled,
      events: {
        // eslint-disable-next-line consistent-return
        validate: (e : Event | any) => {
          const el = e instanceof Event ? e.target : e;
          if (el.name !== 'display_name') {
            el.nextElementSibling?.removeAttribute('style');
            let isValid = true;
            document.querySelector('#submitButton')?.removeAttribute('disabled');
            switch (el.name) {
              case 'email':
                if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(el.value)) {
                  isValid = false;
                  el.nextElementSibling.setAttribute('style', 'display:block');
                }
                break;
              case 'login':
                if (!/^[a-zA-Z0-9_-]{3,20}$/.test(el.value)) {
                  isValid = false;
                  el.nextElementSibling.setAttribute('style', 'display:block');
                }
                break;
              case 'first_name':
                if (!/^[А-ЯЁA-Z][а-яёa-z-]*$/.test(el.value)) {
                  isValid = false;
                  el.nextElementSibling.setAttribute('style', 'display:block');
                }
                break;
              case 'second_name':
                if (!/^[А-ЯЁA-Z][а-яёa-z-]*$/.test(el.value)) {
                  isValid = false;
                  el.nextElementSibling.setAttribute('style', 'display:block');
                }
                break;
              case 'phone':
                if (!/^\+?[0-9]{10,15}$/.test(el.value)) {
                  isValid = false;
                  el.nextElementSibling.setAttribute('style', 'display:block');
                }
                break;
              default:
                break;
            }
            if (!isValid) {
              document.querySelector('#submitButton')?.setAttribute('disabled', 'true');
            }
            return isValid;
          }
        },
      },
    });
  }

  addEvents() {
    this._element.querySelectorAll('input').forEach((input) => {
      input.addEventListener('focus', (e) => this._props.events?.validate(e));
      input.addEventListener('blur', (e) => this._props.events?.validate(e));
    });
    super.addEvents();
  }

  removeEvents() {
    this._element.querySelectorAll('input').forEach((input) => {
      input.removeEventListener('focus', (e) => this._props.events?.validate(e));
      input.removeEventListener('blur', (e) => this._props.events?.validate(e));
    });
    super.removeEvents();
  }

  render() {
    return this.compile(tpl, this._props);
  }
}

// eslint-disable-next-line func-names
Handlebars.registerHelper('ifEquals', function (this: any, arg1, arg2, options) {
  return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
});
