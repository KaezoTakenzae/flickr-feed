import React from 'react';
import LazyImage from '../utils/LazyImage';

const PhotoCardImage = ({card}) => {
  return (
    <div className="photo-card-image">
      <a
        rel='noopener noreferrer'
        target='_blank'
        href={`https://www.flickr.com/photos/${card.owner}/${card.id}/`}
        title='Go to image on Flicker'>
        <LazyImage src={card.url_m} alt={card.url_m}/>
      </a>
    </div>
  );
};

export default PhotoCardImage;
