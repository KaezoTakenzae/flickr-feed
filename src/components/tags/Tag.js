import React from 'react';

const Tag = ({name, removeTag}) => {
  return (
    <div className="tag-filter">
      {name}
      <button onClick={event => removeTag(event, name)}>X</button>
    </div>
  );
};

export default Tag;
