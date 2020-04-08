// ==UserScript==
// @name     ÜBiB
// @version  2
// @grant    none
// @match https://*.dw.com/*
// @match https://*.netflix.com/*
// @match https://*.youtube.com/*
// @match https://docs.google.com/*
// @match https://genius.com/*
// @match https://*.de/*
// ==/UserScript==

// Übersetzer Bild im Bild
// A userscript that allows picture in picture google translate on websites you chooses!

// Global preferences
var showByDefault = false;
var fromLang = "de";
var toLang = "en";


// Default preferences
var frameWidth = 500;
var frameHeight = 600;
var buttonTop = 10;
var buttonRight = 10;
var flipLangs = false;
var windowOpen = false;

// Site by site preferences
if (siteIncludes("docs.google.com"))
{
  frameWidth = 700;
	frameHeight = 1000;
	buttonTop = 65;
	buttonRight = 55;
	flipLangs = true;
}
else if (siteIncludes("youtube.com"))
{
  frameWidth = 500;
	frameHeight = 600;
	buttonTop = 65;
	buttonRight = 10;
	flipLangs = false;
  var t=setInterval(hideButton,500);
}

// Reverse  the default translation order
// de -> en goes to en -> de
if (flipLangs)
{
	var temp = toLang;
  toLang = fromLang;
  fromLang = temp;
}

var url = "https://translate.google.com/#view=home&op=translate&sl=" + fromLang + "&tl=" + toLang;
var css = "position: fixed; top: " + buttonTop.toString() + "px; right: " + buttonRight.toString() + "px; background: #fff -ms-zoom: 0.75; -moz-transform: scale(0.75); -moz-transform-origin: top right;  z-index: 9999;";
var elem = document.createElement("div");
elem.id = "bib";
elem.style = css;

// Ahhh making HTML in Vanilla JS is so tedious :(

var buttonBar = document.createElement("div");
buttonBar.style = "right: 0; position: absolute;";
elem.appendChild(buttonBar);

var toggleBtn = document.createElement("button");
toggleBtn.onclick = toggle;
toggleBtn.innerHTML = "ÜBIB";
buttonBar.appendChild(toggleBtn);

var iframe = document.createElement("iframe");
iframe.id = "googleFrame";
iframe.src = url;

iframe.width = frameWidth.toString() + "px";
iframe.height = frameHeight.toString() + "px";

elem.appendChild(iframe);
document.body.appendChild(elem);

function siteIncludes(site)
{
 	return window.location.href.includes(site);
}

function toggle()
{
  if (iframe.style.display === "none") {
    iframe.style.display = "block";
    windowOpen = true;
  } else {
    iframe.style.display = "none";
    windowOpen = false;
  }
}
toggle();

if (showByDefault)
  toggle();

function hideButton()
{
  if (controlsActive())
    toggleBtn.style.display = "inline";
  else if (!windowOpen)
    setTimeout(function() { toggleBtn.style.display = "none"}, 1250);
}

function controlsActive()
{
  return !document.body.innerHTML.includes("ytp-autohide") || window.innerHeight != screen.height;
}