import Block from '../services/Block.ts';
import render from './renderDOM.ts';
import isEqual from './isEqual.ts';

export default class Route {
  _pathname;

  _blockClass: typeof Block;

  _block: Block | null;

  props;

  tag;

  constructor(pathname: string, view: any, tag = 'div', props: Record<string, string> = {}) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this.props = props;
    this.tag = tag;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass(this.tag, this.props);
      render(this.props.rootQuery, this._block);
      return;
    }

    this._block.show();
  }
}
