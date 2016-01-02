(function() {
  "use strict";
  
  function setTime() {
    var el = document.getElementById('current-time');

    el.innerText = (new Date).toLocaleTimeString();
  }

  setInterval(setTime, 1000);

  setTime();
}());
