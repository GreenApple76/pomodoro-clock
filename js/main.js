var prevBreakLength = 300;
var prevSessionLength = 1500;
var breakLength = 300;
var sessionLength = 1500;
var sessionId;
var breakId;
var disableAdjustments = false;

$(document).ready(function() {

$('.breakLess').click(function() {
	// decrease break length by 60 seconds if break length is greater than 60 seconds
	// and length adjustments are not disabled
	if (breakLength > 60 && !disableAdjustments) {
		breakLength = parseInt(breakLength - 60);
		prevBreakLength = breakLength;
		$('.breakLength').text(breakLength/60);
	}
});

$('.breakMore').click(function() {
	// increase break length by 60 seconds if length adjustments are not disabled
	if (!disableAdjustments) {
		breakLength = parseInt(breakLength + 60);
		prevBreakLength = breakLength;
		$('.breakLength').text(breakLength/60);
	}
});

$('.sessionLess').click(function() {
	// decrease sessionLength by 60 seconds if session length is greater than 60 seconds
	// and length adjustments are not disabled
	if (sessionLength > 60 && !disableAdjustments) {
		sessionLength = parseInt(sessionLength - 60);
		prevSessionLength = sessionLength;
		$('.sessionLength').text(parseInt(sessionLength/60));
		$('h3').text('Session');
		$('.sessionCounter').text(displayTime(sessionLength));
	}
});

$('.sessionMore').click(function() {
	// increase break length by 60 seconds if length adjustments are not disabled
	if (!disableAdjustments) {
		sessionLength = parseInt(sessionLength + 60);
		prevSessionLength = sessionLength;
		$('.sessionLength').text(parseInt(sessionLength/60));
		$('h3').text('Session');
		$('.sessionCounter').text(displayTime(sessionLength));
	}
});

$('.startSession').click(function() {
	// disable length adjustment controls when session counter is running
	disableAdjustments = true;
	sessionId = setInterval(startSession, 1000);
});

$('.reset').click(function() {
	clearInterval(sessionId);
	clearInterval(breakId);
	breakLength = prevBreakLength;
	sessionLength = prevSessionLength;
	$('.sessionLength').text(parseInt(sessionLength/60));
	$('.breakLength').text(breakLength/60);
	$('h3').text('Session');
	$('.sessionCounter').text(displayTime(sessionLength));
	// enable length adjustment controls when session/break counter has stopped
	disableAdjustments = false;
});

function startSession() {
		// if session has ended start break time countdown
		if (sessionLength === 0) {
			clearInterval(sessionId);
			startBreak();
		}
		$('h3').text('Session Time Left');
		$('.sessionCounter').text(displayTime(sessionLength));
		sessionLength--;
}

function startBreak() {
		breakId = setInterval(function() {

		// stop countdown if breakLength reaches 0 minutes
		if (breakLength === 0) {
			clearInterval(breakId);
		}
		$('h3').text('Break Time Left')
		$('.sessionCounter').text(displayTime(breakLength));
		breakLength--;
	}, 1000);
}

function displayTime(timeLeft) {
	// calculate amount of minutes and seconds left in session or break
	// and return the formated result in 'MM:SS'
	var minutes = parseInt(timeLeft / 60);
	var seconds = parseInt(timeLeft % 60);
	if (seconds < 10) {
		seconds = '0' + seconds; 
	}
	return minutes + ':' + seconds;
}

});