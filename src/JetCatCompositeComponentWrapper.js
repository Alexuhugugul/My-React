import JetCatDomComponent from './JetCatDomComponent';

export default class JetCatCompositeComponentWrapper {

    constructor(element) {
        this._currentElement = element;
    }

    mountComponent(container) {
        const Component = this._currentElement.type;
        const componentInstance = new Component(this._currentElement.props);
        let element = componentInstance.render();
        while (typeof element.type === "function") {
            element = (new element.type(element.props)).render();
        }

        const domElementInstance = new JetCatDomComponent(element);
        return domElementInstance.mountComponent(container);

    }
}