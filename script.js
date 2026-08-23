//stars in the backgorund function

function createStars() {
  const starContainer = document.getElementById("stars");

  for (let i = 0; i < 50; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    // random positions, this unideally will make the snow appear in random places everytime the page loads
    star.style.left = Math.random() * window.innerWidth + "px";
    star.style.top = Math.random() * window.innerHeight + "px";

    // random animation speed
    star.style.animationDuration = 3 + Math.random() * 3 + "s";

    starContainer.appendChild(star);
  }
}

createStars();

//music function

const audio = document.getElementById("bg-music");
const playPauseBtn = document.getElementById("play-pause");
const playIcon = document.getElementById("play-icon");
const backBtn = document.querySelector(".back-btn");
const nextBtn = document.querySelector(".next-btn");
const songTitle = document.getElementById("song-title");

// array with the soundtracks
const playlist = [
  { name: "SUBWOOFER LULLABY", file: "1-03. Subwoofer Lullaby.mp3" },
  { name: "MICE ON VENUS", file: "1-11. Mice on Venus.mp3" },
];

let currentSong = 0;

//Load a song by index
function loadSong(index) {
  audio.src = `soundtracks/${playlist[index].file}`;
  songTitle.textContent = playlist[index].name;
}

// Loads the first song automatically
loadSong(currentSong);

//Play and Pause
playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playIcon.src = "images/pausebutton.png";
  } else {
    audio.pause();
    playIcon.src = "images/playbutton.png";
  }
});

//next and prevous songs buttons to toggel between songs
nextBtn.addEventListener("click", () => {
  currentSong = (currentSong + 1) % playlist.length;
  loadSong(currentSong);
  audio.play();
  playIcon.src = "images/pausebutton.png";
});

backBtn.addEventListener("click", () => {
  currentSong = (currentSong - 1 + playlist.length) % playlist.length;
  loadSong(currentSong);
  audio.play();
  playIcon.src = "images/pausebutton.png";
});

/*Music visualizer code adapted for this project
THIS IS NOT MY CODE!! Original code by Lightning417, Stack Overflow https://stackoverflow.com/questions/49061023/how-to-create-a-javascript-audio-visualizer
Edited and integrated into this program for aesthetic purposes only 
*/
const canvas = document.getElementById("music-visualizer");
const ctx = canvas.getContext("2d");

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const source = audioCtx.createMediaElementSource(audio);
const analyser = audioCtx.createAnalyser();
source.connect(analyser);
analyser.connect(audioCtx.destination);

analyser.fftSize = 64;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

function drawRetroWave() {
  requestAnimationFrame(drawRetroWave);

  analyser.getByteFrequencyData(dataArray);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const centerY = canvas.height / 2;
  const segmentWidth = canvas.width / bufferLength;

  for (let i = 0; i < bufferLength; i++) {
    const magnitude = dataArray[i] / 255; // 0 to 1
    const lineHeight = magnitude * canvas.height * 0.9;

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - i * segmentWidth, centerY - lineHeight / 2);
    ctx.lineTo(canvas.width / 2 - i * segmentWidth, centerY + lineHeight / 2);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 + i * segmentWidth, centerY - lineHeight / 2);
    ctx.lineTo(canvas.width / 2 + i * segmentWidth, centerY + lineHeight / 2);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

audio.addEventListener("play", () => {
  if (audioCtx.state === "suspended") audioCtx.resume();
  drawRetroWave();
});
/*Music visualizer code adapted for this project
THIS IS NOT MY CODE!! Original code by Lightning417, Stack Overflow https://stackoverflow.com/questions/49061023/how-to-create-a-javascript-audio-visualizer
Edited and integrated into this program for aesthetic purposes only 
*/

//pop up windows
const howToPlayBtn = document.getElementById("howToPlayBtn");
const howToPlayWindow = document.getElementById("howToPlayWindow");
const closeBtn = document.querySelector(".close-btn");

howToPlayBtn.addEventListener("click", () => {
  howToPlayWindow.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  howToPlayWindow.style.display = "none"; // to hide the window
});

const creditsBtn = document.getElementById("creditsBtn");
const creditsWindow = document.getElementById("creditsWindow");
const closeBtnC = document.querySelector(".close-btn-c");

creditsBtn.addEventListener("click", () => {
  creditsWindow.style.display = " block";
});

