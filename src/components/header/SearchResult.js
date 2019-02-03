import React from 'react';
import PhotoCardImage from '../photocard/PhotoCardImage';
import { withRouter } from 'react-router';

const SearchResult = withRouter(({history, result, parent}) => {
  const goToPhoto = e => {
      history.push(`/photo/${result.id}`);
      if (window.photoPage) {
        window.photoPage.getImage(result.id);
        window.photoPage.getDetails(result.id, true);
        window.scrollTo({top: 0});
      }
      document.querySelector('#search-input-field').value = '';
      parent.setState({
        searchResults: [],
      })
  }

  return (
    <div className="result" onClick={event => goToPhoto(event, result.id)}>
      <div className="text">
        {result.title}<br/>
        {result.ownername}
      </div>
      <PhotoCardImage card={result} />
    </div>
  );
});

export default SearchResult;
