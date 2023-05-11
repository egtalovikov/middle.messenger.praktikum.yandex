import tpl from "./tpl";
import Block from "../../services/Block";
import Nav from "../../components/nav";

const NavElement = new Nav().getContent().outerHTML;

export default class Index extends Block {
    render() {
        return this.compile(tpl, { ...this._props,
            nav: NavElement
        });
    }
}
