import React from 'react';
import PhotoCardImage from './PhotoCardImage';
import PhotoCardAuthorTitle from './PhotoCardAuthorTitle';

const PhotoCard = ({card}) => {
  return (
    <div className="photo-card">
      <PhotoCardImage media={card.media} link={card.link} />
      <PhotoCardAuthorTitle card={card} />
      <div className="photo-card-description">{card.title}</div>
      <div className="photo-card-tags">{card.tags}</div>
    </div>
  );
};

export default PhotoCard;
