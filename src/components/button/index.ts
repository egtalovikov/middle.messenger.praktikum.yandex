import styles from "./button.module.scss";
import tpl from "./tpl";
import Block from "../../services/Block";

export default class Button extends Block {
    constructor(text: string) {
        super('button', {
            styles,
            text,
            attr: {
                class: styles.button,
                "aria-label": text,
            }
        })
    }

    render() {
        return this.compile(tpl, this._props);
    }
}
