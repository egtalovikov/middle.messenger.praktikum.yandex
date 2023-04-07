import tmpl from "./main.hbs";

export const main = (body) => {
  const context = {
    body
  };

  return tmpl(context);
};
