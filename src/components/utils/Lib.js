import React from 'react';
import PhotoCard from '../photocard';
import Tag from '../tags/Tag';

export const createTagStr = tags => {
  let tag = '';
  for (let i = 0; i < tags.length; i++) {
    tag += i > 0 ? `,${tags[i]}` : tags[i];
  }
  return tag;
};

export const renderTags = (tags, component, limit) => {
  const tagsToRender = tags ?
    limit ? [...tags].splice(0, limit) : tags
  : null;
  return tagsToRender ?
    tagsToRender.map((tag, i) => (
      <Tag key={i} name={tag} removeTag={component.removeTag} />
    ))
  : null
}

export const renderPhotoCards = (items, component, pageType) => (
    items ?
      items.map((item, i) => (
          <PhotoCard
            key={i}
            card={item}
            component={component}
            pageType={pageType}
          />
      ))
    : null
);
