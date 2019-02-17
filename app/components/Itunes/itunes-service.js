import Song from "../../models/Song.js";

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

//Public (don't modify)
export default class ItunesService {
  get Songs() {
    return _state.songs
  }

  getMusicByArtist(artist) {
    let url = 'https://itunes.apple.com/search?callback=?&term=' + artist;
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

  showDetails(url) {
    for (let i = 0; i < _state.songs.length; i++) {
      if (_state.songs[i].preview == [url]) {
        document.querySelector('.now-playing').innerHTML = `<p class="text-white" id="now-playing"><b>Playing- </>Title: ${_state.songs[i].title},  Album: ${_state.songs[i].collection},  $${_state.songs[i].price}</p>`
      }
    }
  }

}