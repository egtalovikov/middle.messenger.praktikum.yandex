import { v4 as makeUUID } from 'uuid';
import * as Handlebars from 'handlebars';
import EventBus from './EventBus';

type EventHandler = (event: Event) => void;

interface Props {
    [key: string]: any;
    settings?: { withInternalID: boolean };
    events?: { [key: string]: EventHandler };
    attr?: { [key: string]: string };
}

interface Children {
    [key: string]: Block;
}

export default class Block {

    static readonly EVENT_INIT = 'init';
    static readonly EVENT_FLOW_CDM = 'flow:component-did-mount';
    static readonly EVENT_FLOW_CDU = 'flow:component-did-update';
    static readonly EVENT_FLOW_RENDER = 'flow:render';

    protected _props: Props;
    protected _children: Children;
    private _id: string;
    protected _element: HTMLElement;
    private _meta: { tag: string; props: Props };
    private _eventBus: EventBus;

    constructor(tag = 'div', propsAndChilds: { [key: string]: any } = {}) {

        const { children, props } = this.getChildren(propsAndChilds);

        this._eventBus = new EventBus()
        this._id = makeUUID();
        this._children = children;
        this._props = this.makePropsProxy({ ...props, __id: this._id });
        this._meta = { tag, props };

        this.registerEvents();
        this._eventBus.emit(Block.EVENT_INIT);
    }

    private registerEvents() {
        this._eventBus.attach(Block.EVENT_INIT, this.init.bind(this));
        this._eventBus.attach(Block.EVENT_FLOW_CDM, this._componentDidMount.bind(this));
        this._eventBus.attach(Block.EVENT_FLOW_CDU, this._componentDidUpdate.bind(this));
        this._eventBus.attach(Block.EVENT_FLOW_RENDER, this._render.bind(this));
    }

    private init() {
        this._element = this.createDocumentElement(this._meta?.tag);
        this._eventBus.emit(Block.EVENT_FLOW_RENDER);
    }

    private createDocumentElement(tag: string) {

        const element = document.createElement(tag) as HTMLTemplateElement;
        if (this._props.settings?.withInternalID)
            element.setAttribute('data-id', this._id);

        return element;
    }

    private _render() {
        const block = this.render();
        this.removeEvents();
        this._element.innerHTML = '';
        this._element.appendChild(block);
        this.addEvents();
        this.addAttribute();
    }

    protected render() {
        return new DocumentFragment;
    }

    protected addEvents() {

        const { events = {} } = this._props;

        Object.keys(events).forEach((eventName) => {
            this._element.addEventListener(eventName, events[eventName]);
        })
    }

    private removeEvents() {
        const { events = {} } = this._props;

        Object.keys(events).forEach((eventName) => {
            this._element.removeEventListener(eventName, events[eventName]);
        })
    }

    private addAttribute() {
        const { attr = {} } = this._props;

        Object.entries(attr).forEach(([key, value]) => {
            this._element.setAttribute(key, value);
        })
    }

    private getChildren(propsAndChilds: { [key: string]: any }) {
        
        const children: Children = {};
        const props: Props = {};

        Object.keys(propsAndChilds).forEach(key => {
            if (propsAndChilds[key] instanceof Block)
                children[key] = propsAndChilds[key];
            else
                props[key] = propsAndChilds[key];
        });
        
        return { children, props };
    }

    compile(template: string, props?: Props) {

        if (typeof(props) == 'undefined')
            props = this._props;
        
        const propsAndStubs: Props = { ...props };

        Object.entries(this._children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
        });

        const fragment = this.createDocumentElement('template');
        fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

        Object.values(this._children).forEach(child => {
            const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
            if (stub)
                stub.replaceWith(child.getContent());
        });

        return fragment.content;
    }

    private _componentDidMount() {
        this.componentDidMount();
        Object.values(this._children).forEach(child => { child.dispatchComponentDidMount() });
    }

    protected componentDidMount() {}

    dispatchComponentDidMount() {
        this._eventBus.emit(Block.EVENT_FLOW_CDM);
        if (Object.keys(this._children).length)
            this._eventBus.emit(Block.EVENT_FLOW_RENDER);
    }

    private _componentDidUpdate() {
        const isReRender = this.componentDidUpdate();
        if(isReRender)
            this._eventBus.emit(Block.EVENT_FLOW_RENDER);
    }

    componentDidUpdate() {
        return true;
    }

    setProps(newProps?: Props) {

        if(!newProps)
            return;
        
        const { children, props } = this.getChildren(newProps);

        if (Object.values(children).length)
            Object.assign(this._children, children);
        
        if (Object.values(props).length)
            Object.assign(this._props, props);
    }

    makePropsProxy(props: Props) {
        return new Proxy(props, {
            
            get(target, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },

            set: (target, prop: string, value: unknown) => {
                const oldValue = { ...target };
                target[prop] = value;
                this._eventBus.emit(Block.EVENT_FLOW_CDU, oldValue, target);
                return true;
            },

        });
    }

    show() {
        this.getContent().style.display = 'block';
    }

    hide() {
        this.getContent().style.display = 'none';
    }

    getContent() {
        return this._element;
    }
}
