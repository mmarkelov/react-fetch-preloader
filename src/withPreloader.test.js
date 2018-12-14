import React from 'react';
import { shallow } from 'enzyme';
import withPreloader from './withPreloader';
import ShowPreloader from './ShowPreloader';

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

describe('withPreloader HOC', () => {
  it('should render correctly with all props', () => {
    const component = shallow(<WrappedApp />);
    expect(component).toMatchSnapshot();
  });

  it('preload function should throw Error without id param', () => {
    const component = shallow(<WrappedApp />);
    try {
      component.instance().preload();
    } catch (e) {
      expect(e.message).toBe('Id param is required!');
    }
  });

  it('preload function should throw Error without url param', () => {
    const component = shallow(<WrappedApp />);
    try {
      component.instance().preload(1);
    } catch (e) {
      expect(e.message).toBe('Url param is required!');
    }
  });

  it('renderPreloader function should render ShowPreloader component', () => {
    const component = shallow(<WrappedApp preloadOptions={{loaded: Loaded}} />);
    component.setState({
      test: { url: 'test_url' },
    });
    expect(component.instance().renderPreloader('test')).toEqual(
      <ShowPreloader loaded={Loaded} url='test_url' />,
    );
  });
});

afterAll(() => setTimeout(() => process.exit(), 1000));
