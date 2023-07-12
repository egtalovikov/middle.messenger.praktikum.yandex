const tpl = `
<div class={{styles.container}}>
  <button type="button" aria-label="Закрытие попапа" class={{styles.closeButton}}></button>
  <h2 class={{styles.title}}>{{title}}</h2>
  <form>
  <input class={{styles.input}} name="chatId">
  <button class={{styles.button}}>{{buttonText}}</button>
  </form>
</div>
`;

export default tpl;
