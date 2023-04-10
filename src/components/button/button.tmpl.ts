import * as styles from "./button.module.scss";
import tmpl from "./button.hbs";

export const button = (text) => {
  const context = {
    styles,
    text,
  };

  return tmpl(context);
};
