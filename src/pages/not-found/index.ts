import styles from './not-found.module.scss';
import tpl from './tpl.ts';
import Block from '../../services/Block.ts';

export default class NotFound extends Block {
  render() {
    return this.compile(tpl, {
      styles,
    });
  }
}
