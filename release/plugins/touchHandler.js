/*!
 * Slideshow
 * A simple slideshow framework.
 * 
 * @author Dolphin Wood https://idiotwu.me
 * @version 0.3.0
 * Copyright 2015. MIT licensed.
 */
!function(a,b){"use strict";var c=!1;b.registerPlugin("touchhandler",function(){if(!c){c=!0;var b,d,e=this,f=function(a){var b=a.touches?a.touches[0]:a;return{x:b.pageX,y:b.pageY}},g=function(a){b=f(a)},h=function(a){if(b){a.preventDefault();var c=f(a);if(!d)return void(d=c);(b.x<c.x&&c.x<d.x||b.x>c.x&&c.x>d.x)&&(b.x=d.x),(b.y<c.y&&c.y<d.y||b.y>c.y&&c.y>d.y)&&(b.y=d.y),d=c}},i=function(){if(d){var a={x:d.x-b.x,y:d.y-b.y};if(b=d=null,!(Math.abs(a.x)<30&&Math.abs(a.y)<30)){if(Math.abs(a.x)>30&&Math.abs(a.y)<75)return a.x>0?e.prev():e.next();if(Math.abs(a.y)>30&&Math.abs(a.x)<75)return a.y>0?e.prev():e.next();var c=Math.abs(a.x)>Math.abs(a.y)?a.x:a.y;return c>0?e.prev():e.next()}}};a.addEventListener("touchstart",g),a.addEventListener("touchmove",h),a.addEventListener("touchend",i),a.addEventListener("mousedown",g),a.addEventListener("mousemove",h),a.addEventListener("mouseup",i)}})}(document,Slideshow);