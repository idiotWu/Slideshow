/*!
 * Slideshow
 * A simple slideshow framework.
 * 
 * @author Dolphin Wood https://idiotwu.me
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
!function(a){"use strict";var b={enter:13,left:37,up:38,right:39,down:40},c=function(a){var b,c;return function(){var d=(new Date).getTime();return b?d-b>100?(clearTimeout(c),b=d,a()):void(c=setTimeout(a,100)):(b=d,a())}},d=c(a.next),e=c(a.prev);document.addEventListener("keydown",function(a){switch(a.keyCode){case b.left:case b.up:return a.preventDefault(),e();case b.enter:case b.right:case b.down:return a.preventDefault(),d()}})}(window.Slideshow);