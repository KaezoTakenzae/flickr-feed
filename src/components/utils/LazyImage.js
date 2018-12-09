import React, {Component} from 'react';
import LazyLoad from 'vanilla-lazyload';

// Only initialize it one time for the entire application
if (!document.lazyLoadInstance) {
  const config = {
    element_selector: '.lazy'
  }
  document.lazyLoadInstance = new LazyLoad(config);
}

class LazyImage extends Component {
  // Update lazyLoad after first rendering of every image
  componentDidMount() {
    document.lazyLoadInstance.update();
  }

  // Update lazyLoad after rerendering of every image
  componentDidUpdate() {
    document.lazyLoadInstance.update();
  }

  render() {
    const { alt, src, srcset, sizes, width, height } = this.props;
    return (
      <img
        alt={alt}
        className="lazy"
        data-src={src}
        data-srcset={srcset}
        data-sizes={sizes}
        width={width}
        height={height}
      />
    );
  }
}

export default LazyImage;
