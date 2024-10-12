const display = document.getElementById("display")
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

function start(){

  if(!isRunning){
    startTime = Date.now() - elapsedTime;
    timer = setInterval(update ,10);
    isRunning = true;
  }
};

function stop(){
  if(isRunning){ // if stopwatch is running
    clearInterval(timer);
    elapsedTime = Date.now() - startTime; //
    isRunning = false;
  };
}

function reset(){
  clearInterval(timer);
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;

  display.textContent =`00:00:00:00`;
}

function update(){

  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;

  let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  let minutes = Math.floor(elapsedTime / (1000 * 60) %60);
  let seconds = Math.floor(elapsedTime /1000 % 60);
  let milliseconds = Math.floor(elapsedTime % 1000 /10)

  hours = String(hours).padStart(2,'0');
  minutes = String(minutes).padStart(2,'0');
  seconds = String(seconds).padStart(2,'0');
  milliseconds = String(milliseconds).padStart(2,'0');

  display.textContent =`${hours}:${minutes}:${seconds}:${milliseconds}`;
};

function showTime(){
  const a = new Date();
  let hours = a.getHours();

  const b = new Date();
  let minutes = b.getMinutes();

  const c = new Date();
  let second = c.getSeconds();

  hours  = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  second = second < 10 ? '0' + second : second;

  let time = `${hours}:${minutes}:${second}`;
  
  document.getElementById("watch").innerHTML = time;

  // to update the time every 1 second
  setTimeout(showTime, 1000);
};

// to update the time every time we refresh or open the page
showTime();