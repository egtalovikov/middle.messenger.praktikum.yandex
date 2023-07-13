import Handlebars from 'handlebars';
import styles from './input.module.scss';
import tpl from './tpl.ts';
import Block from '../../services/Block.ts';

interface Props {
    name: string,
    type: string,
    placeholder: string
}

export default class Input extends Block {
  constructor({ name, type, placeholder }: Props) {
    super('div', {
      styles,
      attr: {
        class: styles.container,
      },
      name,
      type,
      placeholder,
    });
  }

  render() {
    return this.compile(tpl, this._props);
  }
}

// eslint-disable-next-line func-names
Handlebars.registerHelper('ifCond', function (this : any, v1, v2, options) {
  if (v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});
