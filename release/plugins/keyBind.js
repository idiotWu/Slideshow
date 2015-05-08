/*!
 * Slideshow
 * A simple slideshow framework.
 * 
 * @author Dolphin Wood https://idiotwu.me
 * @version 0.3.0
 * Copyright 2015. MIT licensed.
 */
!function(a,b){"use strict";var c=!1;b.registerPlugin("keybind",function(){if(!c){c=!0;var b=this,d={enter:13,left:37,up:38,right:39,down:40};a.addEventListener("keydown",function(a){switch(a.keyCode){case d.left:case d.up:return a.preventDefault(),b.prev();case d.enter:case d.right:case d.down:return a.preventDefault(),b.next()}})}})}(document,Slideshow);