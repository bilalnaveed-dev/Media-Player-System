const songs = [
  {
    title: "Pal Pal",
    artist: "AliSoomro Music",
    src: "audio/song1.mp3",
    cover: "images/cover1.jpeg",
  },
  {
    title: "BlockBuster",
    artist: "Faris X Umer X Garwi Group",
    src: "audio/song2.mp3",
    cover: "images/cover2.jpeg",
  },
  {
    title: "Kanna Yaari",
    artist: "Kaifi Khalil x Eva B x Abdul Wahab",
    src: "audio/song3.mp3",
    cover: "images/cover3.jpeg",
  },
];

let currentSong = 0;
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const playPauseBtn = document.getElementById("playPause");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const seekBar = document.getElementById("seekBar");
const volumeSlider = document.getElementById("volume");
const timeDisplay = document.getElementById("timeDisplay");

function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = song.src;
  seekBar.value = 0;
}

function togglePlayPause() {
  const icon = playPauseBtn.querySelector("i");
  if (audio.paused) {
    audio.play();
    icon.className = "bx bx-pause";
  } else {
    audio.pause();
    icon.className = "bx bx-play";
  }
}

function playNext() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  audio.play();
  playPauseBtn.querySelector("i").className = "bx bx-pause";
}

function playPrevious() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  audio.play();
  playPauseBtn.querySelector("i").className = "bx bx-pause";
}

function updateSeekBar() {
  seekBar.value = audio.currentTime;
  timeDisplay.textContent = `${Math.floor(audio.currentTime)} / ${Math.floor(audio.duration || 0)} sec`;
}

function seek() {
  audio.currentTime = seekBar.value;
}

function setVolume() {
  audio.volume = volumeSlider.value;
}

audio.addEventListener("timeupdate", updateSeekBar);
audio.addEventListener("loadedmetadata", () => {
  seekBar.max = audio.duration;
});

playPauseBtn.addEventListener("click", togglePlayPause);
nextBtn.addEventListener("click", playNext);
prevBtn.addEventListener("click", playPrevious);
seekBar.addEventListener("input", seek);
volumeSlider.addEventListener("input", setVolume);

// Initial load
loadSong(currentSong);
