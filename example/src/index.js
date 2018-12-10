import React from 'react';
import ReactDOM from 'react-dom';
import { ShowPreloader } from 'react-preloader';

import Preloader from './Preloader';
import Card from './Card';

import './styles.css';

const URL = 'https://randomuser.me/api/?results=';

const SORT = [1, 10, 50, 100];

const Error = data => {
  console.log(data);
  return <h1>Oops :( Error</h1>;
};

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
              className={sort === item ? 'active button' : 'button'}
            >
              Load {sort} items
            </button>
          ))}
        </div>
        <ShowPreloader
          duration={300}
          preloader={Preloader}
          loaded={Card}
          errored={Error}
          url={`${URL}${item}`}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
