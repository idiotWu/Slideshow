/*!
 * Slideshow
 * A simple slideshow framework.
 * 
 * @author Dolphin Wood https://idiotwu.me
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
!function(a){"use strict";var b,c,d=function(a){var b=a.touches?a.touches[0]:a;return{x:b.pageX,y:b.pageY}},e=function(a){b=d(a)},f=function(a){if(b){a.preventDefault();var e=d(a);if(!c)return void(c=e);(b.x<e.x&&e.x<c.x||b.x>e.x&&e.x>c.x)&&(b.x=c.x),(b.y<e.y&&e.y<c.y||b.y>e.y&&e.y>c.y)&&(b.y=c.y),c=e}},g=function(){return c?c.x-b.x>30||c.y-b.y>30?a.prev():c.x-b.x<-30||c.y-b.y<-30?a.next():void(b=c=null):void 0};document.addEventListener("touchstart",e),document.addEventListener("touchmove",f),document.addEventListener("touchend",g),document.addEventListener("mousedown",e),document.addEventListener("mousemove",f),document.addEventListener("mouseup",g)}(window.Slideshow);