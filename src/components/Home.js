import React, {Component} from 'react';
import PhotoCard from './photocard';
import $ from 'jquery';

class Home extends Component {
  state = {
    items: [],
    page: 1,
    tag: ''
  }

  componentDidMount() {
    this.makeFlickrRequest(false, '');
  }

  makeFlickrRequest = (updateItems, tag) => {
    let flickerAPI =
    `https://api.flickr.com/services/feeds/photos_public.gne?format=json&safe_search=1&page=${this.state.page}&tags=${tag}`;
    let self = this;
    $.ajax({
      url: flickerAPI,
      dataType: 'jsonp',
      jsonpCallback: 'jsonFlickrFeed',
      success: function (result, status, xhr) {
        if (updateItems) {
          let items = [
            ...self.state.items,
            ...result.items
          ];
          self.setState({
            items,
            tag
          })
        } else {
          self.setState({
            items: []
          }) // set state twice due to lazy loader bug
          self.setState({
            items: result.items,
            tag
          })
        }
        window.addEventListener('scroll', self.scrollContinueSearch);
      }
    });
  }

  scrollContinueSearch = (event) => {
      if (window.scrollY >= document.body.offsetHeight - 1000) {
          this.setState({
            page: this.state.page + 1
          })
          this.makeFlickrRequest(true, this.state.tag);
          window.removeEventListener('scroll', this.scrollContinueSearch);
      }
  }

  renderPhotoCards = (items) => (
      items ?
        items.map((item, i) => (
            <PhotoCard key={i} card={item} updateFunc={this.makeFlickrRequest} />
        ))
      : null
  )

  render() {
    return (
      <div>
        <h1>Flickr Photo Stream</h1>
        <div className="photo-cards-container">
          {this.renderPhotoCards(this.state.items)}
        </div>
      </div>
    );
  }
}

export default Home;
