---
title: TS-unknow类型
date: '2021-06-27'
categories:
 - TS
tags:
 - 博客
---

#### 关于unknow
 - 任何类型的值都可以赋值给unknow类型的变量，unknow类型是ts类型系统中的顶级类型 （反过来呢，将unknow类型的值赋值给其它类型的变量呢？）
```ts
let value: unknown;
value = true; // OK
value = 42; // OK
value = "Hello World"; // OK
value = []; // OK
value = {}; // OK
value = Math.random; // OK
value = null; // OK
value = undefined; // OK
value = new TypeError(); // OK
value = Symbol("type"); // OK
```
- unknow类型的值只能赋值给 unknow & any 类型，换句话说, 只有能够保存任意类型的容器才能保存 unknow 类型的值,毕竟我们不确定unknow类型的值将来会存储什么类型的值
```ts
let value: unknown;
let value1: unknow = value; // OK
let value2: any = value; // OK
let value3: string = value // Error
let value4: boolean = value // Error
let value5: number = value //  Error
let value6: object = value // Error
let value7: any[] = value // Error
```
#### 操作unknow变量的值（调用属性和方法）
```ts
let value: unknow;
value = 'hello'
value.length // Error
value.trim();
let value2: unkonw = [1,2,3]
value2.map(item => {  }) // Error
```
- 类型断言
```ts
let value: unknow;
value = 'hello'
(value as string).length
```
- 类型保护 typeof | instanceof
```ts
let value: unknow;
if (typeof value === 'string') {
  console.log(value.trim())
}
```

#### 联合类型中的 unknown定义
- 如果联合类型中有unknown，那么最终得到的都是unknown类型
```ts
type U1 = unknown | null; // unknown
type U2 = unknown | string; // unknown
type U3 = unknown | number; // unknown
```
--gitemoji-test
