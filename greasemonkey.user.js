// ==UserScript==
// @name        t.co bypass
// @namespace   http://darcsys.com
// @include     https://twitter.com/*
// @include     https://tweetdeck.com/*
// @include     https://tweetdeck.twitter.com/*
// @version     2
// @grant       none
// ==/UserScript==

if ('undefined' == typeof __PAGE_SCOPE_RUN__) {
  (function page_scope_runner() {
    // If we're _not_ already running in the page, grab the full source
    // of this script.
    var my_src = "(" + page_scope_runner.caller.toString() + ")();";

    // Create a script node holding this script, plus a marker that lets us
    // know we are running in the page scope (not the Greasemonkey sandbox).
    // Note that we are intentionally *not* scope-wrapping here.
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = "var __PAGE_SCOPE_RUN__ = true;\n" + my_src;

    // Insert the script node into the page, so it will run, and immediately
    // remove it to clean up.  Use setTimeout to force execution "outside" of
    // the user script scope completely.
    window.setTimeout(function() {
          document.body.appendChild(script);
          //document.body.removeChild(script);
        }, 0);
  })();

  // Stop running, because we know Greasemonkey actually runs us in
  // an anonymous wrapper.
  return;
} else {
	var observer = new MutationObserver(function(mutations) {
		var aTags = document.body.getElementsByTagName("a");
		for (var i = 0; i < aTags.length; i++) {
			var tag = aTags[i];

			if (tag.getAttribute("class") !== null && tag.getAttribute("class").indexOf("twitter-atreply") > -1) {
				continue;
			}

			if (tag.href && tag.href.indexOf("://t.co/") > -1) {
				if (tag.getAttribute("data-expanded-url") !== "" && tag.getAttribute("data-expanded-url") !== null) {
					tag.href = tag.getAttribute("data-expanded-url");
				} else if (tag.getAttribute("data-full-url") !== "" && tag.getAttribute("data-full-url") !== null) {
					tag.href = tag.getAttribute("data-full-url");
				} else {
					tag.href = tag.getAttribute("title");
				}
			}
		};
	});

	var config = {
		childList: true,
		subtree: true
	};

	observer.observe(document.body, config);
}
