import React from 'react';

const Detail = ({name, link, blank}) => {
  return (
    <div>
      {link ?
        <a href={link} target={blank ? '_blank' : 'self'}>{name}</a>
      : name
      }
    </div>
  );
};

export default Detail;
