import * as styles from "./internal-server-error.module.scss";
import tmpl from "./internal-server-error.hbs";

export const internalServerError = () => {
  const context = {
    styles
  };

  return tmpl(context);
};
