---
title: 博客的搭建过程
date: '2021-04-23'
categories:
 - 其他
tags:
 - 博客
---
::: tip
 本博客系统采用的是vuepress搭建的，采用的主题是阮一峰的 vuepress-theme-reco
:::

```html
  安装 & 使用： 
  1. 创建一个工程文件目录:   mkdir vuepress-blog && cd vuepress-blog
  2. 初始化工程目录： npm init -y 或者 yarn init
  3. 安装vuePress为本地依赖:  yarn add -D vuepress 或者 npm install -D vuepress
  4. 创建你的第一篇文档： mkdir docs && echo '# Hello VuePress' > docs/README.md
  5. 在package.json中添加脚本
     {
        "scripts": {
            "dev": "vuepress dev docs",
            "build": "vuepress build docs"
        }
    }
  6. 在本地启动服务器 yarn dev 或者 npm run dev
```

::: warning
 完成了上面，一个简单的服务就跑起来了。脚本的编译是针对于docs目录（docs下深层的markdown文件也会被编译）,那思考一下vuepress编译的路由对应文件的关系是怎么样的呢？
:::

```json
 . 此处我们把 docs 目录作为 targetDir，下面所有的“文件的相对路径”都是相对于 docs 目录的。在项目根目录下的 package.json 中添加 scripts ：
        {
            "scripts": {
                "dev": "vuepress dev docs",
                "build": "vuepress build docs"
            }
        }
. 对于上述的目录结构，默认页面路由地址如下：
    文件的相对路径	      页面路由地址
    /README.md	          /    (/代表index.html)
    /guide/README.md	 /guide/
    /config.md	         /config.html
```

::: warning
 下一步，如何管理我们的目录结构？
:::

```html
  1. 我们刚创建出来只有一个docs目录以及一个README.md首页文件
  2. vuePress 遵循 “约定优于配置” 的原则,脚本编译目录下推崇以下结构
        ├── docs
        │   ├── .vuepress (可选的)
        │   │   ├── components (可选的)
        │   │   ├── theme (可选的)
        │   │   │   └── Layout.vue
        │   │   ├── public (可选的)
        │   │   ├── styles (可选的)
        │   │   │   ├── index.styl
        │   │   │   └── palette.styl
        │   │   ├── templates (可选的, 谨慎配置)
        │   │   │   ├── dev.html
        │   │   │   └── ssr.html
        │   │   ├── config.js (可选的)
        │   │   └── enhanceApp.js (可选的)
        │   │ 
        │   ├── README.md
        │   ├── guide
        │   │   └── README.md
        │   └── config.md
        │ 
        └── package.json
 3. 简单了解一下主要的目录&文件
    docs/.vuepress: 用于存放全局的配置、组件、静态资源等
    docs/.vuepress/public: 静态资源目录
    docs/.vuepress/config.js: 配置文件的入口文件
```


::: warning
  编辑README.md首页，了解front matter(它的作用可以用来标识改文档的属性，如作者，时间，标签，分类，等等，方便归纳以及扩展，后期结合其他主题发现很爽)
:::

```html
  1. front matter 必须是 markdown 文件中的第一部分，并且必须采用在三点划线之间书写的有效的 YAML，如：
    ---
    title: Blogging Like a Hacker
    lang: en-US
    ---
  2. 编辑首页
        ---
        home: true
        heroText: Life is a on return journey
        tagline: Prefer to stumble over a lifetime，but also not ordinary mixed life
        # heroImage: /hero.png
        # heroImageStyle: {
        #   maxWidth: '600px',
        #   width: '100%',
        #   display: block,
        #   margin: '9rem auto 2rem',
        #   background: '#fff',
        #   borderRadius: '1rem',
        # }
        # isShowTitleInHome: false
        # actionText: Guide
        # actionLink: guide
        bgImageStyle: {
        height: '450px'
        }
        isShowTitleInHome: false
        features:
        - title: Yesterday
        details: 开发一款看着开心、写着顺手的 vuepress 博客主题
        - title: Today
        details: 希望帮助更多的人花更多的时间在内容创作上，而不是博客搭建上
        - title: Tomorrow
        details: 希望更多的爱好者能够参与进来，帮助这个主题更好的成长
        ---
  3. 重新编译后发现和我的不一样，先不要着急，后面再说
```

::: warning
  接下来对 docs/.vuepress/config.js 进线一些简单的配置，如 页面标题、logo、加载时候的文案
:::

```js
// .vuepress/config.js
module.exports = {
  title: "link.liu",
  description: "走的慢不要紧，一直向前就好",
  themeConfig: {
    logo: '/assets/img/logo.png',
    author: 'link.liu',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'External', link: 'https://google.com' },
    ]
  }
}
```

::: warning
  安装vuepress-theme-reco主题
:::

```html
 1. 安装依赖： yarn add vuepress-theme-reco 或者 npm install vuepress-theme-reco --save-dev
 2. 配置 docs/.vuepress/config.js
    module.exports = {
        theme: 'reco'，
        themeConfig: {
            type: "blog" // 开启就会有动画效果
        }
    }
 3. 添加分类和标签在top栏，方便分类检索
```
```js
 
 module.exports = {
  theme: 'reco',
  themeConfig: {
     // 博客配置
    blogConfig: {
      category: {
        location: 2,     // 在导航栏菜单中所占的位置，默认2
        text: 'Category' // 默认文案 “分类”
      },
      tag: {
        location: 3,     // 在导航栏菜单中所占的位置，默认3
        text: 'Tag'      // 默认文案 “标签”
      },
      socialLinks: [     // 信息栏展示社交信息
        { icon: 'reco-github', link: 'https://github.com/recoluan' },
        { icon: 'reco-npm', link: 'https://www.npmjs.com/~reco_luan' }
      ]
    }
  }
}
```

```md
#写文章时添加分类和标签
---
title: 【vue】跨域解决方案之proxyTable
date: 2017-12-28
categories:
 - frontEnd
tags:
 - vue
---
```

::: tip
 完成以上步骤基本就搭建出来啦，剩下值得注意的就是  a.写.md文档博客时记得 Front Matter在最前面  b. 可以在md文档中进行脚本的执行以及vue组件的解析，这个自己参照文档
:::