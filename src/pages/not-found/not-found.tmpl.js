import * as styles from "./not-found.module.scss";
import tmpl from "./not-found.hbs";

export const notFound = () => {
  const context = {
    styles
  };

  return tmpl(context);
};
