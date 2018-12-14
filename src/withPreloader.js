import React from 'react';
import ShowPreloader from './ShowPreloader';

const withPreloader = WrappedComponent => {
  class HOC extends React.Component {
    state = {};

    preload = (id, url) => {
      if (!id) {
        throw new Error('Id param is required!');
      }
      if (!url) {
        throw new Error('Url param is required!');
      }
      this.setState({
        [id]: { url },
      });
    };

    renderPreloader = (id, showPreloaderOptions) => {
      const { preloadOptions } = this.props;
      const options = { ...preloadOptions, ...showPreloaderOptions };
      return (
        this.state[id] && (
          <ShowPreloader url={this.state[id].url} {...options} />
        )
      );
    };

    render() {
      return (
        <WrappedComponent
          preload={this.preload}
          renderPreloader={this.renderPreloader}
        />
      );
    }
  }

  return HOC;
};

export default withPreloader;
