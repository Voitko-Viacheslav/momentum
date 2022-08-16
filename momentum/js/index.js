// Импорт треков
import playList from '../playList.js';
console.log(playList);



// Start Part 1 clock and calendar

const time = document.querySelector('.time');
const ourDate = document.querySelector('.date');


function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  showDate(); 
  setInterval(showTime, 1000);
}
showTime();


function showDate() {
  const date = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  
  const currentDate = date.toLocaleDateString('en-US', options);
  ourDate.textContent = currentDate;
  // setInterval(showDate, 1000);
}

// End Part 1 clock and calendar



// Start Part 2 greeting 

 const greeting = document.querySelector('.greeting');

  function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    let result = '';
    if (hours >= 6 && hours < 12) {
      result = 'morning';
    } 
    if (hours >= 12 && hours < 18) {
      result = 'afternoon';
    } 
    if (hours >= 18 && hours <= 24 ) {
      result = 'evening';
    } 
    if (hours >= 0 && hours < 6 ) {
      result = 'night';
    } 
    return result;
  }


   const timeOfDay = getTimeOfDay();
  //  alert(greetingText)

function showGreeting() {
  greeting.textContent = `Good ${timeOfDay},`; 
}
setInterval(showGreeting, 1000);
showGreeting();


// ! Start Local Storage

function setUserFirstName() {
  const inputName = document.querySelector('.name');

  // ф. сохранения имени и переменной в localStorage
  function setLocalStorage() {
    localStorage.setItem('inputName', inputName.value);
  }
  window.addEventListener('beforeunload', setLocalStorage)
  
   // ф. получения имени и переменной
  function getLocalStorage() {
    if(localStorage.getItem('inputName')) {
      inputName.value = localStorage.getItem('inputName');
    }
  }
  window.addEventListener('load', getLocalStorage)
}
setUserFirstName();

// ! End Local Storage

// End Part 2 greeting



// Start Part 3 image slider

// https://github.com/Voitko-Viacheslav/momentum-images/blob/assets/images/afternoon/02.jpg
// document.body.style.backgroundImage = "url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/17.jpg')";

const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');


 let mins = 1, maxs = 20
 let randomNum =  Math.floor(Math.random() * (maxs - mins) + mins);

function setBg() {
  let timeOfDay = getTimeOfDay();
// если номер меньше 2 тогда дополнит с переди 0
  let bgNum = randomNum.toString().padStart(2, "0");
  const image = new Image();
//  const url = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  const url = `https://raw.githubusercontent.com/Voitko-Viacheslav/momentum-images/assets/images/${timeOfDay}/${bgNum}.jpg`;
  image.src = url;
//  console.log(url)
// ждем полную загрузку фотографии
 image.onload = () => {
  // и только после загрузки меням стиль
   document.body.style.backgroundImage = `url(${url})`;
 };
}
setBg()


// вперед
function getSlideNext() {
  if (randomNum >= 20) {
        randomNum = 1;
      } else {
        randomNum++;
      }
  setBg();
}
slideNext.addEventListener('click', getSlideNext);


// назад
function getSlidePrev() {
  if (randomNum <= 0) {
        randomNum = 20;
      } else {
        randomNum--;
      }
  setBg();
}
slidePrev.addEventListener('click', getSlidePrev);

// End Part 3 image slider



// Start Part 4 weather widget

const weather = document.querySelector('.weather');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity')
const wind = document.querySelector('.wind');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');


// Получаю все данные для вывода
async function getWeather() {
  // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=b98fcdb472724a89f5211d6c08df43d5&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp} °C`;
  humidity.textContent = `humidity ${data.main.humidity} %`
  wind.textContent = `speed ${data.wind.speed} m/c`;
  weatherDescription.textContent = data.weather[0].description;
  }


  // В начале вывожу Minsk запуская для него getWeather();
   function getLocalStorageWeather() {
    if(localStorage.getItem('city')) {
      city.value = localStorage.getItem('city');
    } else {
      city.value = 'Minsk';
    }
    getWeather();
  }


  // При условии нажатия на Enter запускаю getWeather();
  function setCity(event) {
    if (event.code === 'Enter') {
      getWeather();
      city.blur();
    }
  }
  
  
  document.addEventListener('DOMContentLoaded', getLocalStorageWeather);
  // Вещаю слушатель на keypress и запускаю setCity
  city.addEventListener('keypress', setCity);

// End Part 4 weather widget




// Start Part 5 widget 

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
const quoteWrap = document.querySelector('.quote-wrapper');


let call = 0;

