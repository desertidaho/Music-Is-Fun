import Song from "../../models/song.js";

let _state = {
  songs: []
}

let _subscribers = {
  songs: []
}

function setState(prop, data) {
  _state[prop] = data
  _subscribers[prop].forEach(fn => fn())
}

//DO NOT MODIFY
class ItunesService {
  get Songs() {
    return _state.songs
  }

  getMusicByArtist(artist) {
    var url = 'https://itunes.apple.com/search?callback=?&term=' + artist;
    // @ts-ignore
    $.getJSON(url)
      .then(res => {
        let results = res.results.map(s => new Song(s))
        setState('songs', results)
      })
      .catch(err => console.log(err))
  }

  addSubscriber(prop, fn) {
    _subscribers[prop].push(fn)
  }
}



export default ItunesService