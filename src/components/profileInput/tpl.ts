const tpl = `
{{#each inputs}}
<div class={{../styles.infoBlock}}>
<p class={{../styles.text}}>{{this.text}}</p>
<input {{#ifEquals ../disabled true}}disabled{{/ifEquals}} type={{this.type}} value="{{#ifEquals "first_name" this.name}}{{../user.first_name}}{{/ifEquals}}{{#ifEquals "second_name" this.name}}{{../user.second_name}}{{/ifEquals}}{{#ifEquals "email" this.name}}{{../user.email}}{{/ifEquals}}{{#ifEquals "login" this.name}}{{../user.login}}{{/ifEquals}}{{#ifEquals "display_name" this.name}}{{../user.display_name}}{{/ifEquals}}{{#ifEquals "phone" this.name}}{{../user.phone}}{{/ifEquals}}" name={{this.name}} class={{../styles.input}}>
<span class={{../styles.error}}>{{this.errorText}}</span>
</div>
{{/each}}
`;

export default tpl;