closeBtnC.addEventListener("click", () => {
  creditsWindow.style.display = "none";
});

//game layer
const startBtn = document.getElementById("startButton");
const gameWindow = document.getElementById("gameOverlay");

startBtn.addEventListener("click", () => {
  gameWindow.style.display = "block";
});

//the star function repeated on the second layer
function createStars2() {
  const starContainer = document.getElementById("stars2");

  for (let i = 0; i < 50; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    star.style.left = Math.random() * window.innerWidth + "px";
    star.style.top = Math.random() * window.innerHeight + "px";

    star.style.animationDuration = 3 + Math.random() * 3 + "s";

    starContainer.appendChild(star);
  }
}

createStars2();

//mini music button
const miniBtn = document.getElementById("musicMiniBtn");
const miniIcon = document.getElementById("miniMusicIcon");

miniIcon.src = "images/audiomuticon.png";

// Update icon whenever audio starts playing
audio.addEventListener("play", () => {
  miniIcon.src = "images/audioicon.png";
});

// Update icon whenever audio is paused
audio.addEventListener("pause", () => {
  miniIcon.src = "images/audiomuticon.png";
});

// button toggles play/pause
miniBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

//game

var board;
var playerO = "<img src='images/o.png' alt='O' class='player-icon'>";
var playerx = "<img src='images/x.png' alt='X' class='player-icon'>";
//first player to start is X
var currentplayer = playerx;

window.onload = function () {
  setGame();
};

// 3x3 array to have our board blocks in
function setGame() {
  board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      //makin a div, the div looks like <div id='0-0'></div> and then <div id='0-1'></div> etc
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      if (r == 0 || r == 1) {
        tile.classList.add("horizontal-line");
      }
      if (c == 0 || c == 1) {
        tile.classList.add("vertical-line");
      }
      //call out the function tileClicked when a player chooses a tile and clicks itt
      tile.addEventListener("click", tileClicked);
      //this will take the div tag we made and insert it 9 times in the gameboard
      document.getElementById("gameBoard").append(tile);
    }
  }
}

function tileClicked() {
  let coords = this.id.split("-");
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);

  // Prevent placing in a used tile
  if (board[r][c] != " ") return;

  // Place player symbol on screen + board array
  board[r][c] = currentplayer === playerx ? "X" : "O";
  this.innerHTML = currentplayer;

  // Check for winner
  if (checkWinner()) {
    updateScore();
    setTimeout(resetBoard, 800);
    return;
  }

  // check a draw
  if (isBoardFull()) {
    setTimeout(resetBoardNoWin, 800);
    return;
  }

  // Switch player
  currentplayer = currentplayer === playerx ? playerO : playerx;
}

//Winner checking
function checkWinner() {
  // Rows
  for (let r = 0; r < 3; r++) {
    if (
      board[r][0] != " " &&
      board[r][0] == board[r][1] &&
      board[r][1] == board[r][2]
    )
      return true;
  }

  // Columns
  for (let c = 0; c < 3; c++) {
    if (
      board[0][c] != " " &&
      board[0][c] == board[1][c] &&
      board[1][c] == board[2][c]
    )
      return true;
  }

  // Diagonals
  if (
    board[0][0] != " " &&
    board[0][0] == board[1][1] &&
    board[1][1] == board[2][2]
  )
    return true;

  if (
    board[0][2] != " " &&
    board[0][2] == board[1][1] &&
    board[1][1] == board[2][0]
  )
    return true;

  return false;
}

function updateScore() {
  if (currentplayer === playerx) {
    let score = parseInt(document.getElementById("xScore").innerText);
    document.getElementById("xScore").innerText = score + 1;
  } else {
    let score = parseInt(document.getElementById("oScore").innerText);
    document.getElementById("oScore").innerText = score + 1;
  }
}

//reset the board

function resetBoard() {
  board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ];

  document.querySelectorAll(".tile").forEach((tile) => {
    tile.innerHTML = "";
  });

  currentplayer = playerx; // X starts each round
}

//if no one wins
function isBoardFull() {
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (board[r][c] === " ") return false;
    }
  }
  return true;
}

function resetBoardNoWin() {
  board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ];

  document.querySelectorAll(".tile").forEach((tile) => {
    tile.innerHTML = "";
  });

  // hide winning line if you use one
  let line = document.getElementById("win-line");
  if (line) line.style.display = "none";

  currentplayer = playerx;
}
