# react-preloader

Library for displaying preloader when response is longer than **duration**.

## Motivation


![react-preloader](https://media.giphy.com/media/ckTGwxd9JMUJG4PaGe/giphy.gif)

You can see gif right above to understand idea.

## Install

```shell
npm install --save react-preloader
yarn add react-preloader
```

## Components

### ShowPreloader

#### Properties

##### Required

###### url
Url of response - string

###### loaded
React component, when response is successful render this component

##### Not required

###### fetch
Function to fetch data. Default - window.fetch

###### duration
Number - if response is longer this value - show preloader(in ms). Default - 500

###### errored
React component, when response is failed render this component. Default -
```js
() => <span>ERROR</span>
```

###### preloader
React component for display preloader. Default -
```js
() => <span>Loading...</span>
```

### withPreloader HOC component

**withPreloader** provides two extra functions:

#### preload
Takes two specified params: **id** and **url**

#### renderPreloader
Takes one specified param: **id**

You can check example of using HOC in example section

## More details and example

### Basic examples

API is unstable now, so I need to figure out what will be the best realization.

#### Multiple fetches fires **onClick**

You can use **ShowPreloader** component for this purpose

```js
import React from 'react';
import { ShowPreloader } from 'react-preloader';

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

#### Fetches with **HOC**

You can use HOC component to fetch data in different places of your App

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { withPreloader } from 'react-preloader';

import Preloader from './Preloader';
import Card from './Card';

import './styles.css';

const Error = data => {
  console.log(data);
  return <h1>Oops :( Error</h1>;
};

class App extends React.Component {
  preload = (id, url) => () => {
    this.props.preload(id, url, {
      duration: 200,
      preloader: Preloader,
      loaded: Card,
      errored: Error,
    });
  };

  render() {
    const { renderPreloader } = this.props;
    return (
      <div className="App">
        <div className="sort">
          <button
            type="button"
            onClick={this.preload(1, 'https://randomuser.me/api/?results=20')}
          >
            Load 20 items
          </button>
          <button
            type="button"
            onClick={this.preload(2, 'https://randomuser.me/api/?results=10')}
          >
            Load 10 items
          </button>
        </div>
        <div>Some content here</div>
        {renderPreloader(1)}
        <div>And here...</div>
        {renderPreloader(2)}
      </div>
    );
  }
}

const WrappedApp = withPreloader(App);

const rootElement = document.getElementById('root');
ReactDOM.render(<WrappedApp />, rootElement);
```

You can clone this repository and check example

```shell
git clone https://github.com/mmarkelov/react-preloader.git
cd ./react-preloader/example
yarn && yarn run dev
```

## TODO

- [ ] Add more tests
- [ ] Write clearer description
- [ ] Write more examples
- [x] SSR

