import React from 'react';
import ShowPreloader from './ShowPreloader';

const withPreloader = WrappedComponent => {
  class HOC extends React.Component {
    state = {
      preloaded: {},
      showPreloaderOptions: null,
    };

    preload = (id, url, showPreloaderOptions) => {
      const { preloaded } = this.state;
      preloaded[id] = { url };
      this.setState({ preloaded, showPreloaderOptions });
    };

    renderPreloader = id => {
      const { preloaded, showPreloaderOptions } = this.state;
      return (
        preloaded[id] && (
          <ShowPreloader url={preloaded[id].url} {...showPreloaderOptions} />
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
