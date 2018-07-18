## 项目介绍

由于 market 项目配置项过多，特地开发了 tita 来为大家自动生成页面，目前的想法是省去开发人员的配置过程来，直接进入开发，后续我们可以丰富模板，将页面的一些公共逻辑及 UI 剥离出来，生成更复杂的页面。共勉~

## 使用方法

1.  npm i
2.  npm link
3.  配置 default.yml
4.  执行 tita default.yml

## 开发方法

### 目录结构

```javascript
.
├── CHANGELOG.md
├── README.md
├── auto
│   ├── dist
│   │   ├── audit.js
│   │   └── crm.js
│   ├── index.js
│   ├── myUtils.js
│   └── template
│       ├── audit
│       └── crm
├── bin
│   └── tita
├── crm.yml
├── default.yml
├── package-lock.json
└── package.json
```

### 入口

程序的入口是/bin/tita，这个文件主要做了一些前置工作：1、生成 tita 简介；2、获取 yml 文件的绝对地址；3、将 yml 文件的  地址传给主程序并启动主程序。

### dist
