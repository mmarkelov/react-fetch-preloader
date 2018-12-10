import React from 'react';
import { shallow } from 'enzyme';
import ShowPreloader from './ShowPreloader';

const Loaded = () => <div>Loaded</div>;
const URL = 'https://randomuser.me/api/?results=10';

const fetch = jest.fn().mockReturnValue(Promise.resolve());
const rejectedFetch = jest.fn().mockReturnValue(Promise.reject('Error'));

describe('ShowPreloader', () => {
  it('should throw Error without url prop', () => {
    try {
      shallow(<ShowPreloader loaded={Loaded} />);
    } catch (e) {
      expect(e.message).toEqual('url param is required!');
    }
  });

  it('should throw Error without loaded prop', () => {
    try {
      shallow(<ShowPreloader url={URL} />);
    } catch (e) {
      expect(e.message).toEqual('loaded param is required!');
    }
  });

  it('should render error component if response failed', async () => {
    const component = shallow(
      <ShowPreloader url={URL} loaded={Loaded} fetch={rejectedFetch} />,
    );
    await component.instance().makeResponse();
    process.nextTick(() => {
      component.update();
      expect(component.html()).toBe('<span>ERROR</span>');
    });
  });

  it('should render correctly with all props', () => {
    const component = shallow(
      <ShowPreloader url={URL} loaded={Loaded} fetch={fetch} />,
    );
    expect(component).toMatchSnapshot();
  });
});

afterAll(() => setTimeout(() => process.exit(), 1000));
