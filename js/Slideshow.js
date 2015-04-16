/*!
 * Slideshow
 * A simple slideshow framework.
 * 
 * @author Dolphin Wood https://idiotwu.me
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
var Slideshow=function(a){"use strict";var b,c,d,e,f=[],g=function(a){a&&"function"==typeof a&&setTimeout(a,0)},h=function(a){var b=c[d],h=b.element,i=d/e;location.hash=b.indexChain,f.forEach(function(c){g(function(){c.call(b,a,h,i)})})},i=function(a,c){var d=a.split("."),e=b.getChild(d[0]);if(e){var f=e.flatten(!0),g=f.length-1,h=!1;f.forEach(function(b,d){var e=b.element;return c?(e.classList.remove("show"),void e.classList.remove("played")):(h?e.classList.remove("show"):e.classList.add("show"),1===b.depth||d===g?e.classList.remove("played"):e.classList.add("played"),void(b.indexChain===a&&(h=!0)))})}};return a.init=function(h,i){if(!document.body.classList)throw new Error("unsupported browser");return b=a.finder(h,i),c=b.flatten(),d=0,e=c.length-1,f.length=0,c.length&&c[0].element.classList.add("show"),location.hash&&g(function(){try{a.jumpTo(location.hash.slice(1))}catch(b){}}),b},a.next=function(){var a=c[d+1];if(!a)return null;var e=c[d],f=a.element,g=a.indexChain;if(1!==e.depth&&e.element.classList.add("played"),1===a.depth){var i=b.getChild(--g),j=i.element;j.classList.remove("show"),j.classList.add("played")}return d++,f.classList.add("show"),h("next"),f},a.prev=function(){if(!d)return null;var a=c[d],b=c[--d],e=b.element;return 1===a.depth&&g(function(){i(b.indexChain,!1)}),a.element.classList.remove("show"),e.classList.remove("played"),h("prev"),e},a.jumpTo=function(a){if(void 0===a)throw new TypeError("missing argument indexChain");if(a=a.toString(),!a.match(/^(?:\d\.?)*\d$/))throw new TypeError("unrecognized indexChain format, require ^(\\d\\.?)*\\d$");var e=c[d].indexChain,f=b.getChild(a);if(a!==e&&f){d=f.index;var j=parseInt(a.split(".")[0],10);g(function(){i(e,!0)}),g(function(){i(a,!1)}),g(function(){b.children.forEach(function(a,b){j>b?a.element.classList.add("played"):a.element.classList.remove("played")})}),h("jump")}},a.addListener=function(a){if(!a||"function"!=typeof a)throw new TypeError("onchange listener must be a function");f.push(a)},a.removeListener=function(){f.length=0},window.addEventListener("hashchange",function(){var b=location.hash.slice(1),e=c[d].indexChain;b&&b!==e&&a.jumpTo(b)}),a}(window.Slideshow||{}),Slideshow=function(a){"use strict";var NodeTree=function(a,b,c){return this.element=a||"root",this.depth=c||0,this.parent=b,this.children=[],b?this.indexChain=(b.indexChain?b.indexChain+".":"")+b.children.length:this.indexChain=void 0,this};return NodeTree.prototype.wrap=function(){var a=document.createElement("section");if(this.depth){var b=this.element.cloneNode(!0);return a.appendChild(b),a}return this.children.forEach(function(b){var c=b.element.cloneNode(!0);a.appendChild(c)}),a},NodeTree.prototype.toHTML=function(){return this.wrap().innerHTML},NodeTree.prototype.toTitleList=function(a,b){var c=this.children.length;if(!c&&!b)return null;var d,e=function(b,c){var d=document.createElement("li");return d.textContent=c.element.getAttribute("data-title"),d.setAttribute("data-index-chain",c.indexChain),d.setAttribute("data-index",c.index),b.appendChild(d),a&&(d.className=a),d},f=document.createElement("ol");if(b&&this.depth){var g=e(f,this);c&&(d=document.createElement("ol"),g.appendChild(d))}return d=d||f,this.children.forEach(function(b){var c=e(d,b);if(b.children.length){var f=b.toTitleList(a,!1);f&&c.appendChild(f)}}),f},NodeTree.prototype.flatten=function(a){var b=[];return a&&b.push(this),this.children.forEach(function(a){b.push(a),a.children.length&&(b=b.concat(a.flatten(!1)))}),b},NodeTree.prototype.getChild=function(a){if(void 0===a)throw new TypeError("missing argument indexList");if(a=a.toString(),!a.match(/^(?:\d\.?)*\d$/))throw new TypeError("unrecognized indexList format, require ^(\\d\\.?)*\\d$");var b,c=a.split("."),d=c.length-1;try{b=c.reduce(function(a,b,c){return c===d?a[b]:a[b].children},this.children)}catch(e){return null}return b},a.finder=function(a,b){if(b=b||document.body,!a)throw new TypeError("missing argument className");if(1!==b.nodeType)throw new TypeError("start container must be an element");var c=new NodeTree,d=0;return c.index="root",function e(b,c){Array.prototype.forEach.call(b.children,function(b){var f=b.classList.contains(a),g=b.childElementCount;if(f){var h=new NodeTree(b,c,c.depth+1);return h.index=d++,c.children.push(h),e(b,h)}g&&e(b,c)})}(b,c),c},a}(window.Slideshow||{});