import ItunesService from "./itunes-service.js";
//Private
const _itunesService = new ItunesService()

function drawSongs() {
  //changes button back to GET MUSIC once songs are loaded
  document.querySelector('#get-music-button').textContent = 'GET MUSIC'
  //card templates
  let songs = _itunesService.Songs
  let template = ''
  songs.forEach(song => {
    template += song.getTemplate()
  });
  document.querySelector('#songs').innerHTML = template
  //now playing

}


//PUBLIC
export default class ItunesController {
  constructor() {
    _itunesService.addSubscriber('songs', drawSongs)
    drawSongs()
  }

  //DO NOT MODIFY THIS METHOD
  getMusic(e) {
    e.preventDefault();
    let artist = e.target.artist.value;
    let form = e.target
    //changes the button to loading while songs load
    document.querySelector('#get-music-button').textContent = 'LOADING....'
    _itunesService.getMusicByArtist(artist)
    form.reset()
    document.body.style.backgroundImage = "url('https://i.ibb.co/ypcy8Ps/black.png')";
    document.querySelector('.title-bg-img').style.visibility = 'visible'
    document.querySelector('.fas').style.display = 'visible'
    document.querySelector('.home-intro').style.display = 'none'
  }

  playSong(url) {
    document.getElementById('playAudio').setAttribute("src", url)
    _itunesService.showDetails(url)
  }

  home() {
    location.reload()
  }
}