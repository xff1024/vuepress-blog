---
title: 每日一思考
date: '2021-07-28'
categories:
 - 每日一思考
tags:
 - 博客
---
::: tip
 走的慢不要紧，一步一个脚印。业精于勤而荒于嬉，行成于思而毁于随。
:::

### 思考一: JSON.stringify 和 qs.stringify 有什么区别？
```js
// qs是一个很方便处理url参数的一个库，qs.parse可以将url的location.search转化为对象，qs.stringify将对象转化为url参数
let paramOvj = qs.parse('?a=b&c=d&e=', { ignoreQueryPrefix: true });  // {a: 'b', c: 'd', e:'' }
let urlSerch = qs.stingify({'name':['link1', 'link2'], 'age': 18}); // name=link1&name=link2&age=18

// JSON.stingify是js内置的方法，一般用于将（数组或者对象）转化为json字符串，常用于post请求时传递json字符串给后端，将对象或者数组存储到localstorage
// JSON.stingify使用的时候应该注意的是，
// 1.当序列化对象时，键值为undefined、任意的函数以及 symbol等会被忽略
JSON.stringify({a: () => {}, b: undefined}) // "{}"
// 2. 当序列化数组时，会被转化为null
JSON.stringify([undefined, Object, Symbol("")]);// '[null,null,null]'
// 3. JSON.stingify存在上面情况不适合做深拷贝
```