async function getQuotes() {  
  const quotes = 'data.json';
  const res = await fetch(quotes);
  const data = await res.json(); 
  quote.textContent = data[call].text;
  author.textContent = data[call].author;
}
getQuotes();


let max = 20;
let min = 1;

function randomQuotes() {
  call = Math.floor(Math.random() * (max - min) + min);
  getQuotes();
};


changeQuote.addEventListener('click', randomQuotes);
window.onload = randomQuotes();

// End Part 5 widget



// Start Part 6 Audio Player

const audio = document.querySelector('.audio');
const play = document.querySelector('.play');
const playPrev = document.querySelector('.play-prev');
const playNext = document.querySelector('.play-next');
const playListMusic = document.querySelector('.play-list');
const player = document.querySelector('.player');


//включаем воспроизведение
function playAudio() {
  // trek будет проигрываться с начала
  audio.currentTime = 0;
  // Обращаемся к треку
  audio.src = playList[playNum].src; 
  // меняем картинку на Pause
  play.classList.add('pause');
  // пустой класс для включения и остановки звука
  player.classList.add('pl');
  audio.play();
}


// Останавливаем воспроизвидение
function pauseAudio() {
    // меняем картинку на Pause
    play.classList.remove('pause');
    // пустой класс для включения и остановки звука
    player.classList.remove('pl');
  audio.pause();
}


// остановка включение трека 
play.addEventListener('click', () => {
  const checkSound = player.classList.contains('pl');
  if(checkSound) {
    pauseAudio()
  } else {
    playAudio();
  }
});


// треки, начало с 0
let playNum = 0;


// следующий трек
function nextSong() {
  playNum++;

  if (playNum > playList.length - 1) {
    playNum = 0;
  }
  playAudio();
}
playNext.addEventListener('click', nextSong);


//  предыдущий трек
function prevSong() {
  playNum --;

  if (playNum < 0) {
    playNum = playList.length - 1;
  }
  playAudio();
}
playPrev.addEventListener('click', prevSong);


// Создаю елементы песни
function loadSong() {
  for(let i = 0; i < playList.length; i++) {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = playList[i].title;
    playListMusic.append(li);
  }
}
loadSong();

// проигрываем следующую композицию
audio.addEventListener('ended', nextSong);

// End Part 6 Audio Player



// Start Part 7 Advanced  Audio Player

const myPlayer = document.querySelector('.my-player');
const playBtn = document.querySelector('.play-btn');
const playPrevBtn = document.querySelector('.play-prev-btn');
const playNextBtn = document.querySelector('.play-next-btn');
const song = document.querySelector('.song');
const myPlayerAudio = document.querySelector('.my-player-audio');
const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');
const playTime = document.querySelector('.play-time');
const currentPlayTime = document.querySelector('.current-play-time');
const myPlayListMusic = document.querySelector('.my-play-list');

// включаем воспроизведение
function myPlayAudio() {
  // trek будет проигрываться с начала
  myPlayerAudio.currentTime = 0;
  // Обращаемся к треку
  myPlayerAudio.src = playList[myPlayNum].src; 
  // меняем картинку на Pause
  playBtn.classList.add('pause');
  myPlayer.classList.add('pl');
  myPlayerAudio.play();
}


// Останавливаем воспроизвидение
function myPauseAudio() {
  // меняем картинку на Play
  playBtn.classList.remove('pause');
  // пустой класс для включения и остановки звука
  myPlayer.classList.remove('pl');
  myPlayerAudio.pause();
}

// Включение выключение песни
playBtn.addEventListener('click', () => {
  const checkMySound  = myPlayer.classList.contains('pl');
  if(checkMySound) {
    myPauseAudio();
  } else {
    myPlayAudio();
    // setProgress();
  }
});


// треки, начало с 0
let myPlayNum = 0;


// следующий трек
function myNextSong() {
  myPlayNum++;
  if (myPlayNum > playList.length - 1) {
    myPlayNum = 0;
  }
  myPlayAudio();
  myLoadSong();
  // setProgress();
}
playNextBtn.addEventListener('click', myNextSong);


//  предыдущий трек
function myPrevSong() {
  myPlayNum --;
  if (myPlayNum < 0) {
    myPlayNum = playList.length - 1;
  }
  myPlayAudio();
  myLoadSong();
  // setProgress();
}
playPrevBtn.addEventListener('click', myPrevSong);


// Создаю елемент песни
function myLoadSong() {
  song.textContent = playList[myPlayNum].title;
}
myLoadSong();

