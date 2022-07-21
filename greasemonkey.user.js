// ==UserScript==
// @name        t.co bypass
// @namespace   http://darcsys.com
// @include     https://twitter.com/*
// @include     https://tweetdeck.com/*
// @include     https://*.twitter.com/*
// @version     2
// @grant       none
// ==/UserScript==

const observer = new MutationObserver(function(mutations) {
    const nodes = [...document.querySelectorAll("a[href^='https://t.co/']")];
    nodes.map(node => {
        const url = [...node.childNodes].map(n => n.innerHTML ?? n.textContent).map(text => text.includes('<g>') ? 'https://' : text).filter(text => text !== '…').join('');
        node.href = url;
    });
});

const config = {
    childList: true,
    subtree: true
};

observer.observe(document.body, config);
