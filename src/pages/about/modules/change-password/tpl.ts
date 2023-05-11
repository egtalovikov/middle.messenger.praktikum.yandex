const tpl = `
<a href="/about">
  <aside class={{styles.aside}}>
    <button class={{styles.aside-button}} />
  </aside>
</a>
  <img src={{avatar}} class={{styles.avatar}} alt="Аватар" />
  {{{form}}}
`;

export default tpl;
