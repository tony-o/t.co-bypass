// ==UserScript==
// @name        t.co bypass
// @namespace   http://darcsys.com
// @include     https://twitter.com/*
// @include     https://tweetdeck.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1
// @grant       none
// ==/UserScript==

$(document).bind('DOMSubtreeModified', function(){
  $("a[data-touched!='true']").each(function(){
    $(this).attr("data-touched", "true");
    if($(this).attr("href").match("//t.co/")){
      $(this).attr("href", $(this).attr("data-expanded-url") != "" ? $(this).attr("data-expanded-url") : $(this).attr("title"));
    }
  });
});

