import * as styles from "./input.module.scss";
import tmpl from "./input.hbs";

export const input = (name, type, placeholder) => {
  const context = {
    styles,
    name,
    type,
    placeholder
  };

  return tmpl(context);
};
