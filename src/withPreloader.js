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

// export const renderPreload = id => {
//   console.log(store[id]);
// };
//
// export class PreloadRenderer extends React.Component {
//   state = {
//     initFetch: false,
//   };
//
//   preload = () => {
//     console.log('!!!')
//     this.setState({ initFetch: true });
//   };
//
//   render() {
//     const { initFetch } = this.state;
//     return initFetch ? <h1>Fetchin....</h1> : null;
//   }
// }
// //
// // export function preload (id, url, ...showPreloaderOptions) {
// //   console.log(preload())
// //   // PreloadRenderer.preload();
// //   // <ShowPreloader url={url} {...showPreloaderOptions} />;
// // };
//
// export const preload = id => () => {
//   console.log('!!!!', id)
//   // PreloadRenderer.prototype.preload();
// }
