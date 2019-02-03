import React, {Component} from 'react';
import SearchResult from './SearchResult';
import { withRouter } from 'react-router';

import {
  apiKey,
  flickrUrl,
  methods,
  extraParams,
} from '../utils/Things';

class Search extends Component {
  state = {
    searchResults: [],
  }

  displaySearchResults = items => {
    const resultsSubset = items ? [...items].splice(0, 4) : null;
    return resultsSubset ?
      resultsSubset.map((result, i) => (
        <SearchResult result={result} parent={this} />
      ))
    : null
  }

  makeFlickrRequest = e => {
    const text = e.target.value;
    let flickerAPI = `${flickrUrl}method=${methods.search}&api_key=${apiKey}&text=${text}${extraParams}`;
    fetch(flickerAPI)
    .then(resp => {
      return resp.json();
    })
    .then(myJson => {
      this.setState({
        searchResults: [],
      })
      this.setState({
        searchResults: myJson.photos ? myJson.photos.photo : null,
      })
    });
  }

  submitForm = e => {
    e.preventDefault();
    const text = document.querySelector('#search-input-field');
    this.setState({
      searchResults: [],
    })
    this.props.history.push(`/search/${text.value}`);
    if (window.searchComponent) {
      window.searchComponent.makeFlickrRequest(text.value);
      window.scrollTo({top: 0});
    }
    text.value = '';
  }

  render() {
    return (
      <form onSubmit={event => this.submitForm(event)}>
        <input
          id="search-input-field"
          type="text"
          placeholder="Search..."
          onChange={event => this.makeFlickrRequest(event)} />
        <div className="search-results">
          {this.displaySearchResults(this.state.searchResults)}
        </div>
      </form>
    );
  }
}

export default withRouter(Search);
