##　微站

### 1. 运行环境

```
node lastest release

```

### 2. 项目运行

```
yarn

npm run dev

npm run export //导出静态文件，在out/目录下
```

### 3. git 提交规范

优化、fix bug 可以直接提交到dev分支，进入测试环节时在合并到uat分支，独立的功能新建一个feature，开发完成后合并到dev

> * dev 开发版本
> * uat 测试版本
> * master 发布版本

```
//msg要准确，为了定位问题方便
git commit "update 模块 描述" //常规更新
git commit "bug 模块　问题描述" //fix bug
git commit "docs 模块 问题描述" //文案更新
git commit "feature 模块" //新版本
```
### 3. TODO
- [ ] 静态资源
- [ ] 开发环境配置