var switched = false;
var minutes = 10;

var people = [ 'Aaron', 'Jaren' ];

function getCurrentPerson() {
  var date = new Date();
  var minuteType = Math.floor(date.getMinutes() / minutes) % 2;
  return date.getDate() % 2 == 0 ? people[1 - minuteType] : people[minuteType];
}

document.body.onload = function() {
  switched = true;
};

setInterval(() => {
  var currentTime = new Date();
  if (currentTime.getMinutes() % minutes === 0) {
    if (!switched)
      alert('Switch! ' + getCurrentPerson() + "'s turn");
    switched = true;
  } else {
    switched = false;
  }
  var text = document.getElementById('text');
  text.innerHTML = getCurrentPerson() 
    + "'s turn<br />"
    +  (currentTime.getSeconds() === 0 ? (((minutes - currentTime.getMinutes() % minutes)) + ':00') : ((minutes - currentTime.getMinutes() % minutes) - 1)
    + ':' 
    + ( (currentTime.getSeconds() > 50 ? '0' : '') + (60 - currentTime.getSeconds()))) + ' left';
  var formatString = (num) => ('00' + num.toString(16)).substr(-2);
  var rNum = 50;
  text.style.color = '#'
    + formatString(rNum)
    + formatString(255-rNum)
    + '00';
}, 1000)
