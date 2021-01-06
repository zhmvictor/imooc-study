# 慕课 liuyubobobo 老师的 canvas 系列课程学习笔记
# 案例

- [示例代码](./demo)
- [学写一个字](./handlewriting)
- [css3滤镜-filter](./demo/filter.html)

# canvas

## 什么是 canvas

> canvas 元素用于在网页上绘制图形（矢量图）

- canvas 本身没有绘图能力，仅是图形的容器，相当于一块矩形画布。
- 所有的绘制工作必须在脚本内部完成，通常用 JavaScript 在画布内绘制图像。
- 你可以控制画布的每一个像素，画布上的 X 和 Y 坐标用于对画布上的图像进行定位，如果图像超出画布，超出画布的部分不会显示。

--------------------

## 使用 canvas 绘图

```
<body>
  <canvas id="canvas" width="200" height="100" style="border:1px solid #c3c3c3;">
    Your browser does not support the canvas element.
  </canvas>
  <script>
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
  </script>
</body>
```

1. 创建 canvas 画布

规定元素的 id、宽度和高度。若不指定宽高，则默认 300x150。注意指定宽高不带单位。

有些浏览器可能不支持 canvas，此时页面将呈现 canvas 标签内的内容，这种写法用于解决浏览器兼容问题。

```
<canvas id="canvas" width="200" height="100">
  Your browser does not support the canvas element.
</canvas>
```

2. JavaScript 使用 id 寻找 canvas 对象

```
var canvas = document.getElementById('canvas');
```

3. 创建上下文对象 context（getContext("2d") 对象是 HTML5 内置对象之一）。

```
var context = canvas.getContext('2d');
```

4. 通过调用 context 对象的方法或属性实现绘图。

--------------------------

## 总结

### canvas 指定大小的方法

1. 在 canvas 标签中直接指定

```
<canvas id="canvas" width="200" height="100">
  Your browser does not support the canvas element.
</canvas>
```

2. 在 JavaScript 中指定

```
var canvas = document.getElementById('canvas');
canvas.width = 1024;
canvas.height = 768;
```

### canvas 浏览器兼容问题

1. 在 canvas 标签中写提示语

```
<canvas id="canvas">
  Your browser does not support the canvas element.
</canvas>
```

2. 判断 `canvas.getContext('2d')` 是否为 null

```
if(canvas.getContext('2d')) {
  var canvas = document.getElementById('canvas');
} else {
  alert('Your browser does not support the canvas element.');
}
```

3. 判断某个具体方法或状态属性是否兼容

```
if(context.xxx) {

} else {
  alert('Your browser does not support the canvas element');
}
```
4. Canvas 与老的 IE6/7/8兼容问题

第三方 js 库：explorecanvas

### API

canvas 基于状态绘制，画图的过程都是状态，绘制是动作。

- canvas
  - context.canvas
  - canvas.width
  - canvas.height
- 绘制
  - 描边画图 context.stroke() 
  - 填充颜色 context.fill() 
  - 用于封闭图形，结束封闭图形的状态
    - context.beginPath() 开始全新的路径状态
    - context.closePath() 结束路径
