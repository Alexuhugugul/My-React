/** @jsx JetCat.createElement */

import JetCatCompositeComponentWrapper from './JetCatCompositeComponentWrapper';
import TopLevelWrapper from './TopLevelWrapper';

class JetCat {

    static createElement(type, props, children) {
        const element = {
            type,
            props: props || {},
        };

        if (children) {
            element.props.children = children;
        }

        return element;

    };

    static createClass(spec) {
        class Constructor {
            constructor(props) {
                this.props = props;
                this.render = spec.render;
            }

        }
        Constructor.prototype = Object.assign(Constructor.prototype, spec);

        return Constructor;
    }

    /**
     * 
     * @param {HTMLElement} element 
     * @param {HTMLElement} container 
     */
    static render(element, container) {
        const wrapperElement = this.createElement(TopLevelWrapper,element);
        const componentInstance = new JetCatCompositeComponentWrapper(wrapperElement);

        return componentInstance.mountComponent(container);
    };

}

const customClass = JetCat.createClass({
    render() {
        return <div>Myyy</div>
    }
})

const MyTitle = JetCat.createClass({
    render() {
        return JetCat.createElement('h1', null, this.props.message);
    }
});

const MyMessage = JetCat.createClass({
    render() {
        if (this.props.asTitle) {
            return JetCat.createElement(MyTitle, {
                message: this.props.message
            });
        } else {
            return JetCat.createElement('p', null, this.props.message);
        }
    }
})

// console.log(customClass)
JetCat.render(
    JetCat.createElement(MyMessage,{ message: 'hey there Feact', asTitle:true }),
    document.getElementById('root')
);