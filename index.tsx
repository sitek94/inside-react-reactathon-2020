const App = () => {
  const [name, setName] = React.useState('Maciek');

  return (
    <div className="main">
      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onchange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <h1>Hello, {name}</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt magni
        ullam sit reiciendis provident, molestiae voluptatibus voluptatum illum
        error nemo nesciunt ipsam dolores quibusdam, excepturi dolorum accusamus
        mollitia, quidem quam.
        <span>1000</span>
      </p>
    </div>
  );
};

/**
 * REACT
 */

let state;

const React = {
  useState: (initialState) => {
    state = state || initialState;
    const setState = (newState) => {
      console.log('state was', state, 'state is', newState)

      state = newState;

      render();
    };

    return [state, setState] as const;
  },
  createElement: (fnOrTag, props, ...children) => {
    if (typeof fnOrTag === 'function') {

      // Return Virtual DOM
      return {
        ...fnOrTag(props),

        // Render method that allows us to rerender
        render: () => fnOrTag(props),
      };
    }

    return { 
      tag: fnOrTag, // <- It's going to be a tag
      props: { ...props, children } };
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

    // Rerender if render method exists
    reactElement.render?.(props);

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

// Renders `<App>` into the `#root` making sure that its empty first
const render = () => {
  const parent = document.querySelector('#root');
  parent?.firstChild?.remove();

  ReactDOM.render(<App />, parent);
};

render();
