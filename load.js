var observer = new MutationObserver(function(mutations) {
  var aTags = document.body.getElementsByTagName("a");
  for (var i = 0; i < aTags.length; i++) {
    var tag = aTags[i];

    if (tag.href && tag.href.indexOf("://t.co/") > -1) {
      tag.href = tag.getAttribute("data-expanded-url") !== "" ? tag.getAttribute("data-expanded-url") : tag.getAttribute("title");
    }
  };

});

var config = { 
  childList: true,
  subtree: true
};

observer.observe(document.body, config);