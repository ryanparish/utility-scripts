var player = GetPlayer();
var kdsTimer = player.GetVar("kdsTimer");

// declare timer variable
var time;

function startTimer() {
    // save the current time on slide load/timeline event whatever storyline provides
    startTime = new Date();
    // save the timer into a variable so we can stop it later
    timerInterval = setInterval(function () {
        // save the time difference into a var for reference
        time = time_diff(startTime);
        // used only for displaying
        timer.textContent = time;
    }, 1000); // 1000 = 1 second or milliseconds
    player.SetVar("kdsTimer", time);
}
// function to stop timer and calculate elapsed time
// function stopTimer() {
//   // variable to capture time when timer is stopped i.e. timeline finished/ activity over
//   var stopTime = new Date();
//   // clear the interval
//   clearInterval(timerInterval);
//   // calculate time difference between the start and stop
//   var timeElapsed = stopTime - startTime;
//   // figure out minutes and seconds 
//   var minutes = Math.floor(timeElapsed / 60000);
//   var seconds = Math.floor(((timeElapsed % 60000) / 1000).toFixed(0));
//   // used only for display
//   totalTime. textContent = minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
// }
// function to work out the difference in time by milliseconds and display them
function time_diff(time) {
    var diff = new Date() - time;
    var msec = diff;
    var mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    var ss = Math.floor(msec / 1000);
    msec -= ss * 1000;
    return mm < 10 && ss < 10 ? `0${mm}:0${ss}` : mm < 10 ?? ss > 10 ? `0${mm}:${ss}` : `${mm}:${ss}`;
}




