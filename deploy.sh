#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm install
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'
#https://github.com/xff1024/xff1024.github.io.git
git push -f git@github.com:xff1024/xff1024.github.io.git master:gh-pages
cd -
