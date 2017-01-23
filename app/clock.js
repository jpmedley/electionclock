'use-strict';

var deadline = 'November 6, 2018 07:00:00 GMT-0500';

function getTimeRemaining(endtime){
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor( (t/1000) % 60 );
  var minutes = Math.floor( (t/1000/60) % 60 );
  var hours = Math.floor( (t/(1000*60*60)) % 24 );
  var days = Math.floor( t/(1000*60*60*24) );
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime){
  var clock = document.querySelector(id);
  var daysSpan = clock.querySelector('.days');
	var hoursSpan = clock.querySelector('.hours');
	var minutesSpan = clock.querySelector('.minutes');
	var secondsSpan = clock.querySelector('.seconds');

	function updateClock(){
	  var t = getTimeRemaining(endtime);
	  daysSpan.innerHTML = t.days;
	  hoursSpan.innerHTML = t.hours;
	  minutesSpan.innerHTML = t.minutes;
	  secondsSpan.innerHTML = t.seconds;
	  if(t.total<=0){
	    clearInterval(timeinterval);
	  }
	}

  updateClock();
  var timeinterval = setInterval(updateClock,1000);
}


initializeClock('#clockdiv', deadline);