- 线条
  - 直线
    - 笔尖起始位置 context.moveTo(x, y) 
    - 连接线 context.lineTo(x, y) 
    - 虚线 context.setLineDash([虚线线段长度, 虚线空白长度]);
  - 曲线
    - 圆弧
      - context.arc(centerX, centerY, radius, 开始弧度, 结束弧度, 是否逆时针（可选）)
      - 弧度按顺时针方向依次为 0、0.5π、1.5π、2π
    - 普通弧
      - 控制线起始点（非弧线起始点） context.moveTo(x0, y0)
      - context.arcTo(x1, y1, x2, y2. radius)
        - 控制点 (x1, y1) 
        - 控制线结束点（非弧线结束点） (x2, y2) 
      - 弧线起始点和结束点与两条控制线相切
    - 二次贝塞尔曲线
      - 起始点 context.moveTo(x0, y0) 
      - context.quadraticCurveTo(x1, y1, x2, y2)
        - 控制点 (x1, y1) 
        - 结束点 (x2, y2) 
    - 三次贝塞尔曲线
      - 起始点 context.moveTo(x0, y0) 
      - context.bezeirCurveTo(x1, y1, x2, y2, x3, y3)
        - 控制点1 (x1, y1) 
        - 控制点2 (x2, y2) 
        - 结束点 (x3, y3) 
  - 线条样式
    - 线条宽度 context.lineWidth 
    - 线条样式 context.strokeStyle 
    - 填充样式 context.fillStyle 
      - 任意css生效的颜色值 color
      - 渐变 gradient 
        - 线性渐变 let grd = context.createLinearGradient(xstart, ystart, xend, yend) 
        - 径向渐变 let grd = context.createRadialGradient(x0, y0, r0, x1, y1, r1) 
        - 添加渐变颜色值 grd.addColorStop(stop, color) 
      - image | canvas | video
        - context.createPattern(img, repeat-style)
        - context.createPattern(canvas, repeat-style)
        - context.createPattern(video, repeat-style)
        - repeat-style
          - no-repeat
          - repeat-x
          - repeat-y
          - repeat
  - 线条两端样式
    - lineCap
      - butt 默认值，正常线条 
      - round 圆头线条 
      - square 方头线条 
      - round 和 square 只能用在线段的开始和结尾处，转折处不生效
      - square 也可以用于封闭图形，不过更推荐 closePath()
    - lineJoin 线条相交呈现的形态
      - miter 默认值，尖角
      - bevel 斜接，类似于纸条自然折叠的状态
      - round 圆角
    - miterLimit
      - 默认值 10
      - 当 lineJoin = 'miter' 时生效
      - 线条相接处内角和外角的距离的最大值
- 图形
  - 矩形
    - context.rect(x, y, width, height)
    - context.fillRect(x, y, width, height)
    - context.strokeRect(x, y, width, height)
    - context.clearRect(x, y, width, height)
      - 清空指定矩形内的图像
      - 通常用于清空重绘当前画布
  - 图形变换
    - 位移 translate(x, y) 
    - 旋转 rotate(deg) 
    - 缩放 scale(sx, sy) 
      - 有副作用，会同时放大图像其他数值属性，比如左上角坐标、线条宽度
    - 变换矩阵（单位矩阵） transfrom(a, b, c, d, e, f)
      - a 水平缩放(1)
      - b 水平倾斜(0)
      - c 垂直倾斜(0)
      - d 垂直缩放(1)
      - e 水平位移(0)
      - f 垂直位移(0)
      - 综合了上面三个单独的图形变换方法
      - 每次调用具有叠加效果
    - setTransform(a, b, c, d, e, f)
      - 重新设置 transfrom，消除前面所有 transform 的效果
  - 图形变换状态保存和恢复
    - save()
    - restore()
- 文字
  - context.font
    - 默认值 "20px sans-serif"
    - context.font = "font-style font-variant font-weight font-size font-family"
  - 文本对齐
    - 文本对齐的基准是绘制文字的初始坐标值
    - 水平对齐 context.textAlign = 
      - left
      - center
      - right
    - 垂直对齐 context.textBaseline =
      - top
      - middle
      - bottom
      - alphabetic（default）基于拉丁文
      - ideographic 基于方块字（汉语或日语）
      - hanging 基于印度文
  - context.fillText(string, x, y, [maxlen])
  - context.strokeText(string, x, y, [maxlen])
  - 文本度量 context.measureText(string).width
    - 使用前需要先设置文本font属性，因为不同font的文字，文本度量不同
- 阴影
  - 阴影颜色 context.shadowColor
   - 值为css可接受的颜色
  - 阴影x偏移 context.shadowOffsetX
  - 阴影y偏移 context.shadowOffsetY
  - 阴影模糊程度 context.shadowBlur
    - 0表示不模糊，值越大阴影越模糊
  - 阴影的以上四个状态值基本成套使用
- global
  - globalAlpha 全局透明度
    - 默认值 1
    - 0 ~ 1: 透明 ~ 不透明
  - globalCompositeOperation 绘制的图像在重叠时产生的效果
    - source-x
      - source-over（default） 后绘制的图形遮盖先绘制的图形
      - source-atop
      - source-in
      - source-out
    - destination-x
      - destination-over
      - destination-atop
      - destination-in
      - destination-out
    - 其他
      - lighter
      - copy
      - xor
- 剪辑区域
  - context.clip()
- 非零环绕原则
  - 从区域取一点，向外延伸矢量射线，射线与多个图形边缘相交，图形边缘方向相同计算结果为正，图形边缘方向相反计算结果为 0，则该区域处于整个图形的外面。
  - 与绘制路径方向相关
