// ==UserScript==
// @name        t.co bypass
// @namespace   http://darcsys.com
// @include     https://twitter.com/*
// @include     https://tweetdeck.com/*
// @include     https://tweetdeck.twitter.com/*
// @version     1
// @grant       none
// ==/UserScript==
var real_url_attrs = ['data-expanded-url', 'data-full-url', 'title'];

var observer = new MutationObserver(function(mutations) {
  var aTags = document.body.getElementsByTagName("a");
  for (var i = 0; i < aTags.length; i++) {
    var tag = aTags[i];
    if(tag.getAttribute("class") !== null && tag.getAttribute("class").indexOf("twitter-atreply") > -1){
      continue;
    }
    if (tag.href && tag.href.indexOf("://t.co/") > -1) {
      for (var attr in real_url_attrs) {
        var value = tag.getAttribute(real_url_attrs[attr]);
        if (value) {
          tag.href = value;
          break;
        }
      }
    }
  };

});

var config = { 
  childList: true,
  subtree: true
};

observer.observe(document.body, config);
