import Block from '../services/Block.ts';
import Route from './Route.ts';

export default class Router {
  // eslint-disable-next-line no-use-before-define
  static __instance: Router;

  routes!: Array<Route>;

  // eslint-disable-next-line no-undef
  history!: History;

  _currentRoute!: Route | null;

  rootQuery!: string;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.__instance;
    }

    this.routes = [];
    // eslint-disable-next-line no-undef
    this.history = window.history;
    this._currentRoute = null;
    this.rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: typeof Block, tag = 'div', props = {}) {
    const route = new Route(pathname, block, tag, { ...props, rootQuery: this.rootQuery });

    this.routes.push(route);

    return this;
  }

  start() {
    // eslint-disable-next-line no-undef
    window.onpopstate = () => { this._onRoute(window.location.pathname); };
    // eslint-disable-next-line no-undef
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}
