const tpl = `
<a href="/settings">
  <aside class={{styles.aside}}>
    <button class={{styles.aside-button}} />
  </aside>
</a>
  <img {{#if (isnull user.avatar)}}src="{{avatar}}"
  {{else}}src={{user.avatar}}{{/if}} class={{styles.avatar}} alt="Аватар" />
  {{{form}}}
`;

export default tpl;
