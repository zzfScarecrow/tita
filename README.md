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
├── default.yml
├── package-lock.json
└── package.json
```

### 入口

程序的入口是/bin/tita，这个文件主要做了一些前置工作：1、生成 tita 简介；2、获取 yml 文件的绝对地址；3、将 yml 文件的  地址传给主程序并启动主程序。

### yml

正如 default.yml，文件中的 target 和 project 是必填项，target 是项目的根目录，project 是需要添加页面的项目的名称。

### dist

这个文件夹下的所有文件跟 yml 中的 project 一一对应。主程序会根据 yml 中的 project 名来寻找对应的 dist 文件。所有 dist 文件都返回一个函数 fuc，fuc 接受一个对象，这个对象就是通过 yml 来定义的各种参数组成的对象。func 返回一个带有 output 属性的对象，output 是一个数组，它的元素由带和 tpl 和 realPath 的属性的对象组成，tpl 就是我们需要其生成的代码的模板。realPath 就是  生成的代码需要写入的目标地址。模板用的是[ejs](https://ejs.bootcss.com/)模板引擎。
同时，除 output 属性外，还可以定义任意函数，一般用来修改项目中的一些配置项，如添加多入口项目中 webpack 的 entry。Tita 会依次执行定义的函数。

### template

template 下面的所有文件  夹名也跟 project 属性一一对应。存放这个项目需要用到的所有模板。

### 主程序

index.js 是主程序，实现了一个 Tita 类，暴露出去的 start 函数接收前面入口传入的 yml 文件的地址，然后将 yml 文件解析成对象传给 Tita。Tita 首先判断将要生成的页面是否存在，然后读取 dist 文件开始根据模板文件和 yml 文件来生成目标文件。
