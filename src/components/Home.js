import React, {Component} from 'react';
import TagView from './tags/TagView';
import {
  createTagStr,
  renderTags,
  renderPhotoCards
} from './utils/Lib';
import {
  apiKey,
  flickrUrl,
  methods,
  extraParams,
} from './utils/Things';

class Home extends Component {
  state = {
    items: [],
    page: 1,
    tags: [],
    tagView: false,
  }

  componentDidMount() {
    this.makeFlickrRequest(false, '');
  }

  makeFlickrRequest = (updateItems, tag) => {
    let tags = this.state.tags;
    if (tag) {
      tags.push(tag);
    }
    const tagStr = createTagStr(tags);
    const method = tagStr !== '' ? methods.search : methods.recent;
    let flickerAPI = `${flickrUrl}method=${method}&api_key=${apiKey}${extraParams}&page=${this.state.page}${tagStr ? `&tags=${tagStr}` : ''}`;
    fetch(flickerAPI)
    .then(resp => {
      return resp.json();
    })
    .then(myJson => {
      if (updateItems) {
        let items = [
          ...this.state.items,
          ...myJson.photos.photo
        ];
        this.setState({
          items,
          tags
        })
      } else {
        this.setState({
          items: [],
          page: 1,
        }) // set state twice due to lazy loader bug
        this.setState({
          items: myJson.photos.photo,
          tags
        })
      }
      window.addEventListener('scroll', this.scrollContinueSearch);
    });
  }

  scrollContinueSearch = (event) => {
      if (window.scrollY >= document.body.offsetHeight - 2000) {
          this.setState({
            page: this.state.page + 1
          })
          this.makeFlickrRequest(true, this.state.tags);
          window.removeEventListener('scroll', this.scrollContinueSearch);
      }
  }

  tagView = () => {
    this.setState({
      tagView: !this.state.tagView
    });
  }

  removeTag = (e, tagToRemove) => {
    let tags = [...this.state.tags].filter(tag => {
      return tag !== tagToRemove;
    });
    this.setState({
      tags,
    }, () => {
      this.makeFlickrRequest(false);
    });
  }

  render() {
    const state = this.state;
    return (
      <div>
        <h1>Flickr Photo Stream</h1>
        <div className="tags-container">
          <button className="add-tags" onClick={event => this.tagView(event)}>
            +
          </button>
          {renderTags(state.tags, this, 2)}
        </div>
        <div className="photo-cards-container">
          {renderPhotoCards(state.items, this, 'home')}
        </div>
        { state.tagView ? <TagView tags={state.tags} parent={this} /> : null }
      </div>
    );
  }
}

export default Home;
