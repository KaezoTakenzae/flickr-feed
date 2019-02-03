import React from 'react';

const PhotoImage = ({sizes}) => {
  const renderImage = () => {
    const width = window.innerWidth;
    let closest = '';
    let currentWidth = 100000;
    let bestMatchFound = false;
    sizes.forEach(size => {
      let sizeWidth = size.width;
      if (typeof sizeWidth === 'string') {
        sizeWidth = parseInt(sizeWidth);
      }
      if (sizeWidth === width) {
        closest = size.label;
        bestMatchFound = true;
      }
      if (sizeWidth > width && !bestMatchFound) {
        currentWidth = sizeWidth - width < currentWidth - width ?
          sizeWidth : currentWidth;
        if (currentWidth === sizeWidth) {
          closest = size.label;
        }
      }
    });

    const src = closest !== '' ?
      sizes.find(size => size.label === closest) : sizes.find(size => size.label === 'Original');

    return (
      <img src={src.source} alt={src.source} />
    )
  }

  return (
    <div>
      {renderImage()}
    </div>
  );
};

export default PhotoImage;
