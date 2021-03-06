# Std UI（Standard UI）


## 简介

Std UI 是一套用 JSON 描述 UI 的解决方案。设计这套解决方案的目的是：

* 提供一个平台无关、框架无关的静态 UI 描述标准。
* 一套代码，多端渲染。
* 支持多种布局方式，告别绝对布局，轻松设计界面。
* 为不同的 UI 设计语言和工具提供一个中间层转换工具，便于相互转换。

目前版本是 v0.1.0。


## 快速开始

比如在一个 300 x 300 的黑色画布中间，绘制一个 100 x 100 的红色矩形：

```json
{
    "_type": "root",
    "width": 300,
    "height": 300,
    "color": "#000",
    "_children": [
        {
            "_type": "rect",
            "x": 100,
            "y": 100,
            "width": 100,
            "height": 100,
            "color": "#f00"
        }
    ]
}
```


## 规范

在这里可以查看[标准规范](docs/std.md)


## 使用

安装

```shell
npm i @yunser/ui-std
```

Std JSON 转成 SVG 代码。

```js
const { StdUI } = require('@yunser/ui-std')

const json = {
    "_type": "root",
    "width": 300,
    "height": 300,
    "color": "#fff",
    "_children": [
        {
            "_type": "rect",
            "x": 100,
            "y": 100,
            "width": 100,
            "height": 100,
            "color": "#f00"
        }
    ]
}

const stdUi = new StdUI({
    root: json,
})

console.log(stdUi.toSvg())
console.log(stdUi.toHtml())

```


## Std Mind Map（Standard Mind Map）

脑图模块是基于 Std UI 的脑图拓展，致力于提供统一的脑图规范。

比如，我们可以构建这样的 JSON 数据：

```json
{
    "_type": "mind",
    "root": {
        "_text": "root",
        "_children": [
            {
                "_type": "node",
                "_text": "1",
                "_children": [
                    {
                        "_type": "node",
                        "_text": "11"
                    },
                    {
                        "_type": "node",
                        "_text": "12"
                    }   
                ]
            },
            {
                "_type": "node",
                "_text": "2",
                "_children": [
                    {
                        "_type": "node",
                        "_text": "21"
                    }   
                ]
            },
            {
                "_type": "node",
                "_text": "3"
            }
        ]
    }
}
```

渲染效果如下：

![](docs/images/mind-json@2x.png)

使用代码转换格式：

```js
import { MindMap } from '@yunser/ui-std/dist/mindMap'
import * as fs from 'fs'

const root = {
    "_type": "node",
    "_text": "root",
    "_children": [
        {
            "_type": "node",
            "_text": "1",
            "_children": [
                {
                    "_type": "node",
                    "_text": "11"
                },
                {
                    "_type": "node",
                    "_text": "12"
                }
            ]
        },
        {
            "_type": "node",
            "_text": "2",
            "_children": [
                {
                    "_type": "node",
                    "_text": "21"
                }
            ]
        },
        {
            "_type": "node",
            "_text": "3"
        }
    ]
}
const mindMap = new MindMap({
    root
})

// 转成百度脑图格式
const kmContent = mindMap.toKityMinder()
console.log('content', kmContent)
fs.writeFileSync('out.km', kmContent, 'utf8')

// 转成 FreeMind 格式
const mmContent = mindMap.toFreeMind()
console.log('content', mmContent)
fs.writeFileSync('out.mm', mmContent, 'utf8')

// 转成 ProcessOn 格式
const posContent = mindMap.toProcessOn()
console.log('content', posContent)
fs.writeFileSync('out.pos', posContent, 'utf8')
```

导入思维导图

```js
// 导入百度脑图
const mindMap = new MindMap()
const kmData = fs.readFileSync('res/root.km', 'utf8')
mindMap.fromKityMinder(kmData)
```


## Std Doc（Standard Document）

Std Doc 规范用于统一富文本。

构建 JSON 如下：

```json
{
    "_type": "doc",
    "version": "0.0.1",
    "_children": [
        {
            "_type": "h1",
            "_text": "一级标题"
        },
        {
            "_type": "p",
            "_text": "这是第一段"
        },
        {
            "_type": "p",
            "_text": "这是第二段"
        },
    ]
}
```

使用：

```js
import { Doc } from '@yunser/ui-std/dist/doc'
import * as fs from 'fs'

const content = [
    {
        "_type": "h1",
        "_text": "一级标题"
    },
    {
        "_type": "h2",
        "_text": "二级标题"
    },
    {
        "_type": "p",
        "_text": "这是第一段"
    },
    {
        "_type": "p",
        "_text": "这是第二段"
    },
    {
        "_type": "h2",
        "_text": "二级标题"
    },
    {
        "_type": "p",
        "_text": "这是第三段"
    },
    {
        "_type": "image",
        "url": "https://icons.yunser.com/icons/app.png",
        "width": 100,
        "height": 100
    }
]
let doc = new Doc({
    content,
})

fs.writeFileSync('out/doc.md', doc.toMarkdown(), 'utf8')

```


## 开发测试

```
ts-node test.ts
```


## 相关项目

* [ui-web](https://github.com/yunser/ui-web)
* [figma-json](https://github.com/yunser/figma-json)


## 存在的问题

* 导出 HTML 时边框遮挡问题。
* 导出 HTML 不支持 `text.backgroundColor` 和 `text.centerd`。
* 导出的 HTML 和 SVG 暂时无法保障像素级别一致。


## TODO

* 阴影颜色支持 rgb。
* 导出 eps（10%）
    * 支持椭圆
    * 支持文字
    * 支持图片
    * 支持路径
    * 支持渐变
    * 支持阴影
    * 支持透明度


## 参考

* https://www.mathworks.com/discovery/affine-transformation.html