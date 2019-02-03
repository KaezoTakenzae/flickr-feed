import React from 'react';
import { renderTags } from '../utils/Lib';

const TagView = ({tags, parent}) => {
  const addTag = e => {
    e.preventDefault();
    const tagsToAdd = document.querySelector('#add-tag-input').value;
    let tagsInState = [...parent.state.tags]
    let tags = tagsToAdd.split(',');
    tags.forEach(tag => {
      tagsInState.push(tag.trim());
    })
    parent.setState({
      tags: tagsInState,
    }, () => {
      document.querySelector('#add-tag-input').value = '';
      parent.makeFlickrRequest(false);
    });
  }

  return (
    <div className="tag-view">
      <div className="tag-view-background" onClick={event => parent.tagView(event)} />
      <div className="tag-view-container">
        <button className="close-button" onClick={event => parent.tagView(event)}>
          X
        </button>
        <form className="add-tags-form" onSubmit={event => addTag(event)}>
          <input id="add-tag-input" type="text" placeholder="Enter a tag" />
          <button className="add-tags" onClick={event => addTag(event)}>
            +
          </button>
        </form>
        <div className="tags">
          {renderTags(tags, parent)}
        </div>
      </div>
    </div>
  );
};

export default TagView;
