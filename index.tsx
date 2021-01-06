const App = () => (
  <div className="main">
    <h1>Hello world!</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt magni
      ullam sit reiciendis provident, molestiae voluptatibus voluptatum illum
      error nemo nesciunt ipsam dolores quibusdam, excepturi dolorum accusamus
      mollitia, quidem quam.
    </p>
  </div>
);

const React = {
  createElement: (fnOrTag, props, ...children) => {
    if (typeof fnOrTag === 'function') {
      /* It has to return Virtual DOM */
      return fnOrTag();
    }

    return { tag: fnOrTag /* <- it's a tag */, props: { ...props, children } };
  },
};

const ReactDOM = {
  render: (reactElement: any) => {
    console.log(reactElement);
  },
};

ReactDOM.render(<App />, document.querySelector('#root'));
