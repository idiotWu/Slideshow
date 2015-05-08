/*!
 * Slideshow
 * A simple slideshow framework.
 * 
 * @author Dolphin Wood https://idiotwu.me
 * @version 0.3.0
 * Copyright 2015. MIT licensed.
 */
!function(a,b){"use strict";var c=!1;b.registerPlugin("hashchange",function(){if(!c){var b=this;c=!0,a.addEventListener("hashchange",function(){var a=location.hash.slice(1),c=b.getCurrentFrame().indexChain;a&&a!==c&&b.jumpTo(a)})}})}(window,Slideshow);