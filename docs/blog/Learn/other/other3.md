---
title: 代码片段收集
date: '2021-05-27'
categories:
 - 其他
tags:
 - 博客
---

##### 使用安全模式来提醒，需要用new操作符来调用构造函数

```js
function Vue (options) {
  if (!(this instanceof Vue)) {
    console.warn('Vue is a constructor and should be called with the `new` keyword')
  }
  ...
}
```

