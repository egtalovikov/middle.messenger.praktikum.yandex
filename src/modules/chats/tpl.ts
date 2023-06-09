const tpl = `
  <div class={{styles.header}}>
    <div class={{styles.user}}>
      <img class={{styles.avatar}} src={{avatar}} />
      <p class={{styles.name}}>{{name}}</p>
    </div>
    <button class={{styles.menu}} />
  </div>
  <ul class={{styles.messages}}>
    <p class={{styles.date}}>{{date}}</p>
    {{#each messages}}
    {{{this}}}
    {{/each}}
  </ul>
  <div class={{styles.footer}}>
    <button class={{styles.attachButton}}></button>
    {{{form}}}
  </div>
`;

export default tpl;
