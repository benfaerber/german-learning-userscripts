// ==UserScript==
// @name     EasyGermanSubtitleMod
// @version  1
// @grant    none
// @match https://*.youtube.com/*
// ==/UserScript==

// Easy German Subtitle Mod is a user script that allows you to cover up the subtitles of easy German Videos
// I made it with easy German in mind but it would work for any of the easy langauges videos
// You have the option of covering up the english subs or both the english and the german subs
// It only works when the video is in full screen
// Enjoy!

// Adjust based on subtitle position
var yOffset = 20
// Position of button
var buttonTop = 90;
var buttonRight = 10;
// To change to different language, modify these
var langCode = "De";
var seriesName = "Easy German";

// BUTTON
var css = "position: fixed; top: 90px; right: 10px; background: #fff; -ms-zoom: 0.75; -moz-transform: scale(0.75); -moz-transform-origin: top right;  z-index: 9999;";
var elem = document.createElement("div");
elem.id = "easyGermanBox";
elem.style = css;

var buttonBar = document.createElement("div");
buttonBar.style = "right: 0; position: absolute;";
elem.appendChild(buttonBar);

var toggleBtn = document.createElement("button");
toggleBtn.onclick = toggle;
toggleBtn.innerHTML = "EnDe";
buttonBar.appendChild(toggleBtn);

document.body.appendChild(elem);

// MASK DIV
var maskEngDiv = document.createElement("div");
var engCss = "position: fixed; left: 50%; transform: translate(-50%, 0); background: #000 !important; z-index: 9999; width: 85%; height: 70px; bottom: "+(55 + yOffset).toString()+"px;";
maskEngDiv.id = "maskEngDiv";
maskEngDiv.style = engCss;
maskEngDiv.style.display = "none";
document.body.appendChild(maskEngDiv);

var maskDeuDiv = document.createElement("div");
var deuCss = "position: fixed; left: 50%; transform: translate(-50%, 0); background: #000 !important; z-index: 9999; width: 95%; height: 80px; bottom: "+(125 + yOffset).toString()+"px;";
maskDeuDiv.id = "maskEngDiv";
maskDeuDiv.style = deuCss;
maskDeuDiv.style.display = "none";
document.body.appendChild(maskDeuDiv);

var mode = 0;
function toggle()
{
  mode++;
  if (mode > 2)
    mode = 0;

  if (mode == 0)
  {
    toggleBtn.innerHTML = "En" + langCode;
    maskEngDiv.style.display = "none";
    maskDeuDiv.style.display = "none";
  }
  else if (mode == 1)
  {
    toggleBtn.innerHTML = "&nbsp;" + langCode + "&nbsp;";
    maskEngDiv.style.display = "block";
    maskDeuDiv.style.display = "none";
  }
  else if (mode == 2)
  {
    toggleBtn.innerHTML = "None";
    maskEngDiv.style.display = "block";
    maskDeuDiv.style.display = "block";
  }
}

var t=setInterval(hideButton,500);

function hideButton()
{
  if (controlsActive())
    toggleBtn.style.display = "inline";
  else
    setTimeout(function() { toggleBtn.style.display = "none"; },1250);
}



function controlsActive()
{
  if (!document.body.innerHTML.includes(seriesName))
    return false;
  
  return !document.body.innerHTML.includes("ytp-autohide") || window.innerHeight != screen.height;
}