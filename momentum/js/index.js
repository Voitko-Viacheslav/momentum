


// Start clock and calendar
const time = document.querySelector('.time');

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;

}
setInterval(showTime, 1000);
showTime();

const ourDate = document.querySelector('.date');

function showDate() {
  const date = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  
  const currentDate = date.toLocaleDateString('en-US', options);
  ourDate.textContent = currentDate;
}
setInterval(showDate, 1000);
showDate(); 
// End clock and calendar


// Start welcome

// End welcome


