import React from 'react';
import LazyImage from '../utils/LazyImage';

const PhotoCardImage = ({media, link}) => {
  return (
    <div className="photo-card-image">
      <a rel='noopener noreferrer' target='_blank' href={link} title='Go to image on Flicker'>
        <LazyImage src={media.m} alt={media.m}/>
      </a>
    </div>
  );
};

export default PhotoCardImage;
