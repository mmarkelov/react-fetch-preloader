import React from 'react';
import ReactDOM from 'react-dom';
import { ShowPreloader } from 'react-fetch-preloader';

import Preloader from './Preloader';
import Card from './Card';

import './styles.css';

const URL = 'https://randomuser.me/api/?results=';

const SORT = [1, 10, 20];

const Error = data => <h1>Oops :( Error</h1>;

class App extends React.Component {
  state = {
    item: null,
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
        <h2>Basic example</h2>
        <div className="sort">
          {SORT.map(sort => (
            <button
              type="button"
              onClick={this.setItem(sort)}
              key={sort}
              className={sort === item ? 'active button' : 'button'}
            >
              Load {sort} items
            </button>
          ))}
        </div>
        <div className="result">
          {item && item !== 'error' && (
            <ShowPreloader
              duration={300}
              preloader={Preloader}
              loaded={Card}
              errored={Error}
              url={`${URL}${item}`}
            />
          )}
        </div>
        <h2>Error fetch example</h2>
        <button
          type="button"
          onClick={this.setItem('error')}
          className={item === 'error' ? 'active button' : 'button'}
        >
          Error fetch
        </button>
        <div className="result">
          {item === 'error' && (
            <ShowPreloader
              duration={300}
              preloader={Preloader}
              loaded={Card}
              errored={Error}
              url='err.error.me/fake-api'
            />
          )}
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
