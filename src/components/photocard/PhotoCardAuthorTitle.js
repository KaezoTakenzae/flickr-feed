import React from 'react';

const PhotoCardAuthorTitle = ({card}) => {
  return (
    <div className="photo-card-author-title">
      <a rel='noopener noreferrer' target='_blank' href={card.link} title={card.title}>
        {`${card.title.substr(0, 20)}${card.title.length > 20 ? '...' : ''}`}
      </a> by <a
        rel='noopener noreferrer'
        target='_blank'
        href={`https://www.flickr.com/photos/${card.owner}`}
        title={card.ownername}>
          {card.ownername}
      </a>
    </div>
  );
};

export default PhotoCardAuthorTitle;
