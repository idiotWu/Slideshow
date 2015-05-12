## Slideshow.js

一款超轻量级的 JavaScript 幻灯片创建框架，助你摆脱 PowerPoint 令人作呕的动画控制！

### 安装

```
bower install Slideshow.js
```

### Showcase

[https://idiotwu.me/got-to-fe/](https://idiotwu.me/got-to-fe/)

## 兼容性

- IE 10+
- Chrome 23+
- Firefox 21+
- Safari 6+

## 基本用法

### Slideshow.init( String:className [, Element: startContainer] )

初始化一个幻灯片，并返回一个由所有目标 class 的元素组成的 `NodeTree` 对象。

`startContainer` 指定了查找起点，默认为 `document.body`。

**注意：**

1. **第一帧动画会在初始化时被激活。**
2. **多次初始化幻灯片，只有最后一次的操作会被保留。**

### Slideshow.prev()

播放前一帧。

### Slideshow.next()

播放下一帧。

### Slideshow.jumpTo( String:indexChain )

跳转到指定帧，接受一个链式索引如 `'1.2.3'`。

## 动画控制

- 当动画帧被激活时，对应元素会被添加上 `show` 的 class，最顶层的元素只有在**所有子项播放完成后** ，这个 class 才会被移除。

- 被播放过的动画会被加上 `played` class，最顶层的元素只有在**所有子项播放完成后**，这个 class 才会被加上。

- 因此可以借助 CSS3 Animation 来为对应的 class 状态添加动画。

## 事件监听

通过 `Slideshow.addListener( Function: fn )` 可以为幻灯片的变换注册事件监听。通过 `Slideshow.removeListener()` 可以移除所有监听。

`Slideshow.addListener` 的回调函数接受三个参数：

1. `String:type`：变换类型，值为 `prev|next|jump`
2. `Element:element`：当前动作目标 DOM 元素
3. `Number:progress`：幻灯片播放进度

同时回调函数内的 `this` 对象指向当前作用帧的 `NodeTree` 对象。

## APIs

[参见此处](https://github.com/idiotWu/Slideshow/tree/master/src/plugins)


## Q&A

1. Q: 为什么我只能创建一个幻灯片？    
   A: 为什么你想要同时播放多个幻灯片？
2. Q: 我 `init` 了以后怎么什么都没有发生？    
   A: 没写样式。
3. Q: 为什么要自己写动画？我不会！    
   A: 出门左转 [reveal.js](http://lab.hakim.se/reveal-js/ "reveal.js")。

## License

MIT.