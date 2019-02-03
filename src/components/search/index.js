import React, {Component} from 'react';
import { renderPhotoCards } from '../utils/Lib';
import {
  apiKey,
  flickrUrl,
  methods,
  extraParams,
} from '../utils/Things';

class Search extends Component {
  state = {
    items: [],
  }

  componentDidMount() {
    const query = this.props.match.params.query;

    if (!query) {
      this.props.history.push('/');
    }

    this.makeFlickrRequest(query);
    window.searchComponent = this;
  }

  componentWillUnmount() {
    window.searchComponent = null;
  }

  makeFlickrRequest = query => {
    let flickerAPI = `${flickrUrl}method=${methods.search}&api_key=${apiKey}&text=${query}${extraParams}`;
    fetch(flickerAPI)
    .then(resp => {
      return resp.json();
    })
    .then(myJson => {
      this.setState({
        items: [],
      }) // set state twice due to lazy loader bug
      this.setState({
        items: myJson.photos ? myJson.photos.photo : null,
      })
    });
  }

  render() {
    return (
      <div>
        {renderPhotoCards(this.state.items, this, 'home')}
      </div>
    );
  }
}

export default Search;
