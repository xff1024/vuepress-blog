---
title: 从Vue源码中学到了什么(代码片段收集)
date: '2021-05-27'
categories:
 - 其他
tags:
 - 博客
---

#### Vue使用安全模式来提醒，需要用new操作符来调用构造函数

```js
function Vue (options) {
  if (!(this instanceof Vue)) {
    console.warn('Vue is a constructor and should be called with the `new` keyword')
  }
  ...
}
```
#### Vue的配置项中的data和props为什么不可以直接赋值？即如何通过js给对象设置一个可读属性
```js
  const dataDef = {}
  dataDef.get = function () { return this._data }
  const propsDef = {}
  propsDef.get = function () { return this._props }
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function (newData: Object) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      )
    }
    propsDef.set = function () {
      warn(`$props is readonly.`, this)
    }
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef)
  Object.defineProperty(Vue.prototype, '$props', propsDef)
```
:::tip
使用 Object.defineProperty 在 Vue.prototype 上定义了两个属性，就是大家熟悉的：$data 和 $props，这两个属性的定义分别写在了 dataDef 以及 propsDef 这两个对象里
:::

