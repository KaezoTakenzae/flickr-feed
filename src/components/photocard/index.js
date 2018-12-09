import React from 'react';
import PhotoCardImage from './PhotoCardImage';
import PhotoCardAuthorTitle from './PhotoCardAuthorTitle';
import PhotoCardTags from './PhotoCardTags';

const PhotoCard = ({card, updateFunc}) => {
  return (
    <div className="photo-card">
      <PhotoCardImage media={card.media} link={card.link} />
      <div className="card-contents">
        <PhotoCardAuthorTitle card={card} />
        <div className="photo-card-description">{card.title}</div>
        <PhotoCardTags tags={card.tags} updateFunc={updateFunc} />
      </div>
    </div>
  );
};

export default PhotoCard;