- isPointInPath
  - context.isPointInPath(x, y)
  - 点击检测函数，判断点(x, y)是否在规划的路径内
  - 可用于交互

### 扩展 context

在 `CanvasRenderingContext2D.prototype` 上添加想要扩展的方法或属性

### canvas 图形库

- [canvasplus](https://code.google.com/p/canvasplus/)
- [Artisan JS](http://artisanjs.com/)
- [Rgraph](https://roopons..com.au/wp-content/plugins/viral-optins/js/rgraph)

### canvas 图像处理

#### 加载图像用`context.drawImage(image, dx,dy)`。

`image` 是图像对象（不一定非要是图片，也可以是canvas）。

`(dx, dy)` 是绘制图像的起始位置。

```
const canvas = document.getElementById('canvas');
const cxt = canvas.getContext('2d');
window.onload = function() {
  canvas.width = 1200;
  canvas.height = 800;

  let img = new Image();
  img.src = '../image/code.png';
  img.onload = function() {
    cxt.drawImage(img, 50, 50);
  }
}
```
注意：
1. 需要等待图片读取完成才能调用绘制接口（即需要在`img.onload`中调用`context.drawImage`）
2. 直接调用`drawImage`接口，使用的是图片原有的尺寸，从指定的开始位置平铺在画布中，不会进行缩放
3. 当图像尺寸超出canvas时，canvas会将超出部分自动截断

#### drawIamge 的三种调用方式

1. `context.drawImage(image, dx, dy)`

2. `context.drawIamge(image, dx, dy, dw, dh)`，传入宽（dw）、高（dh）可以对图像进行缩放

3. `context.drawIamge(image, sx, sy, sw, sh, dx, dy, dw, dh)`，
其中，`s`表示源图像，`d`表示绘制出的目标图像

#### 离屏 canvas

将第二个 canvas 的内容绘制到第一个 canvas 上，并且第二个 canvas 本身不可见，因此称为“离屏 canvas”。

离屏 canvas 常用于添加水印。

#### 获取图像像素 `getImageData`

```
imageData = context.getImageData(x, y, w, h)
```
imageData 对象属性：
- width
- height
- data 像素数据

#### 将已知 imageData 放入画布 `putImageData`

```
context.putImageData(imageData, dx, dy, dirtyX, dirtyY, dirtyW, dirtyH)
```
dirtyX, dirtyY 会累加到 dx, dy 上

#### 创建 imageData 方法 `createImageData`

```
imageData = createImageData(w, h)
```

### 移动端适配 - Viewport 元信息

`viewport`在 HTML 的头部。

按需修改 `viewport`, 使屏幕显示达到自己想要的效果。

通常修改以下 6 个属性即可。

```
<meta name="viewport" 
      content="
        width=[piexl_value | device-width],
        height=[piexl_value | device-height],
        initial-scale=float_value,
        minimum-scale=float_value,
        maximum-scale=float_value,
        user-scalable=[yes | no]
      "
>
```
- pixel_value: 像素值
- device-width, device-height: 当前设备宽高
- initial-scale: 初始伸缩量，浮点值，通常为 1.0，表示没有缩放效果
- minimum-scale, maximum-scale: 允许缩放的情况下，缩放的最小尺度和最大尺度
- user-scalable: 是否允许缩放 

#### 触控事件 touch

- touchstart
- touchmove
- touchend

### css3 滤镜 - filter

菜鸟教程：[CSS3 filter(滤镜) 属性](https://www.runoob.com/cssref/css3-pr-filter.html)


-------------------------------

## 注意事项

- 不建议用 css 方式给 canvas 指定大小，因为 css 指定的实际是 canvas 画布的显示的大小，而画布还包括内里的绘画元素的大小，用 css 时并没有把内里元素的大小指定出来。使用 canvas 的 width 和 height 属性指定大小，相当于把 canvas 画布和内里元素的精度一同指定了出来，符合 W3C 标准。
- canvas 宽高不带单位。
- canvas 坐标系: 左上角为原点(0, 0)，x轴正向向右，y轴正向向下
- canvas 是基于**状态**绘图的，使用`context.beginPath()`开始路径状态，使用`context.closePath()`结束路径状态。使用`context.closePath()`会自动封闭未封闭的图形。二者不一定成对出现，但是推荐成对出现。

