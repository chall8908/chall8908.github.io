(function() {
  "use strict";
  
  function setTime() {
    var el = document.getElementById('current-time');

    el.innerText = (new Date).toLocaleTimeString();
  }

  setInterval(setTime, 1000);

  setTime();
}());

(function() {
  "use strict";

  // handle browsers that don't support what I'm working with
  if(!window.history || !window.XMLHttpRequest || !document.addEventListener) {
    return;
  }

  var page = document.body,
      anchors,
      getPage = function(url) {
        var req = new XMLHttpRequest();
        req.responseType = 'document';
        req.open('GET', url);
        req.send();

        req.addEventListener('readystatechange', function() {
          var fragment;
          if(req.readyState === 4) {
            if(req.status === 200) {
              fragment = req.responseXML.body;
              page.innerHTML = fragment.innerHTML;
              applyHandlers();
            } else {
              console.log(req.status);
              // looks like something went wrong
              // just load the page normally
              window.location = url;
            }
          }
        });

        removeHandlers();
      },
      handleClick = function(e) {
        var href = this.href;
        e.preventDefault();

        window.history.pushState({}, '', href);
        getPage(href);
      },
      applyHandlers = function() {
        anchors = document.getElementsByTagName('a');
        anchors = Array.prototype.slice.call(anchors);

        anchors.forEach(function(a) {
          if(!a.classList.contains('theta-symbol')) {
            a.addEventListener('click', handleClick);
          }
        });
      },
      removeHandlers = function() {
        anchors.forEach(function(a) {
          a.removeEventListener('click', handleClick);
        });
      };

  window.addEventListener('popstate', function() {
    getPage(window.location.href);
  });

  applyHandlers();
}());
