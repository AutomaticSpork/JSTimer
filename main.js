var minutes = 10;

var people = [ 'Aaron', 'Jaren' ];

var bar;

function getCurrentPerson() {
  var date = new Date();
  var minuteType = Math.floor(date.getMinutes() / minutes) % 2;
  return date.getDate() % 2 == 0 ? (1 - minuteType) : minuteType;
}

function getSecondsLeft() {
  var date = new Date();
  return (minutes - date.getMinutes() % minutes)*60 - date.getSeconds();
}

FavIconX.config({
  borderColor: '#009900',
  borderWidth: 2,
  fillColor: '#009900'
});

var formatString = (num, base) => ('00' + num.toString(base)).substr(-2);
var alertText;
var switched = false;
document.addEventListener('DOMContentLoaded', function() {
  bar = new ProgressBar.Circle('div#container', {
    strokeWidth: 6,
    easing: 'easeInOut',
    duration: 1400,
    color: '#e74c3c',
    trailColor: '#eee',
    trailWidth: 6,
    svgStyle: null,
    from: {color: '#e74c3c'},
    to: {color: '#3498db'},
    text: {
      autoStyleContainer: false,
    },
    step: (state, bar) => {
      bar.path.setAttribute('stroke', state.color);
      if(bar && bar.text) {
        bar.text.style.color = state.color;
        var text = document.getElementById('text');
        text.style.color = state.color;
      }
    },
  });

  bar.set(getSecondsLeft()/(minutes * 60));
  bar.setText('Loading');
  bar.text.style.fontFamily = 'Helvetica, sans-serif';
  document.getElementById('text').style.fontFamily = 'Helvetica, sans-serif';
  bar.text.style.fontSize = '100px';

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
          bar.set(1.0);
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
    bar.set(timeRemaining/(minutes * 60));
    FavIconX.setValue(Math.floor(100*timeRemaining/(minutes * 60)));
    text.innerHTML = currentPerson + "'s turn<br />";
  }, 500);
});

