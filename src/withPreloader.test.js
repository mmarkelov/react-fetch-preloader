import React from 'react';
import { shallow } from 'enzyme';
import withPreloader from './withPreloader';

const Loaded = () => <div>Loaded</div>;
const URL = 'https://randomuser.me/api/?results=10';

class App extends React.Component {
  preload = (id, url) => () => {
    this.props.preload(id, url, {
      duration: 200,
      loaded: Loaded,
    });
  };

  render() {
    const { renderPreloader } = this.props;
    return (
      <div className="App">
        <div className="sort">
          <button type="button" onClick={this.preload(1, URL)}>
            Load items
          </button>
        </div>
        {renderPreloader(1)}
      </div>
    );
  }
}

const WrappedApp = withPreloader(App);

describe('withPreloader HOC component', () => {
  it('should render correctly with all props', () => {
    const component = shallow(<WrappedApp />);
    expect(component).toMatchSnapshot();
  });
});

afterAll(() => setTimeout(() => process.exit(), 1000));