let myLi;
// Создаю елементы песни
function myLoadSongList() {
  for(let i = 0; i < playList.length; i++) {
    myLi = document.createElement('li');
    myLi.classList.add('play-item');
    myLi.textContent = playList[i].title;
    myPlayListMusic.append(myLi);
  }   
}
myLoadSongList();


// Прогресс бар
function updateProgress(data) {
  // через дестукторизацию достаем из песни (data.srcElement;) длительность и текущее время
  const {duration, currentTime} = data.srcElement;
  // текущее время делим на длительность и получаем проценты песни 
  const progressPercent = (currentTime / duration) * 100;
  // в прогресс помещаем проценты
  progress.style.width = `${progressPercent}%`
}
myPlayerAudio.addEventListener('timeupdate', updateProgress);


// Перемотка прогресса
function setProgress(data) {
  // берем ширину контейнера 
  const widthProgress = this.clientWidth;
  // поиск координаты где кликнули (отступ от начала)
  const clickX = data.offsetX;
  // длинна трека
  const duration = myPlayerAudio.duration;
  myPlayerAudio.currentTime = (clickX / widthProgress) * duration;
}
progressContainer.addEventListener('click', setProgress);


// проигрываем следующую композицию
myPlayerAudio.addEventListener('ended', myNextSong);


// // время трека
// function updateTime () {
//   playTime.innerHTML = Math.floor(myPlayerAudio.duration);
//   if (myPlayerAudio.duration < 60) {
//     playTime.innerHTML = '00:' + Math.floor(myPlayerAudio.duration);
//   }
//   if (myPlayerAudio.duration > 60) {
//     playTime.innerHTML = '1:' +  (Math.floor(myPlayerAudio.duration) - 60) ;
//   }
//   updateCurrentTime();
// }
// setInterval(updateTime, 1000)
// // myPlayerAudio.addEventListener('timeupdate', updateTime);

// // текущее время трека
// function updateCurrentTime () {
//   currentPlayTime.innerHTML = '0:' + '0' + Math.floor(myPlayerAudio.currentTime);
//   if (myPlayerAudio.currentTime > 10) {
//     currentPlayTime.innerHTML = '0:' + Math.floor(myPlayerAudio.currentTime) ;
//   }
//   if (myPlayerAudio.currentTime > 60) {
//     currentPlayTime.innerHTML = '1:' + '0' + (Math.floor(myPlayerAudio.currentTime) - 60) ;
//   }
//   if (myPlayerAudio.currentTime > 70) {
//     currentPlayTime.innerHTML = '1:' + (Math.floor(myPlayerAudio.currentTime) - 60) ;
//   }
// }
// // myPlayerAudio.addEventListener('timeupdate', updateCurrentTime, 1000);

// время трека
function updateTime () {
  currentPlayTime.innerHTML = updateCurrentTime(Math.floor(myPlayerAudio.currentTime)) ;
  if (playTime.innerHTML === "NaN:NaN") {
    playTime.innerHTML = "0:00";
  } else {
    playTime.innerHTML = (updateCurrentTime(Math.floor(myPlayerAudio.duration)));
  }
}

// текущее время трека
function updateCurrentTime (seconds) {
  let min = Math.floor((seconds / 60));
  let sec = Math.floor(seconds - (min * 60));
  if (sec < 10){ 
      sec  = `0${sec}`;
  };
  return `${min}:${sec}`;
}
setInterval(updateTime, 1000);

// End Part 7 Advanced  Audio Player



// Start Part 10 Application settings

const applicationSettings = document.querySelector('.application-settings');
const tableApplicationSettings = document.querySelector('.table-application-settings');

const standartPlayerHide = document.querySelector('.standart-player-hide');
const standartPlayerDisplay = document.querySelector('.standart-player-display');
const myPlayerHide = document.querySelector('.my-player-hide');
const myPlayerDisplay = document.querySelector('.my-player-display');
const weatherHide = document.querySelector('.weather-hide');
const weatherDisplay = document.querySelector('.weather-display');
const timeHide = document.querySelector('.time-hide');
const timeDisplay = document.querySelector('.time-display'); 
const dateHide = document.querySelector('.date-hide');
const dateDisplay = document.querySelector('.date-display');
const greetingHide = document.querySelector('.greeting-hide');
const greetingDisplay = document.querySelector('.greeting-display'); 
const quoteHide = document.querySelector('.quote-hide');
const quoteDisplay = document.querySelector('.quote-display'); 


// Hide Application settings
applicationSettings.addEventListener('click', () => {
  tableApplicationSettings.classList.toggle('hide-application-settings');
})

