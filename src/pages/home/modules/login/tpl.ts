const tpl = `
  <div class={{styles.container}}>
    <h1 class={{styles.title}}>{{title}}</h1>
    {{{ form }}}
    <a href={{registerLink}} class={{styles.link}}>{{registerLinkText}}</a>
  </div>
`;

export default tpl;
