##　微站

### 1. 运行环境

```
node lastest release

```

### 2. 项目运行

```
yarn

yarn run dev

./build //生产环境编译，导出静态文件，在out/目录下
```

### 3. 分支介绍

优化、fix bug 可以直接提交到dev分支，进入测试环节时在合并到uat分支；

独立的功能新建一个feature，开发完成后合并到dev，feature在合并前要和dev分支保持一致

feature可以提交到远程，合并到dev时，提交merge request，合并完成后删除分支


> * dev 开发版本
> * uat 测试版本
> * master 发布版本

### 4. git 提交规范

提交msg要尽量准确

> * feature：新功能（feature）
> * fix：修补bug
> * docs：文档|文案修改
> * style： 样式
> * refactor：重构
> * test：增加测试
> * chore：构建过程或工具的变动