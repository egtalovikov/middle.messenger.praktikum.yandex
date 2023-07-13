import Store, { StoreEvents } from './Store.ts';

export default function connect(Component : any, mapStateToProps : any) {
  return class extends Component {
    constructor(tag: any, props = {}) {
      const store = new Store();

      super(tag, { ...props, ...mapStateToProps(store.getState()) });

      store.attach(StoreEvents.Updated, () => {
        this.setProps({ ...mapStateToProps(store.getState()) });
      });
    }
  };
}
