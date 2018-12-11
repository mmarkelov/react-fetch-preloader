import React from 'react';
import { shallow } from 'enzyme';
import ShowPreloader from './ShowPreloader';

const Loaded = () => <div>Loaded</div>;
const Error = () => <div>Error</div>;
const URL = 'https://randomuser.me/api/?results=10';

const fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json: () => ({
      data: 'Some data',
    }),
  }),
);

const rejectedFetch = jest.fn().mockImplementation(() =>
  Promise.reject({
    error: true,
    json: () => ({
      data: 'Error',
    }),
  }),
);

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

  it('makeResponse should be called when url was changed', () => {
    let props = { url: 'prev_url', loaded: Loaded, fetch };
    const component = shallow(<ShowPreloader {...props} />);
    const makeResponse = jest.spyOn(component.instance(), 'makeResponse');
    component.setProps({ ...props, url: 'new_url' });
    expect(makeResponse).toHaveBeenCalledWith('new_url');
  });

  it('should render preloader component while fetching', async () => {
    const component = shallow(
      <ShowPreloader url={URL} loaded={Loaded} fetch={fetch} duration={0} />,
    );

    component.instance().checkResponse();
    expect(component.html()).toEqual('<span>Loading...</span>');
  });

  it('should render loaded component if responsed finished', async () => {
    const component = await shallow(
      <ShowPreloader url={URL} loaded={Loaded} fetch={fetch} />,
    );
    await component.instance().makeResponse();
    expect(component.html()).toBe('<div>Loaded</div>');
  });

  it('should render error component if response failed', async () => {
    const component = await shallow(
      <ShowPreloader
        url={URL}
        loaded={Loaded}
        fetch={rejectedFetch}
        errored={Error}
      />,
    );
    await component.instance().makeResponse();
    process.nextTick(() => {
      expect(component.html()).toBe('<div>Error</div>');
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
