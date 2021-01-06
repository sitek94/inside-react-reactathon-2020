const App = () => (
  <div className="main" width="100">
    <h1>Hello world!</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt magni
      ullam sit reiciendis provident, molestiae voluptatibus voluptatum illum
      error nemo nesciunt ipsam dolores quibusdam, excepturi dolorum accusamus
      mollitia, quidem quam.
      <span>1000</span>
    </p>
  </div>
);

/**
 * REACT
 */
const React = {
  createElement: (fnOrTag, props, ...children) => {
    if (typeof fnOrTag === 'function') {
      /* It has to return Virtual DOM */
      return fnOrTag();
    }

    return { tag: fnOrTag /* <- it's a tag */, props: { ...props, children } };
  },
};

/**
 * REACT DOM
 */
const ReactDOM = {
  render: (reactElement, domRoot) => {

    // Children are `null` sometimes
    if (!reactElement) {
      return;
    }

    // Text nodes
    if (typeof reactElement === 'string' || typeof reactElement === 'number') {
      domRoot.appendChild(document.createTextNode(String(reactElement)));
      return;
    }

    const rootEl = document.createElement(reactElement.tag);
    const props = reactElement.props ?? {};
    const propKeys = Object.keys(props).filter((p) => p !== 'children');
    const children = props.children ?? [];

    // Map properties onto the root element
    propKeys.forEach((k) => {
      rootEl[k] = props[k];
    });

    // Render children inside root element
    children.forEach((child) => {
      ReactDOM.render(child, rootEl);
    });

    // Append root element to the DOM
    domRoot.appendChild(rootEl);
  },
};

ReactDOM.render(<App />, document.querySelector('#root'));
