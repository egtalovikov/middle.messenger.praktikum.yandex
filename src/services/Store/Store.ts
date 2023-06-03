import EventBus from "../EventBus";
import set from "../../utils/set";

export enum StoreEvents {
    Updated = 'updated',
}

export default class Store extends EventBus {

	static _instance;
	static STORE_NAME = 'myAppStore';

	_state = { };

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

    public set(path: string, value: unknown) {
        set(this._state, path, value);

        this.emit(StoreEvents.Updated);

        return this;
    };
}


/* import EventBus from "./EventBus";
import set from "../utils/set";

export enum StoreEvents {
    Updated = 'updated',
}

type Indexed<T = any> = {
    [key in string]: T;
};

class Store extends EventBus {
    private state: Indexed = {
        user: {
            avatar: "",
            display_name: "",
            email: "",
            first_name: "",
            id: "",
            login: "",
            phone: "",
            second_name: ""
        }
    };

    public getState() {
        return this.state;
    }

    public set(path: string, value: unknown) {
        set(this.state, path, value);

        this.emit(StoreEvents.Updated);
    };
}

export default new Store; */