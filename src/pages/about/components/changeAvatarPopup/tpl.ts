const tpl = `
<div class={{styles.container}}>
  <button type="button" aria-label="Закрытие попапа" class={{styles.closeButton}}></button>
  <h2 class={{styles.title}}>Обновить аватар</h2>
  {{{form}}}
</div>
`;

export default tpl;
