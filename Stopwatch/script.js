(function() {
    var hours = 0;
    var minutes = 0;
    var seconds = 0;
    var centiseconds = 0;
    var timerInterval;
    var laps = [];
    var startButton = document.getElementById("start");
    var pauseButton = document.getElementById("pause");
    var resetButton = document.getElementById("reset");
    var lapButton = document.getElementById("lap");
    var clearLapsButton = document.getElementById("clear-laps");
    var hoursDisplay = document.getElementById("hours");
    var minutesDisplay = document.getElementById("minutes");
    var secondsDisplay = document.getElementById("seconds");
    var centisecondsDisplay = document.getElementById("centiseconds");
    var lapsList = document.getElementById("lap-list");
  
    function formatTime(time) {
      return time < 10 ? "0" + time : time;
    }
  
    function updateTimer() {
      centiseconds++;
      if (centiseconds >= 100) {
        centiseconds = 0;
        seconds++;
        if (seconds >= 60) {
          seconds = 0;
          minutes++;
          if (minutes >= 60) {
            minutes = 0;
            hours++;
          }
        }
      }
  
      centisecondsDisplay.textContent = formatTime(centiseconds);
      secondsDisplay.textContent = formatTime(seconds);
      minutesDisplay.textContent = formatTime(minutes);
      hoursDisplay.textContent = formatTime(hours);
    }
  
    function startTimer() {
      clearInterval(timerInterval);
      timerInterval = setInterval(updateTimer, 10);
    }
  
    function pauseTimer() {
      clearInterval(timerInterval);
    }
  
    function resetTimer() {
      clearInterval(timerInterval);
      hours = 0;
      minutes = 0;
      seconds = 0;
      centiseconds = 0;
      centisecondsDisplay.textContent = "00";
      secondsDisplay.textContent = "00";
      minutesDisplay.textContent = "00";
      hoursDisplay.textContent = "00";
      /*
      laps = [];
      lapsList.innerHTML = "";
      localStorage.removeItem('laps');
      */
    }
  
    function addLap() {
      var lapTime =
        formatTime(hours) +
        ":" +
        formatTime(minutes) +
        ":" +
        formatTime(seconds) +
        ":" +
        formatTime(centiseconds);
      laps.push(lapTime);
      var lapItem = document.createElement("li");
      lapItem.textContent = lapTime;
      lapsList.appendChild(lapItem);
      saveLapsToLocalStorage();
    }
  
    function clearLaps() {
      laps = [];
      lapsList.innerHTML = "";
      localStorage.removeItem('laps');
    }
  
    function saveLapsToLocalStorage() {
      localStorage.setItem('laps', JSON.stringify(laps));
    }
  
    function retrieveLapsFromLocalStorage() {
      var storedLaps = localStorage.getItem('laps');
      if (storedLaps) {
        laps = JSON.parse(storedLaps);
        laps.forEach(function(lapTime) {
          var lapItem = document.createElement("li");
          lapItem.textContent = lapTime;
          lapsList.appendChild(lapItem);
        });
      }
    }
  
    startButton.addEventListener("click", startTimer);
    pauseButton.addEventListener("click", pauseTimer);
    resetButton.addEventListener("click", resetTimer);
    lapButton.addEventListener("click", addLap);
    clearLapsButton.addEventListener("click", clearLaps);
  
    retrieveLapsFromLocalStorage();
  })();
  