import State, { TSubscriberItem } from './State';

export type TProps = {
  [key: string]: unknown;
};

export type TEvent = {
  [key: string]: () => void;
};

type TComponentParams = {
  [key: string]: unknown;
} | null;

type TListener = {
  node: HTMLElement;
  event: string;
  callBack: (e: unknown) => void;
};

export class Component extends HTMLElement {
  protected params: TComponentParams | null = null;

  protected _subscriptions: TSubscriberItem[] = [];
  protected _listeners: TListener[] = [];

  protected props: TProps;
  private _props: TProps = {};
  private _events: TEvent[] = [];

  constructor(
    public view: ((params: TComponentParams) => string) | null = null
  ) {
    super();
    this.props = this._makePropsProxy(this, this._props);
  }

  protected createEvent = (eventName: string, eventProps: unknown): void => {
    this._events.forEach((event) => {
      if (event.eventName === eventName) {
        event.eventHandler({ detail: eventProps });
      }
    });
    this.dispatchEvent(new CustomEvent(eventName, { detail: eventProps }));
  };

  protected loading(): void {
    this.innerHTML =
      "<div class='loader'><div></div><div></div><div></div><div></div></div>";
  }

  protected addSubscriber(varName: string, callBack: (val: unknown) => void) {
    this._subscriptions.push(State.subscribe(varName, callBack));
  }

  protected addListener<TListener>(node, event, callBack) {
    node.addEventListener(event, callBack);
    this._listeners.push(<TListener>{ node, event, callBack });
  }

  private _propsChanged(prop: string, oldValue: unknown, newValue: unknown) {
    if (oldValue != newValue && this['propsChanged']) {
      this['propsChanged'](prop, oldValue, newValue);
    }
  }

  private _makePropsProxy(component, props) {
    return new Proxy(props, {
      get(target, prop: string) {
        return target[prop];
      },
      set(target: TProps, prop: string, value) {
        const oldValue = target[prop];
        target[prop] = value;
        component._propsChanged(prop, oldValue, value);
        return true;
      },
      deleteProperty(): never {
        throw new Error('Нет доступа');
      },
    });
  }

  protected setEvent = (eventName, eventHandler) => {
    this._events.push({ eventName, eventHandler });
  };

  protected render = (params: TComponentParams | null = null): void => {
    this.params = params;
    if (this.view !== null) {
      const html = this.view(params);
      this.innerHTML = html;
      const attrs = this._parseAttributes(html);
      if (attrs) {
        this.querySelectorAll(attrs.join(',')).forEach((node) => {
          this._addPropsAndEvents(node);
        });
      }
    }
  };

  private _parseAttributes = (html: string) => {
    const tmp = new Set();
    const res = html.replace(/[\n\t]/g, '').match(/(event-\w+|props-\w+)/gi);
    if (res) {
      res.forEach((item) => {
        item.trim() && tmp.add(item);
      });
    }
    const resAttrs = Array.from(tmp).map((item) => `[${item}]`);
    return resAttrs.length ? resAttrs : null;
  };

  private _addPropsAndEvents(node) {
    const removeAttributes = [];
    for (const [key, attr] of Object.entries(node.attributes)) {
      if (attr.nodeName.match(/^props-(\w)+$/gi)) {
        const [propsName, propsValue] = [
          attr.nodeName.split('-')[1],
          node.getAttribute(attr.nodeName).replace(/(\[\[)|(]])/g, ''),
        ];
        const args = propsValue.match(/(\[\S+\])|(\(\S+\))/gi);
        if (args) {
          const _propsValue = propsValue.match(/^[a-z0-9_-]+/gi)![0];
          node.props[propsName] = eval('this[_propsValue]' + args.join(''));
        } else {
          node.props[propsName] = this[propsValue];
        }

        removeAttributes.push({
          node,
          attr: attr.nodeName,
        });
      }

      if (attr.nodeName.match(/^event-(\w)+$/gi)) {
        const [eventName, eventCallback] = [
          attr.nodeName.split('-')[1],
          node.getAttribute(attr.nodeName).replace(/(\[\[)|(]])/g, ''),
        ];
        const args = eventCallback.match(/(\[\S+\])|(\(\S+\))/gi);
        if (args) {
          const _eventCallback = eventCallback.match(/^[a-z0-9_-]+/gi)![0];
          if (this[_eventCallback]) {
            node.setEvent(eventName, () => {
              eval('this[_eventCallback]' + args.join(''));
            });
          }
        } else {
          if (this[eventCallback]) {
            if (node.setEvent) {
              node.setEvent(eventName, this[eventCallback]);
            } else {
              node[`on${eventName}`] = this[eventCallback];
            }
          }
        }
        removeAttributes.push({
          node,
          attr: attr.nodeName,
        });
      }
    }
    removeAttributes.forEach((item) => {
      item.node.removeAttribute(item.attr);
    });
  }

  protected disconnectedCallback() {
    this._subscriptions.forEach((elm) => State.unsubscribe(elm));
    this._subscriptions.length = 0;

    this._listeners.forEach((item) => {
      item.node.removeEventListener(item.event, item.callBack);
    });
    this._listeners.length = 0;

    this['disconnected'] && this['disconnected']();
  }

  protected connectedCallback() {
    this['connected'] && this['connected']();
  }
}
