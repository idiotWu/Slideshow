/*!
 * Slideshow
 * A simple slideshow framework.
 * 
 * @author Dolphin Wood https://idiotwu.me
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
!function(a){"use strict";var b,c,d=function(a){var b=a.touches?a.touches[0]:a;return{x:b.pageX,y:b.pageY}},e=function(a){b=d(a)},f=function(a){if(b){a.preventDefault();var e=d(a);if(!c)return void(c=e);(b.x<e.x&&e.x<c.x||b.x>e.x&&e.x>c.x)&&(b.x=c.x),(b.y<e.y&&e.y<c.y||b.y>e.y&&e.y>c.y)&&(b.y=c.y),c=e}},g=function(){if(c){var d={x:c.x-b.x,y:c.y-b.y};if(b=c=null,Math.abs(d.x)>30&&Math.abs(d.y)<75)return d.x>0?a.prev():a.next();if(Math.abs(d.y)>30&&Math.abs(d.x)<75)return d.y>0?a.prev():a.next();var e=Math.abs(d.x)>Math.abs(d.y)?d.x:d.y;return e>0?a.prev():a.next()}};document.addEventListener("touchstart",e),document.addEventListener("touchmove",f),document.addEventListener("touchend",g),document.addEventListener("mousedown",e),document.addEventListener("mousemove",f),document.addEventListener("mouseup",g)}(window.Slideshow);