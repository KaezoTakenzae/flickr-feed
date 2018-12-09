import React from 'react';

const PhotoCardTags = ({tags, updateFunc}) => {
  const searchByTag = (event) => {
    const tag = event.target.dataset.tag;
    updateFunc(false, tag);
  }

  const generateTags = (tags) => {
    let tagsArr = tags.split(' ');

    return (
      tagsArr.length > 0 ?
        tagsArr.map((tag, i) => (
          <span key={i} data-tag={tag} onClick={(event) => searchByTag(event)}>{tag !== '' ? `${tag}, `: ''}</span>
        ))
      : null
    )
  }

  return (
    <div className="photo-card-tags">{generateTags(tags)}</div>
  );
};

export default PhotoCardTags;
