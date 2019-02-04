import React, {Component} from 'react';
import PhotoImage from './PhotoImage';
import Detail from './Detail';
import {
  apiKey,
  flickrUrl,
  methods,
  extraParams,
} from '../utils/Things';
import {renderPhotoCards} from '../utils/Lib';

class PhotoPage extends Component {
  state = {
    photo: {},
    items: [],
    photoUrls: [],
    err: {
      photo: '',
      extraPhotos: '',
    }
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    window.photoPage = this;

    if (!id) {
      this.props.history.push('/');
    }

    this.getDetails(id, true);
    this.getImage(id);
  };

  componentWillUnmount() {
    window.photoPage = null;
  }

  getDetails = (id, loadImages) => {
    let flickerAPI = `${flickrUrl}method=${methods.photo}&api_key=${apiKey}&photo_id=${id}${extraParams}`;
    fetch(flickerAPI)
    .then(resp => {
      return resp.json();
    })
    .then(myJson => {
      if (myJson.photo) {
        this.setState({
          photo: {},
        }); // set state twice due to lazy loader bug
        this.setState({
          photo: myJson.photo,
        });
        return myJson.photo.owner.nsid;
      } else if (myJson.message) {
        this.setState({
          err: {
            ...this.state.err,
            photo: myJson.message,
          }
        });
      }
    })
    .then(userId => {
      if (loadImages) {
        flickerAPI = `${flickrUrl}method=${methods.people}&api_key=${apiKey}&user_id=${userId}${extraParams}`;
        fetch(flickerAPI)
        .then(resp => {
          return resp.json();
        })
        .then(myJson => {
          this.setState({
            items: [],
          }) // set state twice due to lazy loader bug
          this.setState({
            items: myJson.photos.photo,
          })
        })
        .catch(() => {
          this.setState({
            err: {
              ...this.state.err,
              extraPhotos: 'Unable to load other photos right now'
            }
          })
        });
      }
    });
  }

  getImage = id => {
    const flickerAPI = `${flickrUrl}method=${methods.img}&api_key=${apiKey}&photo_id=${id}${extraParams}`;
    fetch(flickerAPI)
    .then(resp => {
      return resp.json();
    })
    .then(myJson => {
      this.setState({
        photoUrls: myJson.sizes ? myJson.sizes.size : [],
      });
    });
  }

  render() {
    const photo = this.state.photo;
    return (
      <div className="photo-page">
        <div className="photo">
          {this.state.photoUrls.length > 0 ? (
            <PhotoImage sizes={this.state.photoUrls} />
          ) : null}
        </div>
        {this.state.err.photo === '' ? (
          <div className="details">
            {photo.owner ? (
              <Detail name={`Author: ${photo.owner.username}`}
              link={`https://www.flickr.com/photos/${photo.owner.nsid}/`}
              blank={true} />
            ) : null}
            {photo.title ? (
              <Detail name={`Title: ${photo.title._content}`}
                link={`https://www.flickr.com/photos/${photo.owner.nsid}/${photo.id}/`}
                blank={true} />
            ) : null}
            {photo.views ? <Detail name={`Views: ${photo.views}`} /> : null}
            {photo.description && photo.description._content !== '' ? <Detail name={`Description: ${photo.description._content}`} /> : null}
          </div>
        ) : <p>{this.state.err.photo}</p> }
        {
          <div className="photo-cards-container">
            {renderPhotoCards(this.state.items, this)}
          </div>
        }
      </div>
    );
  }
}

export default PhotoPage;
