# 代码贡献指南

## 搭建开发环境

- 安装 Node(>= v14.x)、Visual Studio Code

## 分支创建规则以及使用

### 添加项目

- `git clone url` 到本地添加项目文件
- v3 版本处于开发阶段，故暂无主分支，公共开发分支为 `develop`，个人开发分支命名为 `dev-xxx`，特性分支命名为`feat-xxx`
- 进入本地 git pull -p 将所有远程分支拉取到本地

### 开发分支创建

- `git branch -all` - 查看所有分支，包括本地和远程分支
- `git checkout -b 分支名` - 在本地创建并且跳到该分支
- `git checkout 分支名` - 切换分支

### 分支代码提交

- 将代码从工作区【添加】至暂存区 `git add .` (全部) / `git add 文件路径` (部分)
- 将代码从暂存区【提交】至本地分支 `git commit -m "提交信息" `
- 将本地分支代码【推送】至远程分支 `git push `
- 新建的本地分支第一次推送需要 `git push --set-upstream origin 分支名`，这样远程仓库就会出现你的分支
- 推送本地分支代码和合并代码之前必须 `git pull` 拉取远程分支代码，有代码冲突必须先解决冲突才能进行推送或合并操作
- 【个人分支】与【公共开发分支】合并前，请一定需要把个人分支的 commit 合并，再与公共开发分支进行 merge

## 开发规范

### js 开发规范

#### 代码风格

🟥 此类规范具有强制约束性，不符合条件的代码无法通过 eslint 检查  
🟨 此类规范请尽量遵守，不符合条件的代码会在检查过程中抛出警告  

- 🟥 缩进必须为两行空格
- 🟥 语句结尾需添加分号
- 🟥 换行模式为 LF
- 🟥 除模板字符串外，字符串强制使用双引号
- 🟥 标识符和属性应使用 `camelCase`，类和构造器函数应使用 `PascalCase`，私有属性可以用下划线开头
- 🟥 应使用 `a || b` `a && b` `a ?? b` 的形式而不是形如 `a ? a : b` 的形式
- 🟥 控制语句如果没有使用语句块，应放在一行内，不应拆分
- 🟨 注释符号与内容使用空格分隔，例如 `// 注释内容`
- 🟨 避免出现未使用变量
- 🟨 避免空函数
- 🟨 尽量避免使用 `//@ts-ignore` 注释

在上传更改前，请使用 `npm run lint` 命令进行代码质量检查并对报错的地方进行修改

项目已配置 eslint 和 prettier，使用 vscode 的编辑者可安装项目推荐的 `ESLint` 和 `Prettier` 插件，可以实现代码 eslint 错误显示与保存时自动格式化功能。

#### 模块导入

项目已配置下列路径别名，在 ts 文件中跨父文件夹的导入请使用别名导入:

- `@core` : `src/core/index.ts`
- `@/` : `src/core/`
- `@css/` : `src/css/`
- `@icon/` : `src/icon/`

#### 核心模块

- 核心模块是实现播放器核心功能的模块，位于 `src/core/module/` 文件夹下
- 包含下列模块
  - `pluginManager` - 插件管理模块(protected)
  - `videoController` - 视频模块(protected)
  - `eventEmitter` - 事件模块(protected)
  - `hookManager` - 钩子模块(通过`player.hook`访问)
  - `loaderManager` - 视频加载器模块(通过`player.loader`访问)
  - `controlsManager` - 面板管理模块(通过`player.controls`访问)
  - `panelManager` - 面板管理模块(通过`player.panel`访问)
  - `menuManager` - 菜单项模块(通过`player.menu`访问)
  - `Utils` - 工具类函数
  - `Components` - 组件类

#### 插件
- 插件构成播放器的各种功能，不同插件组合可以实现不同的功能，应用于不同的场景。插件位于 `src/plugins/` 文件夹下

#### 工具函数

待补充

#### 类型定义

- 类型定义位于`src/core/types`文件夹内

### 模板规范

待补充

### CSS 开发规范

待补充

## 项目结构

```
mfuns-player
├─.vscode       // vscode编辑器配置
├─demo/         // 展示用文件
├─dist/         // 编译文件
├─src/          // 源代码
| ├─css/          // 样式文件
| | ├─plugins/        // 插件ui样式
| | ├─font-icon.scss  // 字体图标文件
| | ├─player.scss     // 播放器主体样式
| | ├─theme.scss      // 样式变量
| | └─index.scss      // 主体css文件
| └─core/           // 播放器核心文件
|   ├─components/   // 组件
|   ├─module/       // 核心模块
|   ├─types/        // 类型
|   ├─utils/        // 工具函数
|   ├─config.ts     // 播放器开发配置
|   ├─player.ts     // 播放器主体
|   ├─plugin.ts     // 插件类
|   └─index.ts      // 索引文件
├─globals.d.ts        // 全局类型声明文件
├─package.json        // 包配置文件
├─tsconfig.json       // Typescript配置文件
├─.eslintrc.js        // ESLint配置文件
├─.prettierrc.js      // Prettier配置文件
└─vite.config.js      // vite配置文件

```
