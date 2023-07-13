/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
import tpl from './tpl.ts';
import Block from '../../services/Block.ts';
import Button from '../button/index.ts';
import UserRegisterController from '../../controllers/user-register.ts';
import UserLoginController from '../../controllers/user-login.ts';
import profileInput from '../profileInput/index.ts';
import connect from '../../services/Store/Connect.ts';
import UserUpdateInfoController from '../../controllers/user-update-info.ts';
import editProfileTpl from './editProfileTpl.ts';
import UserChangeAvatarController from '../../controllers/user-change-avatar.ts';
import UserChangePasswordController from '../../controllers/user-change-password.ts';
import CreateChatController from '../../controllers/create-chat.ts';

interface Props {
    formClassName: string,
    submitButton?: Button | string,
    inputs: any,
    enctype?: string,
    convertInputs?: Boolean,
    disabled?: Boolean,
    disableSubmit?: Boolean,
}

export default class Form extends Block {
  constructor(props: Props) {
    super('form', {
      ...props,
      attr: {
        class: props.formClassName,
        novalidate: true,
        enctype: props.enctype ? props.enctype : 'application/x-www-form-urlencoded',
      },
      inputs: props.convertInputs ? new (connect(
        profileInput,
        (state: { user: any; }) => ({ user: state.user }),
      ))({ inputs: props.inputs, disabled: props.disabled }) : props.inputs,
      submitButton: props.submitButton,
      disableSubmit: props.disableSubmit ? props.disableSubmit : false,
      events: props.disableSubmit ? {
        // eslint-disable-next-line consistent-return
        validate: (e: Event | any) => {
          const el = e instanceof Event ? e.target : e;
          if (el.name !== 'display_name') {
            el.nextElementSibling?.removeAttribute('style');
            let isValid = true;
            this._element.querySelector('button')?.removeAttribute('disabled');
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
              case 'password':
              case 'oldPassword':
              case 'newPassword':
              case 'confirmNewPassword':
              case 'confirm_password':
                if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,40}$/.test(el.value)) {
                  isValid = false;
                  el.nextElementSibling.setAttribute('style', 'display:block');
                }
                break;
              case 'message':
                if (!/.+/.test(el.value)) {
                  isValid = false;
                  el.nextElementSibling.setAttribute('style', 'display:block');
                }
                break;
              default:
                break;
            }
            if (!isValid) {
              this._element.querySelector('button')?.setAttribute('disabled', 'true');
            }
            return isValid;
          }
        },
      } : {
        submit: (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          // eslint-disable-next-line no-undef
          const form = this.getContent() as HTMLFormElement;
          const data: { [key: string]: string } = {};
          for (let i = 0; i < form.elements.length; i += 1) {
            const element : any = form.elements[i];
            if ('name' in element
             && 'value' in element && element.tagName.toLowerCase() !== 'button') {
              this._props.events?.validate(element as any);
              data[element.name as string] = element.value as string;
              if (element.type === 'file') {
                // eslint-disable-next-line prefer-destructuring
                data[element.name as string] = element.files[0];
              }
            }
          }
          if (!this._element.querySelector('button')?.disabled) {
            if (location.pathname === '/sign-up') {
              new UserRegisterController().register({
                login: data.login,
                password: data.password,
                confirm_password: data.confirm_password,
                first_name: data.first_name,
                second_name: data.second_name,
                email: data.email,
                phone: data.phone,
              });
            }
            if (location.pathname === '/') {
              new UserLoginController().login({ login: data.login, password: data.password });
            }
            if (location.pathname === '/edit-profile') {
              new UserUpdateInfoController().updateInfo(data);
            }
            if (location.pathname === '/settings') {
              const formData = new FormData();
              formData.append('avatar', data.avatar);
              new UserChangeAvatarController().changeAvatar(formData);
            }
            if (location.pathname === '/change-password') {
              if (data.newPassword === data.confirmNewPassword) {
                new UserChangePasswordController()
                  .changePassword({ oldPassword: data.oldPassword, newPassword: data.newPassword });
              }
            }
            if (location.pathname === '/messenger') {
              new CreateChatController().createChat(data);
            }
          }
        },
        // eslint-disable-next-line consistent-return
        validate: (e: Event | any) => {
          const el = e instanceof Event ? e.target : e;
          if (el.name !== 'display_name') {
            el.nextElementSibling?.removeAttribute('style');
            let isValid = true;
            this._element.querySelector('button')?.removeAttribute('disabled');
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
              case 'password':
              case 'oldPassword':
              case 'newPassword':
              case 'confirmNewPassword':
              case 'confirm_password':
                if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,40}$/.test(el.value)) {
                  isValid = false;
                  el.nextElementSibling.setAttribute('style', 'display:block');
                }
                break;
              case 'message':
                if (!/.+/.test(el.value)) {
                  isValid = false;
                  el.nextElementSibling.setAttribute('style', 'display:block');
                }
                break;
              default:
                break;
            }
            if (!isValid) {
              this._element.querySelector('button')?.setAttribute('disabled', 'true');
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
    if (this._props.disableSubmit) {
      this._element.removeEventListener('submit', (e) => this._props.events?.submit(e));
    }
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
    if (this._props.convertInputs) {
      return this.compile(editProfileTpl, { ...this._props, inputs: this._children.inputs });
    }
    return this.compile(tpl);
  }
}
