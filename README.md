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
feature：新功能（feature）
fix：修补bug
docs：文档（documentation）
style： 格式（不影响代码运行的变动）
refactor：重构（即不是新增功能，也不是修改bug的代码变动）
test：增加测试
chore：构建过程或辅助工具的变动



```
### 3. TODO
- [ ] 静态资源
- [ ] 开发环境配置