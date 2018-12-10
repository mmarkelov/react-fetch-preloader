import React from 'react';
import ShowPreloader from './ShowPreloader';

const withPreloader = WrappedComponent => {
  class HOC extends React.Component {
    state = {
      showPreloaderOptions: this.props.preloadOptions,
    };

    preload = (id, url, showPreloaderOptions) => {
      if (!id) {
        throw new Error('Id param is required!');
      }
      if (!url) {
        throw new Error('Url param is required!');
      }
      this.setState(prevState => ({
        [id]: { url },
        showPreloaderOptions: {
          ...prevState.showPreloaderOptions,
          ...showPreloaderOptions,
        },
      }));
    };

    renderPreloader = id => {
      const { showPreloaderOptions } = this.state;
      return (
        this.state[id] && (
          <ShowPreloader url={this.state[id].url} {...showPreloaderOptions} />
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