// Hide стандартный player
standartPlayerHide.addEventListener('click', () => {
  player.classList.add('table-application-settings');
})
standartPlayerDisplay.addEventListener('click', () => {
  player.classList.remove('table-application-settings');
})


// Hide my player
myPlayerHide.addEventListener('click', () => {
  myPlayer.classList.add('table-application-settings');
})
myPlayerDisplay.addEventListener('click', () => {
  myPlayer.classList.remove('table-application-settings');
})


// Hide weather
weatherHide.addEventListener('click', () => {
  weather.classList.add('table-application-settings');
})
weatherDisplay.addEventListener('click', () => {
  weather.classList.remove('table-application-settings');
})


// Hide time
timeHide.addEventListener('click', () => {
  time.classList.add('table-application-settings');
})
timeDisplay.addEventListener('click', () => {
  time.classList.remove('table-application-settings');
})


// Hide date
dateHide.addEventListener('click', () => {
  ourDate.classList.add('table-application-settings');
})
dateDisplay.addEventListener('click', () => {
  ourDate.classList.remove('table-application-settings');
})


// Hide greeting
greetingHide.addEventListener('click', () => {
  greeting.classList.add('table-application-settings');
})
greetingDisplay.addEventListener('click', () => {
  greeting.classList.remove('table-application-settings');
})


// Hide quote
quoteHide.addEventListener('click', () => {
  quoteWrap.classList.add('table-application-settings');
})
quoteDisplay.addEventListener('click', () => {
  quoteWrap.classList.remove('table-application-settings');
})

// End Part 10 Application settings






























// // Start Part 6 Audio Player
// const audio = document.querySelector('.audio');

// const play = document.querySelector('.play');
// const playPrev = document.querySelector('.play-prev');
// const playNext = document.querySelector('.play-next');

// const playListMusic = document.querySelector('.play-list')
// // const playListContainer = document.querySelector('.player-controls');


// const songs = ['Aqua Caelestis', 'Ennio Morricone',
// 'River Flows In You', 'Summer Wind']; 

// let songIndex = 0;


// function loadSong(song) {
//   playListMusic.innerHTML = song;
//   audio.src = `./assets/sounds/${song}.mp3`;
  
//   // const li = document.createElement('li');
//   // li.classList.add('.play-item');
//   // li.innerHTML = song;
//   // // playListMusic.append(songs[0]);
//   // audio.src = `./assets/sounds/${song}.mp3`;
  
//   // for(let i = 0; i < songs.length; i++) {
//   //   playListMusic.append(songs[i]);
//   // }
// }
// loadSong(songs[songIndex]);


// function playAudio() {
//   audio.currentTime = 0;
//   audio.play();
// }

// function pauseAudio() {
//   audio.pause();
// }

// let isPlay = false;

// function checkSound() {
//   if(isPlay == false) {
//     playAudio();
//     isPlay = true;
//   } else if (isPlay == true) {
//     pauseAudio()
//     isPlay = false;
//   }
// }


// function toggleBtn() {
//   play.classList.toggle('pause');
//   checkSound()
// }
// play.addEventListener('click', toggleBtn);




// function nextSong() {
//   songIndex ++;

//   if (songIndex > songs.length - 1) {
//     songIndex = 0;
//   }
//   loadSong(songs[songIndex]);
//   playAudio();
// }

// playNext.addEventListener('click', nextSong);



// function prevSong() {
//   songIndex --;

//   if (songIndex < 0) {
//     songIndex = songs.length - 1;
//   }
//   loadSong(songs[songIndex]);
//   playAudio();
// }

// playPrev.addEventListener('click', prevSong);










// // let isPlay = false;

// // function playAudio() {
// //   audio.currentTime = 0;
// //   audio.play();
// // }

// // function pauseAudio() {
// //   audio.pause();
// // }

// // function checkSound() {
// //   if(isPlay == false) {
// //     playAudio();
// //     isPlay = true;
// //   } else if (isPlay == true) {
// //     pauseAudio()
// //     isPlay = false;
// //   }
// // }

// // function toggleBtn() {
// //   play.classList.toggle('pause');
// //   checkSound();
// // }
// // play.addEventListener('click', toggleBtn);



// // let playNum = 0;

// // function playNextMusic() {
// //   audio.src = playList[playNum].src;
// // }

// // function playPrevMusic() {

// // }

// // const li = document.createElement('li');
// // li.classList.add('.play-item');
// // li.textContent = playList.title;

// // for(let i = 0; i < playListMusic.length; i++) {
// //   playListMusic.append('li')[i];
// // }


// // End Part 6 Audio Player

