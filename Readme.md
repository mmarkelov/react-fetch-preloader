# react-preloader

Library for displaying preloader when response is longer than **duration**.

## Motivation


![react-preloader](https://media.giphy.com/media/ckTGwxd9JMUJG4PaGe/giphy.gif)

You can see gif right above to understand idea.

## Properties

### Required

#### url
Url of response - string

#### loaded
React component, when response is successful render this component

### Not required

#### fetch
Function to fetch data. Default - window.fetch

#### duration
Number - if response is longer this value - show preloader(in ms). Default - 500

#### errored
React component, when response is failed render this component. Default -
```js
() => <span>ERROR</span>
```

#### preloader
React component for display preloader. Default -
```js
() => <span>Loading...</span>
```

## More details and example

```js
import React from 'react';
import ShowPreloader from 'react-preloader';

const URL = 'https://randomuser.me/api/?results=';

const SORT = [1, 10];

class App extends React.Component {
  state = {
    item: 10,
  };

  setItem = item => () => {
    if (item !== this.state.item) {
      this.setState({ item });
    }
  };

  render() {
    const { item } = this.state;

    return (
      <div className="App">
        <h1>React Preloader Example</h1>
        <div className="sort">
          {SORT.map(sort => (
            <button
              type="button"
              onClick={this.setItem(sort)}
              key={sort}
            >
              Load {sort} items
            </button>
          ))}
        </div>
        <ShowPreloader
          duration={300}
          preloader={YourPreloaderComponent}
          loaded={LoadedComponent}
          errored={ErrorComponent}
          url={`${URL}${item}`}
        />
      </div>
    );
  }
}
```

You can clone this repository and check example

```shell
git clone https://github.com/mmarkelov/react-preloader.git
cd ./react-preloader/example
yarn && yarn run dev
```

## TODO

- [ ] Add tests
- [ ] Write clear description
- [ ] Write more examples
- [x] SSR

