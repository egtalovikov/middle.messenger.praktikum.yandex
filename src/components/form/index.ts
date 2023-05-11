import tpl from "./tpl";
import Block from "../../services/Block";
import Button from "../button";

interface Props {
    formClassName: string,
    submitButton?: Button | string,
    inputs: string[]
}

export default class Form extends Block {
    constructor(props: Props) {
        super('form', {
            ...props,
            attr: {
                class: props.formClassName,
                novalidate: true,
            },
            inputs: props.inputs,
            submitButton: props.submitButton,
            events: {
                submit: (e : Event) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const form = this.getContent() as HTMLFormElement;
                    const data: { [key: string]: string } = {};
                    for (let i = 0; i < form.elements.length; i++) {
                        const element = form.elements[i];
                        if ('name' in element && 'value' in element && element.tagName.toLowerCase() !== 'button') {
                            this._props.events?.validate(element as any);
                            data[element.name as string] = element.value as string;
                        }
                    }
                    if (!this._element.querySelector('button')?.disabled) {
                        console.log(data);
                    }
                },
                validate: (e : Event | any) => {
                    const el = e instanceof Event ? e.target : e;
                    if (el.name !== 'display_name') {
                        el.nextElementSibling?.removeAttribute("style");
                        let isValid = true;
                        this._element.querySelector('button')?.removeAttribute("disabled");
                        switch (el.name) {
                            case 'email':
                                if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(el.value)) {
                                    isValid = false;
                                    el.nextElementSibling.setAttribute("style", "display:block")
                                }
                                break;
                            case 'login':
                                if (!/^[a-zA-Z0-9_-]{3,20}$/.test(el.value)) {
                                    isValid = false;
                                    el.nextElementSibling.setAttribute("style", "display:block")
                                }
                                break;
                            case 'first_name':
                                if (!/^[А-ЯЁA-Z][а-яёa-z\-]*$/.test(el.value)) {
                                    isValid = false;
                                    el.nextElementSibling.setAttribute("style", "display:block")
                                }
                                break;
                            case 'second_name':
                                if (!/^[А-ЯЁA-Z][а-яёa-z\-]*$/.test(el.value)) {
                                    isValid = false;
                                    el.nextElementSibling.setAttribute("style", "display:block")
                                }
                                break;
                            case 'phone':
                                if (!/^\+?[0-9]{10,15}$/.test(el.value)) {
                                    isValid = false;
                                    el.nextElementSibling.setAttribute("style", "display:block")
                                }
                                break;
                            case 'password':
                            case 'oldPassword':
                            case 'newPassword':
                            case 'confirmNewPassword':
                            case 'confirm_password':
                                if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,40}$/.test(el.value)) {
                                    isValid = false;
                                    el.nextElementSibling.setAttribute("style", "display:block")
                                }
                                break;
                            case 'message':
                                if (!/.+/.test(el.value)) {
                                    isValid = false;
                                    el.nextElementSibling.setAttribute("style", "display:block")
                                }
                                break;
                        }
                        if (!isValid) {
                            this._element.querySelector('button')?.setAttribute("disabled", "true");
                        }
                        return isValid;
                    }
                },
            },
        })
    }

    addEvents() {
        this._element.querySelectorAll('input').forEach(input => {
            input.addEventListener('focus', (e) => this._props.events?.validate(e))
            input.addEventListener('blur', (e) => this._props.events?.validate(e));
        })
        super.addEvents();
    }

    removeEvents() {
        this._element.querySelectorAll('input').forEach(input => {
            input.removeEventListener('focus', (e) => this._props.events?.validate(e))
            input.removeEventListener('blur', (e) => this._props.events?.validate(e));
        })
        super.removeEvents();
    }

    render() {
        return this.compile(tpl);
    }
}
