import React from 'react';
import 'isomorphic-fetch';
import { shallow } from 'enzyme';
import ShowPreloader from './ShowPreloader';

const Loaded = () => <div>Loaded</div>;
const URL = 'https://randomuser.me/api/?results=10';

describe('ShowPreloader', () => {
  it('should render correctly with all props', () => {
    const component = shallow(<ShowPreloader url={URL} loaded={Loaded} />);
    expect(component).toMatchSnapshot();
  });

  it('should throw Error without url prop', () => {
    try {
      shallow(<ShowPreloader loaded={Loaded} />);
    } catch (e) {
      expect(e.message).toEqual('url param is required!')
    }
  });

  it('should throw Error without loaded prop', () => {
    try {
      shallow(<ShowPreloader url={URL} />);
    } catch (e) {
      expect(e.message).toEqual('loaded param is required!')
    }
  });
});

afterAll(() => setTimeout(() => process.exit(), 1000))
