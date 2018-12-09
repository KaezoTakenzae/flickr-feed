import React from 'react';

const PhotoCardAuthorTitle = ({card}) => {
  return (
    <div className="photo-card-author-title">
      <a rel='noopener noreferrer' target='_blank' href={card.link} title={card.title}>
        {`${card.title.substr(0, 20)}${card.title.length > 20 ? '...' : ''}`}
      </a> by <a
        rel='noopener noreferrer'
        target='_blank'
        href={`https://www.flickr.com/photos/${card.author_id}`}
        title={card.author}>
          {card.author.substring(
            card.author.lastIndexOf('("') + 2,
            card.author.lastIndexOf('")')
          )}
      </a>
    </div>
  );
};

export default PhotoCardAuthorTitle;
