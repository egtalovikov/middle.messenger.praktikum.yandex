import tpl from './tpl.ts';
import Block from '../../services/Block.ts';

export default class Index extends Block {
  constructor(tag: string | undefined, props = {}) {
    super(tag, props);
  }

  render() {
    return this.compile(tpl, {
      ...this._props,
    });
  }
}
