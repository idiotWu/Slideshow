/*!
 * Slideshow
 * A simple slideshow framework.
 * 
 * @author Dolphin Wood https://idiotwu.me
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
!function(a){"use strict";var b={37:"left",38:"up",39:"right",40:"down"},c=function(a){var b,c;return function(){var d=(new Date).getTime();return b?d-b>100?(clearTimeout(c),b=d,a()):void(c=setTimeout(a,100)):(b=d,a())}},d=c(a.next),e=c(a.prev);document.addEventListener("keydown",function(a){switch(b[a.keyCode]){case"left":case"up":return a.preventDefault(),e();case"right":case"down":return a.preventDefault(),d()}})}(window.Slideshow);