var apiParams = {
  key: 'AIzaSyA-2P-UjlhcwiMC4P6z0z9f-SU7s4FMIJQ',
  type: 'video',
  maxResults: '8',
  part: 'id,snippet',
  fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle',
}

var querystring = Object.keys(apiParams)
  .map(key => key + '=' + encodeURIComponent(apiParams[key]))
  .join('&');

var searchURL = 'https://www.googleapis.com/youtube/v3/search?' + querystring;

 module.exports = { apiParams, searchURL };
