const tpl = `
<a href="/messenger">
    <aside class={{styles.aside}}>
        <button class={{styles.aside-button}} />
    </aside>
    </a>
    <div class={{styles.avatar-block}}>
        <button type="button" aria-label="Смена аватара" class={{styles.change-avatar}}>Поменять
            аватар</button>
        <img {{#if (isnull user.avatar)}}src="{{avatar}}"
        {{else}}src={{user.avatar}}{{/if}} class={{styles.avatar}} alt="Аватар" />
    </div>
    <p class={{styles.name}}>{{first_name}}</p>
    {{{form}}}
    <a href="/edit-profile" class={{styles.link}}>Изменить данные</a>
    <a href="/change-password" class={{styles.link}}>Изменить пароль</a>
    <a id="logout" class={{styles.signout}}>Выйти</a>
    {{{popup}}}
`;

export default tpl;
