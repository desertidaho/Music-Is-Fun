import Song from "../../models/Song.js";

//Private///////////////
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

//Public///////////////
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
        document.querySelector('.now-playing').innerHTML = `<p class="mt-3" id="now-playing"><b>Playing: </>${_state.songs[i].title}, by ${_state.songs[i].artist}, Album: ${_state.songs[i].collection}, ${_state.songs[i].date.substring(0, 10)}</p>`
        document.querySelector('.now-playing-btn').innerHTML = `<a href="${_state.songs[i].track}"  target="_blank"><button class="btn btn-sm btn-dark shadow mx-2 mb-4 itunes">Download Song $${_state.songs[i].iprice}</button><button class="btn btn-sm btn-dark shadow mx-2 mb-4">Download Album $${_state.songs[i].price}</button></a>`
      }
    }
  }

}