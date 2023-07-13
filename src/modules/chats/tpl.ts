const tpl = `
  <div class={{styles.header}}>
    <div class={{styles.user}}>
      <img {{#if (isnull chat.avatar)}}src="{{chat.avatar}}"
      {{else}}src="{{avatar}}"{{/if}} class={{styles.avatar}} />
      <p class={{styles.name}}>{{chat.title}}</p>
    </div>
    <div class={{styles.menu}}>
      <button type="button" class={{styles.addUserMenuButton}}>Добавить пользователя в чат</button>
      <button type="button" class={{styles.deleteUserMenuButton}}>
      Удалить пользователя из чата</button>
    </div>
    <button type="button" class={{styles.openMenuButton}}></button>
  </div>
  <ul class={{styles.messages}}>
    {{#each messages}}
    {{{this}}}
    {{/each}}
  </ul>
  <div class={{styles.footer}}>
    <button class={{styles.attachButton}}></button>
    <form class={{styles.form}}>
      <input class={{styles.input}} name="message" placeholder="Сообщение" />
      <span class={{styles.error}}>Сообщение не должно быть пустым</span>
      {{{submitButton}}}
    </form>
  </div>
  {{{addUserPopupComponent}}}
  {{{deleteUserPopupComponent}}}
`;

export default tpl;
