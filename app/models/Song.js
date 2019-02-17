export default class Song {
    constructor(song) {
        this.title = song.trackName
        this.albumArt = song.artworkUrl60.replace(/60x60/g, "250x250")
        this.artist = song.artistName
        this.collection = song.collectionName
        this.price = song.collectionPrice
        this.iprice = song.trackPrice
        this.preview = song.previewUrl
        this.track = song.trackViewUrl
        this.date = song.releaseDate
    }

    getTemplate() {
        return `
        <div class="col-6 col-md-2 mt-1">
           <a onclick="app.controllers.itunesCtrl.playSong('${this.preview}')"> <div class="card">
                <img class="card-img-top img-fluid" src="${this.albumArt}" alt="">
                    <div class="card-body">
                         <h5 class="card-title">${this.title}</h5>
                         <p class="card-text">${this.artist}</p>
                     <!--<h6 class="card-text">${this.collection}</h6> 
                         <h6 class="card-text">$${this.price}</h6>-->
                     </div> 
            </div></a>
        </div> `
    }

}