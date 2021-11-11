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

### 思考二: 前端文件下载的处理方式有哪些？
```js
// 方式一： 后端直接处理好，生成一个下载链接
// 方式二： 后端返回二进制文件流，前端转化后下载，通过blob对象转化为文件后下载

发送在请求接口时要设置responseType为blob
export const download = (params) => {
    return axios.post(url,params,{responseType:'blob'})
}
 

将响应回来的二进制文件流转化为文件的方法，fileName可以自定义文件名称，但是需要包含文件后缀
export const download = (data: ArrayBuffer, fileName: string) => {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


```

### 思考三: js精度丢失问题常见解决办法？
```js
精度问题丢失场景：
a. 浮点数精度问题，比如 0.1 + 0.2 !== 0.3
b. 大数精度问题，比如 9999 9999 9999 9999 == 1000 0000 0000 0000 1
c. toFixed 四舍五入结果不准确，比如 1.335.toFixed(2) == 1.33

解决精度丢失的问题的思路：
a.将浮点数转为整数运算，再对结果做除法。比如0.1 + 0.2，可以转化为(1*2)/3
b.把浮点数转化为字符串，模拟实际运算的过程。
上述两种存在一些缺陷

推荐第三方js处理
bignumber.js，decimal.js，以及big.js等
【推荐链接】https://www.runoob.com/w3cnote/js-precision-problem-and-solution.html
```
### 思考四：如何让授权页和当前页的通信(domain不同情况下的授权，如自己的网站需要GitHub授权之后再登录)
```js
 可能会遇到一种场景，从当前页面触发某个动作（如每一次添加店铺或者上架新品）需要打开授权页
 -> a.com的list页中打开新开一个页面 author.com 
 -> 授权成功或者失败，重定向到a.com的callback反馈结果页
 -> 反馈结果页再调用是否授权接口，调用结果通知a.com的list页
 -> a.com中收到通知之后执行回调
 
 // a.com channle-list页面
  useEffect(() => {
    // register a listener
    const handleMessage = e => {
      auth.receiveMessage(e.data, {
        onSuccess: () => {
          closeDialog();
          reload();
        },
        onError: err => {
          message.error(err);
        },
      });
    };
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);
  
  // a.com 的callback页面
  const { loading, data, error } = useRequest(auth.getAuthResult);
  const { data: result } = data || {};
  const success = !error && !!result?.success;
  useEffect(() => {
    if (success) {
      auth.sendMessage({
        msgType: 'authMessage',
        result: 'success',
      });
      window.close();
    } else {
      auth.sendMessage({
        msgType: 'authMessage',
        error: error ? error.message : result?.error_message,
      });
    }
  }, [success]);
  
  // auth.js 封装
  export default {
  getAuthResult() {
    const params = qs.parse(window.location.search);
    return request({
      url: 'xxxxxxx',
      params,
    });
  },
  sendMessage(msg) {
    if (window.opener) {
      window.opener.postMessage(JSON.stringify(msg));
    }
  },
  receiveMessage(msg, ctx) {
    const data = JSON.parse(msg);
    if (data?.msgType === 'authMessage') {
      if (data?.result === 'success') {
        ctx.onSuccess();
      } else {
        ctx.onError(data?.error);
      }
    }
  },
};
```
