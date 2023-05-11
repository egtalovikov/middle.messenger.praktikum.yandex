import styles from "./not-found.module.scss";
import tpl from "./tpl";
import Block from "../../services/Block";

export default class NotFound extends Block {
  render() {
      return this.compile(tpl, {
        styles
      });
  }
}
