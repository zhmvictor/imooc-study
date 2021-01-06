// 让 canvas 大小与屏幕大小一致
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

const canvas = document.getElementById('canvas');
const cxt = canvas.getContext('2d');

canvas.width = canvasWidth;
canvas.height = canvasHeight;

// 剪辑区域
let radius = 50;
let clippingRegion = {x: -1, y: -1, r: radius};
// 剪辑动画
let theAnimation;

let leftMargin = 0, topMargin = 0;

const img = new Image();
img.src = '../image/person.png';
img.onload = e => {
  $('#blur-div').css('width', `${canvasWidth}px`);
  $('#blur-div').css('height', `${canvasHeight}px`);

  $('#blur-img').css('width', `${img.width}px`);
  $('#blur-img').css('height', `${img.height}px`);

  leftMargin = (img.width - canvasWidth) / 2;
  topMargin = (img.height - canvasHeight) / 2;

  // 由于图片超出了canvas，所以图片的上边距和左边距都应该是负值
  $('#blur-img').css('top', `${String(-topMargin)}px`);
  $('#blur-img').css('left', `${String(-leftMargin)}px`);

  initCanvas();
}
// 初始化 canvas
function initCanvas() {
  let theLeft = leftMargin < 0 ? -leftMargin : 0;
  let theTop = topMargin < 0 ? -topMargin : 0;
  // 重置剪辑区域，剪辑区域随机，算法参考 ../image/course/红包照片-剪辑区域.png
  clippingRegion = {
    x: Math.random() * (canvasWidth - 2 * radius - 2 * theLeft) + radius + theLeft, 
    y: Math.random() * (canvasHeight - 2 * radius - 2 * theTop) + radius + theTop, 
    r: radius
  };
  draw(img, clippingRegion);
}
// 设置剪辑区域
function setClippingRegion(clippingRegion) {
  cxt.beginPath();
  cxt.arc(clippingRegion.x, clippingRegion.y, clippingRegion.r, 0, Math.PI * 2);
  cxt.clip();
}
// 绘制 canvas 图片
function draw(img, clippingRegion) {
  cxt.clearRect(0, 0, canvasWidth, canvasHeight);

  cxt.save();

  setClippingRegion(clippingRegion);
  // 截取图片的一部分放在 canvas 中
  cxt.drawImage(img, 
    Math.max(leftMargin, 0), Math.max(topMargin, 0), 
    Math.min(canvasWidth, img.width), Math.min(canvasHeight, img.height), 
    leftMargin < 0 ? -leftMargin : 0, 
    topMargin < 0 ? -topMargin : 0, 
    Math.min(canvasWidth, img.width), Math.min(canvasHeight, img.height));

  cxt.restore();
}
// SHOW
function show() {
  // 设置显示动画
  theAnimation = setInterval(() => {
    clippingRegion.r += 20;
    draw(img, clippingRegion);
    if(clippingRegion.r > 2 * Math.max(canvasWidth, canvasHeight)) {
      clearInterval(theAnimation);
    }
  }, 30);
}
// RESET
function reset() {
  if(theAnimation) {
    clearInterval(theAnimation);
  }
  initCanvas();
}

// 阻止滑动默认事件
canvas.addEventListener('touchstart', e => {
  e.preventDefault();
})

// 思考：
// 将剪辑区域改成刮刮卡形式
