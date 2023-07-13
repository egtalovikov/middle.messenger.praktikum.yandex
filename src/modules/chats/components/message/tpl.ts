const tpl = `
  <p class={{styles.message}}>{{message}}</p>
  <p class="{{styles.time}} {{#if owner}}{{styles.timeOwner}}{{/if}}">
  {{#if isRead}}
    <img src={{readMarker}} />
    {{/if}}
    {{time}}
  </p>
`;

export default tpl;
