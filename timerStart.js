
function TimerStart() {
    stenciltimer = true;
}

function TimerStop() {
    stenciltimer = false;
}

function TimerReset() {
    timercurtime = timerstartat;
    timercursecs = TimerConvert('t2s'); 
    player.SetVar(timertimevar,timerstartat);
            player.SetVar(timersecvar,timercursecs);}

function TimerStep() {
    timercursecs = parseInt(player.GetVar(timersecvar));    if (timercountto == 'up') {
        timercursecs++;
    } else {
        timercursecs--;
    }
    
    timercurtime = TimerConvert('s2t');
    
    if (timercurtime==timerstopat) {
        stenciltimer = false;
    }

    player.SetVar(timertimevar,timercurtime);
        player.SetVar(timersecvar,timercursecs);}

function TimerConvert(convtype) {
    if (convtype == 't2s') {
        var tarr = timercurtime.split(':');
        return parseInt(tarr[0])*3600+parseInt(tarr[1])*60+parseInt(tarr[2]);
    } else {
        var tarr = new Date(timercursecs * 1000).toISOString().substr(11, 8);
        return tarr;
    }
}

var stenciltimer = false;
timerstartat = '00:00:00';
timerstopat = '';
timertimevar = 'kdsTimer';
timersecvar = 'secondsTimer';
timercountto = 'up';
timercurtime = timerstartat;
timercursecs = TimerConvert('t2s');
var player = GetPlayer();
    player.SetVar(timertimevar,timerstartat);
    player.SetVar(timersecvar,timercursecs);setInterval(function() { if (stenciltimer) { TimerStep(); } }, 1000);

    // if(void 0===window.stenciltimerloaded){var player=GetPlayer(),targlink="https://cluelabs.com/stencil/display/widget-timer-display?v=1651171975&chart=MjQxfDMwNjV8MjJlZDIzMzUxOTNlOTMxNjNlMTgxZmRhMTNjODFmYjE";xhttp=new XMLHttpRequest,xhttp.onreadystatechange=function(){if(4==this.readyState&&200==this.status&&""!=this.responseText){var e=this.responseText,t=document.getElementsByTagName("head")[0],n=document.createElement("script");t.appendChild(n),n.appendChild(document.createTextNode(e)),window.stenciltimerloaded=!0,player.SetVar("stencilrendered",parseInt(player.GetVar("stencilrendered"))+1)}},xhttp.open("GET",targlink,!0),xhttp.send()}