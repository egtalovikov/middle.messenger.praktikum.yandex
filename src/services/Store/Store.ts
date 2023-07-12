import EventBus from "../EventBus";
import set from "../../utils/set";

export enum StoreEvents {
    Updated = 'updated',
}

export default class Store extends EventBus {

	static _instance: Store;
	static STORE_NAME = 'myAppStore';

	_state = { };
    static set: any;

	constructor() {
		
		if(Store._instance)
			return Store._instance;

		super();

		const savedState = localStorage.getItem(Store.STORE_NAME);
		
		this._state = savedState ? (JSON.parse(savedState) ?? {}) : {} 

		Store._instance = this;

		this.attach(
			StoreEvents.Updated, 
			() => { localStorage.setItem(Store.STORE_NAME, JSON.stringify(this._state)); }
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
    };
}
