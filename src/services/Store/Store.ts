import EventBus from '../EventBus.ts';
import set from '../../utils/set.ts';

// eslint-disable-next-line no-shadow
export enum StoreEvents {
    Updated = 'updated',
}

export default class Store extends EventBus {
  // eslint-disable-next-line no-use-before-define
  static _instance: Store;

  static STORE_NAME = 'myAppStore';

  _state = { };

  static set: unknown;

  constructor() {
    // eslint-disable-next-line no-constructor-return
    if (Store._instance) { return Store._instance; }

    super();

    // eslint-disable-next-line no-undef
    const savedState = localStorage.getItem(Store.STORE_NAME);

    this._state = savedState ? (JSON.parse(savedState) ?? {}) : {};

    Store._instance = this;

    this.attach(
      StoreEvents.Updated,
      // eslint-disable-next-line no-undef
      () => { localStorage.setItem(Store.STORE_NAME, JSON.stringify(this._state)); },
    );
  }

  getState() {
    return this._state;
  }

  removeState() {
    this._state = {};
    this.emit(StoreEvents.Updated);
  }

  set(path: string, value: unknown) {
    set(this._state, path, value);

    this.emit(StoreEvents.Updated);

    return this;
  }
}
