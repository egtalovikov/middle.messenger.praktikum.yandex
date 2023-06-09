const tpl = `
<a href="/">
    <aside class={{styles.aside}}>
        <button class={{styles.aside-button}} />
    </aside>
    </a>
    <div class={{styles.avatar-block}}>
        <button type="button" aria-label="Смена аватара" class={{styles.change-avatar}}>Поменять
            аватар</button>
        <img src={{avatar}} class={{styles.avatar}} alt="Аватар" />
    </div>
    <p class={{styles.name}}>{{name}}</p>
    {{#each inputs}}
        <div class={{../styles.info-block}}>
            <p class={{../styles.text}}>{{{this.text}}}</p>
            <input value={{this.value}} class={{../styles.input}} disabled>
        </div>
    {{/each}}
    <a href="/edit-profile" class={{styles.link}}>Изменить данные</a>
    <a href="/change-password" class={{styles.link}}>Изменить пароль</a>
    <a href="#" class={{styles.signout}}>Выйти</a>
`;

export default tpl;
