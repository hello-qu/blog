---
title: ios 键盘遮挡输入框的问题
Date: 2019-4-20 6:50
tag: 工作遇到的问题
---

### 问题背景：

前段时间在做采筑App开发的时候，中间接了一个新需求。需要为用户提供客服咨询，让客户可以咨询单据相关的问题。我这边的任务是跟智慧插件那边的同事对接，把他们的一个网页版的客服地址嵌到我们App中来。

<!-- more -->

对接比较成功，项目上线没多久，他们那边给我反馈了一个问题：**由于客服的首页是输入信息来获得解答的，页面输入信息的input框是用fix定位在底部，于是每当需要输入内容，唤起键盘的时候，键盘就会把输入框挡住，但是只有第一次会挡住，再次唤起就不会了**。

![](https://img2018.cnblogs.com/blog/940210/201809/940210-20180914151610137-1902977467.png)


第一次唤起输入框的时候是这样。

![](https://img2018.cnblogs.com/blog/940210/201809/940210-20180914151544190-511278931.png)


再次唤起就不会挡住输入框了

![](https://img2018.cnblogs.com/blog/940210/201809/940210-20180914151550698-640203777.png)


### 问题分析
这个问题我首先排查了是不是app内才会出现的bug，我把这个输入框在 ios 的 safair浏览器中打开，还是一样。

说明代码本身的兼容性问题。

我在网上查了下资料，没多一会，看见有大神就用简单的几行代码解决了问题。

```js
var input = document.querySelector('input');
input.addEventListener('focus',()=>{
    //core code
    setTimeout(()=>{
		document.body.scrollTop = document.body.scrollHeight 
	},300)
})
```

复制拷贝 粘贴运行 ok。

这时候，我就想为什么简单的这么几行代码就能解决问题。为了弄清楚 我决定查一下这几个属性。

`Element.scrollTop` ：属性可以获取或设置一个元素的内容垂直滚动的像素数。

说人话就是元素出现滚动条的时候：滚动时候的**可见顶部**距离**元素顶部** 的距离。

`scrollHeight` : 这个只读属性是一个元素内容高度的度量，包括由于溢出导致的视图中不可见内容。
这个简单理解就是整个元素的高度，包括滚动的时候那些不在视区的内容。



其实有了这些解释 我还是没弄明白上面的代码为什么能生效。直到我在MDN 上看到了下面的例子

![](https://img2018.cnblogs.com/blog/940210/201809/940210-20180914151712373-551856443.png)


这个demo 就是用了这个判断来检测滚动条触发到了底部：

只要元素在最底部，那么滚动条滚动的距离+元素视窗的高度 = 整个元素的高度  


![](https://img2018.cnblogs.com/blog/940210/201809/940210-20180914151522386-22164903.gif)



### 问题解决与思考

然后结合这个例子，跟开头的那个问题，理清思绪。得出下面结论。

- 根据ios 的网页兼容性，一旦唤起来输入框，整个页面的元素都会上移，即使那些fix定位的元素也不例外。这就造成了整个元素的 clientHeight 是要减掉键盘的高度的。上面那个判断元素是否滚动到底的代码可以改动下就是**设置滚动条的位置在底部（设置元素滚动到底部）**

  `element.scrollTop = element.scrollHeight - element.clientHeight`

  可以在控制台上试下这个语句，页面一下子就会到最底部。

- ios 键盘遮挡输入框的问题，在这里可以转换成就是，有键盘弹出的情况下保证元素视窗高度和滚动位置的准确性，我们bug的原因是可能键盘在弹出来的时候，高度的转换还没有来及计算，所以就遮蔽了input输入框，导致元素在底部的时候 上面的这个等式不成立。所以我们只有加个延迟，确保键盘出现后，元素底部能够在键盘上方正确的位置上。

```js
var input = document.querySelector('input');
input.addEventListener('focus',()=>{
    //core code
    setTimeout(()=>{
        //更准确的写法。上面的能成立是因为document.body.scrollTop 达
        //不到document.body.scrollHeight的值，就默认是最大值了。
		document.body.scrollTop = document.body.scrollHeight-document.body.clientHeight
	},300)
})
```



心得：

知其然，知其所以然

多看 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollHeight)