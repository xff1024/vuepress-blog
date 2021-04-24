---
title: GitHub Pages and Travis CI实现博客的自动部署
date: '2021-04-24'
categories:
 - 其他
tags:
 - 博客
 - vuepress
---

### 简单介绍
::: tip
  本博客是借助Travis CI + GitHUb Pages实现持续集成以及自动部署，提交代码到仓库后travis-ci会自动构建。Travis CI目前有两个官网，分别是 [travis-ci.org](https://travis-ci.org) 和 [travis-ci.com](https://travis-ci.com),travis-ci.org 是旧平台，已经逐渐往新平台 travis-ci.com 上迁移了。对于私有仓库的免费自动构建，Travis CI在新平台上给予了支持。
:::

```html 
1. Travis CI是用Ruby语言开发的一个开源的分布式持续集成服务，用于自动构建和测试在GitHub托管的项目，服务链接地址 https://travis-ci.com/，支持包括Javascript、Node.js、Ruby等20多种程序语言。对于开源项目免费提供CI服务。你也可以买他的收费版，享受更多的服务。

2. Travis CI和github等代码仓库的关系：通过给travis-ci授权获取github代码仓库权限(用github账户登录该服务平台),授权后可以选择要构建的仓库（也可以选择所有仓库），之后提交代码之后会根据根目录下的travis.yml文件选择执行任务

3. 实现原理，通过travis.yml执行任务, 大致执行过程如下面的伪代码命令：   (npm install -> npm build -> 进入构建好的文件夹 -> git init -> git add . -> git commit -m 'deploy'(将该目录作为ci服务平台本地仓库) -> git push 到我们专门存放博客站点的仓库,将该仓库设置为githubpage页 )
```

### 准备工作
```bash
 1. 注册一个github账号
 2. 创建两个仓库。一个用来存放源码， 一个仓库存放构建编译后的代码
 3. 用github账号登录https://travis-ci.com平台
 4. 在github中创建一个GitToken，链接地址https://github.com/settings/tokens，名字可以随便取
 5. 将本地博客仓库进线初始化，然后在根目录添加一个 .travis.yml 文件 +  一个脚本文件 deploy.sh
 6. 将本地博客仓库代码上传到github源码仓库
 7. 存放编译构建后的代码仓库下创建一个分支 gh-pages，分支名随便取
 8. 在travis-ci平台选择一个仓库，为其创建环境变量，最主要的是G    GitToken,用于将编译后的代码进线上传到我们的github仓库
 9. 设置github pages页，选择 gh-pages分支docs/
 10. 稍等片刻代码构建好并且上传带远程仓库之后，gitpages就可以看到效果了
```
### .travis.yml
```YAML
  language: node_js
  node_js:
    - lts/*
  script:
    - bash deploy.sh
```
### .deploy.sh
```bash
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm install
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 进入生成的文件夹
git init
git add -A
git commit -m 'deploy'
# ${环境变量}为环境变量在travis中配置
git push --force --quiet "https://${GH_TOKEN}@github.com/xff1024/xff1024.github.io.git" master:gh-pages
cd -
```
::: warning
  值得注意的是 .travis.yml 还有 .deploy.sh的书写
:::