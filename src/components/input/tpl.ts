const tpl = `
  <input name={{name}} type={{type}} required="true" />
  <span class={{styles.error}}>{{#ifCond name "login"}}
  Логин должен содержать от 3 до 20 символов латиницы, цифры, дефис и нижнее подчеркивание
  {{/ifCond}}
{{#ifCond name "password"}}
Пароль должен содержать от 8 до 40 символов, хотя бы одну заглавную букву и цифру{{/ifCond}}
{{#ifCond name "email"}}Введите корректный email{{/ifCond}}
{{#ifCond name "first_name"}}
Поле должно содержать только буквы и дефисы, первая буква должна быть заглавной{{/ifCond}}
{{#ifCond name "second_name"}}
Поле должно содержать только буквы и дефисы, первая буква должна быть заглавной{{/ifCond}}
{{#ifCond name "phone"}}
Телефон должен начинаться с плюса и содержать от 10 до 15 цифр{{/ifCond}}
{{#ifCond name "confirm_password"}}
Пароль должен содержать от 8 до 40 символов, хотя бы одну заглавную букву и цифру{{/ifCond}}</span>
  <label>{{placeholder}}</label>
`;

export default tpl;
