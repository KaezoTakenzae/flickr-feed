export const apiKey = '8e8bd75dc934cd89f262e0168e75f508';
export const flickrUrl = 'https://api.flickr.com/services/rest/?';
export const methods = {
  recent: 'flickr.photos.getRecent',
  people: 'flickr.people.getPhotos',
  photo: 'flickr.photos.getInfo',
  img: 'flickr.photos.getSizes',
  search: 'flickr.photos.search',
}
export const extraParams =
'&safe_search=1&content_type=1&extras=url_m,description,owner_name,tags,views&format=json&nojsoncallback=1';
