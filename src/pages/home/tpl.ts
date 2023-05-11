const tpl = `
  <aside class={{styles.chats-menu}}>
  <a class={{styles.link-button}} href="/about">
    <button class={{styles.button}}>
      Профиль
      <div class={{styles.button-arrow}}></div>
    </button>
    </a>

    {{{form}}}

    <ul class={{styles.chats}}>
      {{#each chatsList}}
      <li class={{../styles.chat}}>
        <img class={{../styles.avatar}} src={{this.avatar}} />
        <div class={{../styles.info}}>
          <div class={{../styles.name-and-message}}>
            <p class={{../styles.name}}>{{this.name}}</p>
            <p class={{../styles.message}}>{{this.message}}</p>
          </div>
          <div class={{../styles.time-and-count}}>
            <p class={{../styles.time}}>{{this.time}}</p>
            <p class={{../styles.count}}>{{this.count}}</p>
          </div>
        </div>
      </li>
      {{/each}}
    </ul>
  </aside>
  {{{Chats}}}
`;

export default tpl;
