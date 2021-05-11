module.exports = {
  title: "link.liu",
  description: "走的慢不要紧，一直向前就好",
  base: '/',
  theme: 'reco',
  head: [
    [
      "link",
      {
        "rel": "icon",
        "href": "/avatar.jpg"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  themeConfig: {
    author: 'link.liu',
    logo: "/avatar.jpg", // 左上角头像
    authorAvatar: '/avatar.png',
    subSidebar: 'auto',
    type: "blog", // 开启就会有动画效果
    nav: [
      {
        "text": "Home",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "TimeLine",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      { // 外部链接配置
        text: 'External', 
        ariaLabel: 'External Menu',
        icon: 'reco-other',
        items: [
          { text: 'google', link: 'https://google.com' , target:'_self', },
          { text: 'baidu', link: 'https://baidu.com',  target:'_self',  }
        ]
      },
      {
        "text": "Contact",
        "icon": "reco-message",
        "items": [
          {
            "text": "GitHub",
            "link": "https://github.com/xff1024/xff1024.github.io",
            "icon": "reco-github"
          }
        ]
      }
    ],
    blogConfig: {
      category: {
        location: 2,
        text: "Category"
      },
      tag: {
        location: 3,
        text: "Tag"
      }
    },
    searchMaxSuggestions: 10,
    authorAvatar: "/avatar.jpg",
    record: 'ICP 备案文案',
    recordLink: 'ICP 备案指向链接',
    cyberSecurityRecord: '公安部备案文案',
    cyberSecurityLink: '公安部备案指向链接',
    // 项目开始时间，只填写年份
    startYear: '2021',
    markdown: {
      lineNumbers: true
    },
    friendLink: [
      {
        "title": "午后南杂",
        "desc": "Enjoy when you can, and endure when you must.",
        "email": "1156743527@qq.com",
        "link": "https://www.recoluan.com"
      },
      {
        "title": "前端那些事",
        "desc": "前端工程化",
        "email": "2498190377@qq.com",
        "link": "https://github.com/littleTreeme/frontendThings"
      }
    ]
  }
}
