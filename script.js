
let slideProgress = document.querySelector("#slide-progress-bar");
let song = document.querySelector("#song");
let controlIcon = document.querySelector("#play-solid");

let songName = document.querySelector(".song-name");
let bandName = document.querySelector(".band-name");
let image = document.querySelector(".song-image-box");

// Creating playlist page //
const songsLibrary = {
    songNames: ["Shattered Amethyst", "In Constant Sorrow", "Trough the Dark Gates", "Throne of Ice", "Ugliest"],
    songBand: ["$uicideboy$", "$uicideboy$", "Stortregn", "Before the Down", "$uicideboy$"],
    songImage: ["images/Suicideboys1.jpg", "images/Suicideboys2.jpg", "images/Stortregn.jpg", "images/Before The Dawn.jpg", "images/Suicideboys3.jpg"],
    songSource: ["songs/Shattered Amethyst.mp3", "songs/$UICIDEBOY$ - IN CONSTANT SORROW (Lyric Video).mp3", "songs/Through the Dark Gates.mp3", "songs/Before The Dawn - Throne of Ice.mp3", "songs/$UICIDEBOY$ - Ugliest (Lyric Video).mp3"]
};

let songPosition = 0;
let songBlock = 0;

function songList() {
    let body = document.querySelector("body");

    body.innerHTML = `
    <div class="conteiner">
        <div class="music-player">
        </div>
    </div>

    <script src="script.js"></script>`;

    let musicPlayer = document.querySelector(".music-player");

    for (let a = 0; a <= songsLibrary.songSource.length - 1; a++) {
        musicPlayer.innerHTML = musicPlayer.innerHTML + `<div class= "list-song-box">
    <button onclick="songSelection(${a})">
    <div class="image-box">
    <img src="${songsLibrary.songImage[a]}" alt="band image">
    </div>
    <span class="name">${songsLibrary.songNames[a]}</span>
    </button>
    </div>`;

    }
}
// Creating playlist page end //

// Creating music page //
function songSelection(selection) {

    let body = document.querySelector("body");
    body.innerHTML = `<div class="conteiner">
    <div class="music-player">
        <nav>
            <div class="back-button-box" onclick="songList()">
                <img src="ico/angle-left-solid.svg" alt="back arrow"></a>
            </div>
            <div class="volume-button-box">
                <button class="volume-button"><img src="ico/volume-low-solid.svg" alt="volume"></button>
                <div class="volume-box">
                    <input type="range" value="0" id="volume-bar">
                </div>
            </div>
        </nav>
        <div class="song-image-content">
            <div class="song-image-box">
            
            </div>
        </div>
        <div class="song-info">
            <h1 class="song-name"></h1>
            <p class="band-name"></p>
        </div>

        <div class="audio-box">
            <audio controls hidden id="song">

            </audio>
            <input type="range" value="0" id="slide-progress-bar">
        </div>

        <div class="buttons">
            <button class="previous-song-button" onclick="previousSong()">
                <img src="ico/angles-left-solid.svg" alt="previous song image">
            </button>
            
            <button class="play-button" onclick="playPause()">
                <img src="ico/play-solid.svg" alt="play image" id="play-solid" class="play">
            </button>

            <button class="next-song-button" onclick="nextSong()">
                <img src="ico/angles-right-solid.svg" alt="next song image">
            </button>
        </div>
    </div>
</div>

    <script src="script.js"></script>`;


    let previousSongButton = document.querySelector(".previous-song-button");
    let nextSongButton = document.querySelector(".next-song-button");

    songPosition = selection;
    songBlock = selection;

    slideProgress = document.querySelector("#slide-progress-bar");
    song = document.querySelector("#song");
    controlIcon = document.querySelector("#play-solid");
    volumeBar = document.querySelector("#volume-bar");

    songName = document.querySelector(".song-name");
    bandName = document.querySelector(".band-name");
    image = document.querySelector(".song-image-box");
    


    songName.innerText = songsLibrary.songNames[songPosition];
    bandName.innerText = songsLibrary.songBand[songPosition];
    image.innerHTML = `<img src="${songsLibrary.songImage[songPosition]}" alt="suicideboys image" class="song-image">`;
    song.innerHTML = `<source src="${songsLibrary.songSource[songPosition]}" type="audio/mpeg">`;

    song.onloadedmetadata = function () {
        slideProgress.max = Math.round(song.duration);
        slideProgress.value = song.currentTime;
        volumeBar.value = 50;
        song.volume = volumeBar.value / 100;
        song.play();
        controlIcon.src = "ico/pause-solid.svg";
        controlIcon.className = "pause";
    }

    if(songBlock === songsLibrary.songSource.length - 1) {
        nextSongButton.style = "visibility: hidden;";
    }

    if(songBlock === 0) {
        previousSongButton.style = "visibility: hidden;";
    }

    volumeBar.onchange = function() {
        song.volume = volumeBar.value / 100;
    }
    
    slideProgress.onchange = function() {
        song.play();
        song.currentTime = slideProgress.value;
        controlIcon.src = "ico/pause-solid.svg";
        controlIcon.className = "pause";
    }

    
    if (song.play()) {
        setInterval(() => {
            slideProgress.value = song.currentTime;
            if ((slideProgress.value === slideProgress.max) && (songBlock !== songsLibrary.songSource.length - 1)) {
                nextSong("autoPlay");
            }
        }, 500)

    }
}
songList();
// Creating music page end //

