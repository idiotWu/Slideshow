/*!
 * Slideshow
 * A simple slideshow framework.
 * 
 * @author Dolphin Wood https://idiotwu.me
 * @version 0.2.0
 * Copyright 2015. MIT licensed.
 */
!function(a){"use strict";var b={enter:13,left:37,up:38,right:39,down:40};document.addEventListener("keydown",function(c){switch(c.keyCode){case b.left:case b.up:return c.preventDefault(),a.prev();case b.enter:case b.right:case b.down:return c.preventDefault(),a.next()}})}(window.Slideshow);