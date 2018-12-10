/* global window */
import React from 'react';
import PropTypes from 'prop-types';

const INTERVAL = 50;

class ShowPreloader extends React.Component {
  static propTypes = {
    fetch: PropTypes.func,
    url: PropTypes.string.isRequired,
    duration: PropTypes.number,
    loaded: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    errored: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    preloader: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  };

  static defaultProps = {
    fetch: typeof window !== 'undefined' ? window.fetch : () => {},
    duration: 500,
    errored: () => <span>ERROR</span>,
    preloader: () => <span>Loading...</span>,
  };

  state = {
    responseTime: 0,
    isLoading: false,
    showPreloader: false,
    data: null,
    error: null,
  };

  componentDidMount() {
    const { url, loaded } = this.props;
    if (!url) {
      throw new Error('url param is required!');
    }
    if (!loaded) {
      throw new Error('loaded param is required!');
    }
    this.makeResponse(url);
    this.intervalId = setInterval(this.checkResponse, INTERVAL);
  }

  componentDidUpdate(prevProps) {
    const { url } = this.props;
    if (url !== prevProps.url) {
      this.makeResponse(url);
      this.intervalId = setInterval(this.checkResponse, INTERVAL);
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  checkResponse = () => {
    const { duration } = this.props;
    const { responseTime, isLoading, showPreloader } = this.state;
    this.setState(
      prevState => ({
        responseTime: prevState.responseTime + INTERVAL,
      }),
      () => {
        if (responseTime >= duration && isLoading) {
          if (!showPreloader) {
            this.setState({ showPreloader: true });
          }
          clearInterval(this.intervalId);
        }
      },
    );
  };

  makeResponse = url => {
    const { fetch } = this.props;
    this.setState({ responseTime: 0, isLoading: true });
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        this.setState({ isLoading: false, data, showPreloader: false });
        clearInterval(this.intervalId);
      })
      .catch(error => {
        this.setState({ isLoading: false, error, showPreloader: false });
        clearInterval(this.intervalId);
      });
  };

  renderContent = () => {
    const { loaded, errored } = this.props;
    const Loaded = loaded;
    const Error = errored;
    const { data, isLoading, error } = this.state;
    if (error) {
      return <Error error={error} />;
    }
    return !isLoading && data ? <Loaded data={data} /> : null;
  };

  render() {
    const { showPreloader } = this.state;
    const { preloader } = this.props;
    const Preloader = preloader;

    return showPreloader ? <Preloader /> : this.renderContent();
  }
}

export default ShowPreloader;
