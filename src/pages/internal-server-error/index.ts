import * as styles from "./internal-server-error.module.scss";
import tpl from "./tpl";
import Block from "../../services/Block";

export default class InternalServerError extends Block {
  render() {
      return this.compile(tpl, {
        styles
      });
  }
}
