# 移动web开发适配秘籍Rem
# 启动

```
# 安装依赖
npm install

# 启动项目
npm run watch

# 运行
index.html
```
# rem

## 常见移动web适配方法

- 定高，宽度百分比（简单页面）
- flex
- Media Query 媒体查询

## Media Query

- 写法一：写在`style`标签中
```
@media 媒体类型 and (媒体特性) {
  /*css样式*/
}
```
- 写法二：写在`link`标签中
```
<link rel="stylesheet" href="style.css" media="媒体类型 and (媒体特性)">
```
媒体类型：screen、print...

媒体特性：max-width、max-height...

```
@media screen and (max-width: 320px) {
  /* css */
  .inner {
    width: 60px;
    height: 100px;
    background-color: blue;
  }
}
@media screen and (min-width: 321px) {
  /* css */
  .inner {
    width: 100px;
    height: 100px;
    background-color: yellow;
  }
}
```
---
## rem

### rem 原理：font size of the root element

**总结：1rem = html 的 font-size**

- 字体单位
  - 值根据 html 根元素大小而定，同样可以作为宽度、高度等单位
- 适配原理
  - 将 px 替换成 rem，动态修改 html 的 font-size 适配
- 兼容性
  - IOS 6 以上和 Android 2.1 以上，基本覆盖所有流行的手机系统

### 动态修改 html: font-szie 方法

1. 使用 Media Query（由于屏幕分辨率较多，不推荐）

```
@media screen and (max-width: 360px) {
  html {
    font-size: 20px;
  }
}
```

2. 使用 js 设置

```
// 获取设备宽度（视窗宽度）
let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
// 获取 html 标签
let htmlDom = document.getElementsByTagName('html')[0];
htmlDom.style.fontSize = `${htmlWidth/10}px`;
```

### rem 进阶

> rem 基准值

rem 的基准值是 html 的 font-size 值

> rem 数值

rem 数值是根据 html 的 font-size 换算出的值

> rem 与 scss 结合使用

利用 scss 计算 rem 数值

`a.scss`
```
@function px2rem($px) {
  // iphone6
  $rem: 37.5px;
  @return ($px / $rem) + rem;
}

.hello {
  width: px2rem(100px);
  height: px2rem(100px);
  &.b {
    width: px2rem(50px);
    height: px2rem(50px);
  }
}
```

`b.css`（将`a.scss`使用 node-scss 编译后的文件）
```
.hello {
  width: 2.66667rem;
  height: 2.66667rem;
}
.hello.b {
  width: 1.33333rem;
  height: 1.33333rem;
}
```

### rem 案例

[rem-demo](https://github.com/zhmvictor/rem-demo)

**案例简析**

`index.scss`中的`px2rem`方法，功能是单位换算，将 px 换算成 rem。

其中，`$rem`是初始基准值，即初始开发时选择的机器（这个案例用的是iphone6）的 html 的 font-size 值。

`$rem`的作用是设置一个正确的适配比率（或倍数），即`$px / $rem`。

注意，@return 最后 + 的 rem 是单位。
```
@function px2rem($px) {
  $rem: 37.5px;
  @return ($px / $rem) + rem;
}
```
rem 真正的值是通过 js 来动态设置的。

也就是说，当切换分辨率时，`1rem = htmlWidth / 10 + 'px'`。

此时，可以反计算出 px 的值为 `1rem * ($px / $rem)`，通过 chrome DevTools 可验证。
```
// 获取 html
let htmlDom = document.getElementsByTagName('html')[0];
// 获取基准值
function getHtmlFontSize() {
  // 获取屏幕宽度(viewport)
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  // 设置 html 的 fontSize
  htmlDom.style.fontSize = htmlWidth / 10 + 'px';
}

getHtmlFontSize();

window.addEventListener('resize', (e) => {
  getHtmlFontSize();
});
```
---
## 扩展

web 适配的其他方案（从评论里的大佬了解到的，其他方案有待更新）

- [px-to-viewport](https://github.com/evrone/postcss-px-to-viewport)


