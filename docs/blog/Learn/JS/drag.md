---
title: 实现拖拽动码片段
date: '2021-06-07'
categories:
 - JS
tags:
 - 博客
---

```js

<div class="page-container" @mouseleave="clearMouseEvent">
	<div class="up-drage" id="upDrage" ref="upDrage" @mousedown="handleMousedown"></div>
</div>

export default {
 data() {
     return {
        currentHeight: 420
     }
 },
 methods: {
   handleMousedown(event) {
     this.pauseEvent(event)
     const targetDom = document.getElementById('followUpBox')
     let nowh = this.currentHeight
     let that = this 
     const maxDragHeight = parseInt(document.body.offsetHeight) * 0.95
     this.currentHeight = nowh
     document.onmousemove = function (event2) { // 注册鼠标移动事件处理函数
        that.pauseEvent(event2)
        let upDistances = event.pageY - event2.pageY
        if (nowh + upDistances >= 410 && (nowh + upDistances <= maxDragHeight)) {
          that.currentHeight = nowh + upDistances
          targetDom.style.height = nowh + upDistances + 'px'
        }
      }
      document.onmouseup = function (event3) {
        that.pauseEvent(event3)
        document.onmousemove = document.onmouseup = null
      } 
   },
   pauseEvent(e){
     if(e.stopPropagation) e.stopPropagation();
     if(e.preventDefault) e.preventDefault();
     e.cancelBubble=true;
     e.returnValue=false;
     return false;
    },
   clearMouseEvent() {
     const targetDom = document.getElementById('followUpBox')
     if (targetDom){
      targetDom.style.height = this.currentHeight + 'px'
     }
     document.onmousemove = document.onmouseup = null
   }
 }
}
```

