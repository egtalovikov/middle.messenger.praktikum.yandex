const tpl = `
{{#each chats}}
<li data-chat-id={{this.id}} class="{{../styles.chat}} 
{{#if this.chatActive}}{{../styles.chatActive}}{{/if}}">
  <img class={{../styles.avatar}} {{#if this.avatar}}src="{{this.avatar}}"
  {{else}}src={{../avatar}}{{/if}} />
  <div class={{../styles.info}}>
    <div class={{../styles.name-and-message}}>
      <p class={{../styles.name}}>{{this.title}}</p>
      <p class={{../styles.message}}>{{deleteFirstAndLast this.last_message.content}}</p>
    </div>
    <div class={{../styles.time-and-count}}>
      <p class={{../styles.time}}>{{getTime this.last_message.time}}</p>
      {{#if this.unread_count includeZero=true}}
      {{else}}<p class={{../styles.count}}>{{this.unread_count}}</p>{{/if}}
    </div>
  </div>
</li>
{{/each}}
`;

export default tpl;