// Buttons Code //
function nextSong(autoPlay) {
    let previousSongButton = document.querySelector(".previous-song-button");
    let nextSongButton = document.querySelector(".next-song-button");

    songBlock += + 1; // Looking if the button needs to be hidden //
    songPosition += + 1;
    songName.innerText = songsLibrary.songNames[songPosition];
    bandName.innerText = songsLibrary.songBand[songPosition];
    image.innerHTML = `<img src="${songsLibrary.songImage[songPosition]}" alt="suicideboys image" class="song-image">`;
    song.innerHTML = `<source src="${songsLibrary.songSource[songPosition]}" type="audio/mpeg">`;
    
    song.load();
    controlIcon.src = "ico/play-solid.svg";
    controlIcon.className = "play";

    if(autoPlay) { 
        song.play();
        controlIcon.src = "ico/pause-solid.svg";
        controlIcon.className = "pause";
    }

    if(songBlock === songsLibrary.songSource.length - 1) {
        nextSongButton.style = "visibility: hidden;";
    }

    if(songBlock === 1) {
        previousSongButton.style = "visibility: visible;";
    }
}

function previousSong() {
    let previousSongButton = document.querySelector(".previous-song-button");
    let nextSongButton = document.querySelector(".next-song-button");

    songBlock += - 1;
    songPosition += - 1;
    songName.innerText = songsLibrary.songNames[songPosition];
    bandName.innerText = songsLibrary.songBand[songPosition];
    image.innerHTML = `<img src="${songsLibrary.songImage[songPosition]}" alt="suicideboys image" class="song-image">`;
    song.innerHTML = `<source src="${songsLibrary.songSource[songPosition]}" type="audio/mpeg">`;
    
    song.load();
    controlIcon.src = "ico/play-solid.svg";
    controlIcon.className = "play";

    if(songBlock !== songsLibrary.songSource.length - 1) {
        nextSongButton.style = "visibility: visible;";
    }

    if(songBlock === 0) {
        previousSongButton.style = "visibility: hidden;";
    }
}


function playPause() {
    if(controlIcon.classList.contains("play")) {
        song.play();
        controlIcon.src = "ico/pause-solid.svg";
        controlIcon.className = "pause";
    }

    else if(controlIcon.classList.contains("pause")) {
        song.pause();
        controlIcon.src = "ico/play-solid.svg";
        controlIcon.className = "play";
    }
}
// Buttons Code end //


