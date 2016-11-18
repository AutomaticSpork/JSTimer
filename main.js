var minutes = 10;

var people = [ 'Aaron', 'Jaren' ];

var bar = new ProgressBar.Circle('div#container', {
  strokeWidth: 6,
  easing: 'easeInOut',
  duration: 1400,
  color: '#3498db',
  trailColor: '#eee',
  trailWidth: 6,
  svgStyle: null,
  from: {color: '#3498db'},
  to: {color: '#e74c3c'},
  step: (state, bar) => {
    bar.path.setAttribute('stroke', state.color);
  },
  text: {
    autoStyleContainer: false
  },
});

bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
bar.text.style.fontSize = '2rem';

function getCurrentPerson() {
  var date = new Date();
  var minuteType = Math.floor(date.getMinutes() / minutes) % 2;
  return date.getDate() % 2 == 0 ? (1 - minuteType) : minuteType;
}

function getSecondsLeft() {
  var date = new Date();
  return (minutes - date.getMinutes() % minutes)*60 - date.getSeconds();
}

var formatString = (num, base) => ('00' + num.toString(base)).substr(-2);
var alertText;
var switched = false;
document.addEventListener('DOMContentLoaded', function() {
  if (!Notification) {
    alert('Notifications not supported... (stop using IE)');
    return;
  }

  if (Notification.permission !== 'granted')
    Notification.requestPermission();

  setInterval(() => {
    var currentTime = new Date();
    var timeRemaining = getSecondsLeft();
    var currentPerson = people[getCurrentPerson()];
    if (timeRemaining === 1 && !switched) {
        switched = true;
        setTimeout(() => { 
          alertText = 'Switch! ' + people[getCurrentPerson()] + "'s turn";
          var notification = new Notification(alertText);
          setTimeout(() => {
            alert(alertText);
          }, 10);
        }, 750);
        return;
    } else { 
      switched = false;
    }
    var text = document.getElementById('text');
    bar.setText(Math.floor(timeRemaining/60) + ':' + formatString(timeRemaining % 60, 10));
    text.innerHTML = currentPerson
      + "'s turn<br />"
      + Math.floor(timeRemaining/60)
      + ':'
      + formatString(timeRemaining % 60, 10);
    var gNum = Math.floor(255 * (timeRemaining/(minutes*60)));
    bar.animate(timeRemaining/(minutes * 60));
    text.style.color = '#'
      + formatString(255 - gNum, 16)
      + formatString(gNum, 16)
      + '00';
  }, 500);
});

