const tpl = `
  <aside class={{styles.chats-menu}}>
  <button type="button" class={{styles.addButton}}>+</button>
  <a class={{styles.link-button}} href="/settings">
    <button class={{styles.button}}>
      Профиль
      <div class={{styles.button-arrow}}></div>
    </button>
    </a>
    {{{form}}}
    {{{chatsList}}}
  </aside>
  {{#if chat}}{{{Chats}}}{{else}}
  <div class={{styles.blank}}>
  <p class={{styles.text}}>Выберите чат, чтобы отправить сообщение</p>
  </div>
  {{/if}}
  {{{popup}}}
`;

export default tpl;
