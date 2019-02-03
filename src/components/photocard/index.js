import React from 'react';
import PhotoCardImage from './PhotoCardImage';
import PhotoCardAuthorTitle from './PhotoCardAuthorTitle';
import PhotoCardTags from './PhotoCardTags';

const PhotoCard = ({card, component, pageType}) => {
  const goToPhoto = e => {
    if (e.target === e.currentTarget) {
      component.props.history.push(`/photo/${card.id}`);
      if (pageType !== 'home') {
        component.getImage(card.id);
        component.getDetails(card.id);
        window.scrollTo({top: 0});
      }
    }
  }

  return (
    <div className="photo-card" onClick={event => goToPhoto(event)}>
      <PhotoCardImage card={card} />
      <div className="card-contents">
        <PhotoCardAuthorTitle card={card} />
        <div className="photo-card-description">{card.title}</div>
        <PhotoCardTags tags={card.tags} updateFunc={pageType === 'home' ? component.updateFunc : null} />
      </div>
    </div>
  );
};

export default PhotoCard;
