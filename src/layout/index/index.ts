import tpl from './tpl.ts';
import Block from '../../services/Block.ts';
import Nav from '../../components/nav/index.ts';

const NavElement = new Nav().getContent().outerHTML;

export default class Index extends Block {
  constructor(tag: string | undefined, props = {}) {
    super(tag, props);
  }

  render() {
    return this.compile(tpl, {
      ...this._props,
      nav: NavElement,
    });
  }
}
