import Store, { StoreEvents } from "./Store";
import isEqual from "../../utils/isEqual";

export default function connect(Component, mapStateToProps) {
	return class extends Component {
		constructor(tag, props = {}) {
			
			const store = new Store();

			super(tag, { ...props, ...mapStateToProps(store.getState()) });

			store.attach(StoreEvents.Updated, () => {
				this.setProps({ ...mapStateToProps(store.getState()) });
			});
		}
	};
}



/* import Block from "../services/Block";
import store, { StoreEvents } from "../services/Store";
import isEqual from "./isEqual";

type Indexed<T = any> = {
    [key in string]: T;
};

export default function connect(Component, mapStateToProps) {
	return class extends Component {
		constructor(tag, props = {}) {
			super(tag, { ...props, ...mapStateToProps(store.getState()) });

            this.state = {};

			store.attach(StoreEvents.Updated, () => {
                const newState = mapStateToProps(store.getState());

                if (!isEqual(this.state, newState)) {
                    this.setProps({ ...mapStateToProps(store.getState()) });
                }
                this.state = newState;
			});
		}
	};
} */