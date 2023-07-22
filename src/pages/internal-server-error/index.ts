import styles from './internal-server-error.module.scss';
import tpl from './tpl.ts';
import Block from '../../services/Block.ts';

export default class InternalServerError extends Block {
  render() {
    return this.compile(tpl, {
      styles,
    });
  }
}
