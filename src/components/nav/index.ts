import Block from "../../services/Block";
import tpl from "./tpl";
import styles from "./nav.module.scss";

export default class Nav extends Block {
    constructor() {
        super('nav', {
            styles,
            attr: {
                class: styles.nav
            }
        })
    }
    render() {
        return this.compile(tpl, this._props)
    }
};
