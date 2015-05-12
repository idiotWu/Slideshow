# APIs

该文档包含了部署在 `Slideshow` 对象下的静态方法与 `NodeTree` 构造函数下的实例方法。

## 格式约定

1. 绑定在对象上的静态方法使用 `Object.method` 表示，如 `Slideshow.init` 
2. 对象实例的方法使用 `instance#method` 表示，如 `NodeTree#flatten`


## 基本使用

### Slideshow.init( String:className [, Element: startContainer] )

初始化一个幻灯片，并返回一个由所有目标 class 的元素组成的 `NodeTree` 对象。

`startContainer` 指定了查找起点，默认为 `document.body`。

**注意：**

1. **第一帧动画会在初始化时被激活。**
2. **多次初始化幻灯片，只有最后一次的操作会被保留。**

### Slideshow.finder( String:className [, Element: startContainer] )

在 DOM 中查找具有指定 class 的元素，并返回一个 `NodeTree` 对象。

`startContainer` 指定了查找起点，默认为 `document.body`。

**注意：该方法并不会创建一个新的幻灯片！**

## 流控制

### Slideshow.prev()

播放前一帧。

### Slideshow.next()

播放下一帧。

### Slideshow.jumpTo( String:indexChain )

跳转到指定帧，接受一个链式索引如 `'1.2.3'`。

## 事件监听

### Slideshow.addListener( Function: fn )

为幻灯片的变换注册事件监听。

该方法的回调函数接受三个参数：

1. `String:type`：变换类型，值为 `prev|next|jump`
2. `Element:element`：当前动作目标 DOM 元素
3. `Number:progress`：幻灯片播放进度 `[0, 1]`

同时回调函数内的 `this` 对象指向当前动作目标的 `NodeTree` 对象。

### Slideshow.removeListener()

移除当前绑定的**所有**监听。

## Plugins 开发

### Slideshow.registerPlugin( String:name, Function:fn )

为 `Slideshow` 注册 Plugin，`fn` 接受一个参数：

1. `NodeTree:flow`：当前幻灯片流。

同时回调函数内的 `this` 对象指向 `Slideshow` 对象。

**注意**

**1. 所有 Plugin 都会在调用 `Slideshow.init()` 方法时初始化。**
**2. 当使用 Plugin 注册 DOM 事件监听时，要注意用户可能多次初始化幻灯片。**

### Slideshow.getCurrentFrame()

得到当前帧所在的 `NodeTree` 对象。

### Slideshow.getAllPlugins()

得到所有已注册的 Plugins。

## NodeTree

`Slideshow` 使用 `NodeTree` 来模拟 DOM Tree 结构，以下简称 `NTR`。

`NTR` 对象所带属性如下：

| 属性名       | 解释                          |
| :-----:     | :-----------------:           |
| children    | 子元素节点组成的数组            |
| parent      | 父节点对象                     |
| depth       | 当前节点深度，从 0 开始         |
| element     | 当前节点所对应的元素，顶级为 `root`|
| index       | 当前节点的一维索引值             |
| indexChain  | 当前节点的链式索引值            |
| description | 目标元素的 `data-title` 属性值 |

其中，`index` 和 `indexChain` 的计算不包含根元素。

### NodeTree#flatten( [Boolean:includeSelf, [Array:extend]] )

返回一维化的 `NTR` 对象。

指定 `includeSelf = true` 可使结果数组首元素为当前 `NTR` 对象自身。

指定 `extend` 可对原有数组进行拓展。

### NodeTree#getChild( String:indexChain )

根据链式索引查找并返回目标元素。如

```
ntr.getChild('1.2.3')
 -> ntr.children[1].children[2].children[3]
```

### NodeTree#wrap()

用一个 `<section>` 元素包裹 `NTR` 对象里的所有节点的**深拷贝**。

### NodeTree#toHTML()

返回 `NTR` 对象内所有节点组成的 HTML 字串。

### NodeTree#toTitleList( [String:className [, Boolean:includeSelf]] )

返回一个有序列表：

```html
<ol>
    <li><a>...</a></li>
    ...
</ol>
```

`<a></a>` 元素的内容为当前 `NTR` 目标元素的 `data-title` 属性，并带有如下属性：

1. `data-index`：当前 `NTR` 对象的一维索引位置
2. `data-index-chain`：为当前 `NTR` 对象的链式索引位置。
3. 当指定 `className` 时，所有 `<a></a>` 元素会被指定为该 class。

指定 `includeSelf = true` 可使列表首级为当前 `NTR` 对象自身（根元素会忽略这个参数）。

## Q&A

有问题问你男朋友。