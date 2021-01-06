let canvasWidth = Math.min(800, $(window).width() - 20);
let canvasHeight = canvasWidth;
// 鼠标是否点击
let isMouseDown = false;
// 上一次鼠标所在位置
let lastLoc = {x: 0, y: 0};
// 时间戳
let lastTimestamp = 0;
// 上一次线条宽度
let lastlineWidth = -1;
// 当前绘制颜色
let strokeColor = 'black';

const canvas = document.getElementById('canvas');
const cxt = canvas.getContext('2d');

canvas.width = canvasWidth;
canvas.height = canvasHeight;

$('#controller').css('width', `${canvasWidth}px`);

drawGrid();

// 控制器
// 清除
$('#clear-btn').click(
  function(e) {
    cxt.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
  }
);
// 改变颜色
$('.color-btn').click(
  function(e) {
    $('.color-btn').removeClass('color-btn-selected');
    $(this).addClass('color-btn-selected');
    strokeColor = $(this).css('background-color');
  }
);

// 监听触控事件
canvas.addEventListener('touchstart', e => {
  e.preventDefault();
  // 选取第0个元素
  let touch = e.touches[0];
  beiginStroke({x: touch.pageX, y: touch.pageY});
});
canvas.addEventListener('touchmove', e => {
  e.preventDefault();
  if(isMouseDown) {
    let touch = e.touches[0];
    moveStroke({x: touch.pageX, y: touch.pageY});
  }
});
canvas.addEventListener('touchend', e => {
  e.preventDefault();
  endStroke();
});

/**
 * 监听鼠标事件
 * 
 * preventDefault 作用：阻止默认事件响应
 * - 浏览器端作用不大，移动端作用强大
 * - 通常使用键盘操作程序时，有作用，比如控制游戏上下左右移动，为了避免上箭头翻页，需要阻止默认事件
 */
canvas.onmousedown = e => {
  e.preventDefault();
  beiginStroke({x: e.clientX, y: e.clientY});
}
canvas.onmouseup = e => {
  e.preventDefault();
  endStroke();
}
canvas.onmouseout = e => {
  e.preventDefault();
  endStroke();
}
canvas.onmousemove = e => {
  e.preventDefault();
  if(isMouseDown) {
    moveStroke({x: e.clientX, y: e.clientY});
  }
}

// 开始绘制
function beiginStroke(point) {
  isMouseDown = true;
  lastLoc = windowToCanvas(point.x, point.y);
  lastTimestamp = new Date().getTime();
}

// 结束绘制
function endStroke() {
  isMouseDown = false;
}

// 移动过程中绘制
function moveStroke(point) {
  // 当前鼠标所在位置
  let curloc = windowToCanvas(point.x, point.y);
  // 当前时间戳
  let curTimestamp = new Date().getTime();
  // 路程
  let s = calcDistance(curloc, lastLoc);
  // 时间
  let t = curTimestamp - lastTimestamp;
  // 线条宽
  let lineWidth = calcLineWidth(t, s);

  drawWords(curloc, lineWidth);

  lastLoc = curloc;
  lastTimestamp = curTimestamp;
  lastlineWidth = lineWidth;
}

// 绘制文字
// 思想：每次移动时，在上一次鼠标所在位置的点与当前鼠标所在位置的点之间画直线。
function drawWords(curloc, lineWidth) {
  cxt.beginPath();
  cxt.moveTo(lastLoc.x, lastLoc.y);
  cxt.lineTo(curloc.x, curloc.y);

  cxt.strokeStyle = strokeColor;
  cxt.lineWidth = lineWidth;
  // 解决线条间隔问题
  cxt.lineCap = 'round';
  cxt.lineJoin = 'round'; 

  cxt.stroke();
}

/**
 * 绘制线条
 * 
 * 解决所有笔画粗细一致的问题:
 * 根据运笔速度来影响笔画粗细，速度越快，笔画越细
 * 
 * 速度 = 路程 / 时间
 */
let maxLineWidth = 30;
let minLineWidth = 1;
let maxStrokeV = 10;
let minStrokeV = 0.1;
function calcLineWidth(t, s) {
  let v = s / t;
  let resultLineWidth;
  // 处理速度临界点，假定 v (0.1, 10)
  if (v <= minStrokeV) {
    // 速度非常慢
    resultLineWidth = maxLineWidth;
  } else if (v >= maxStrokeV) {
    // 速度非常快
    resultLineWidth = minLineWidth;
  } else {
    // 差值计算，可以用更复杂的数学计算，使线条更平滑，更逼真
    resultLineWidth = maxLineWidth - (v -minStrokeV) / (maxStrokeV - minStrokeV) * (maxLineWidth - minLineWidth);
  }
  // 解决线条不平滑问题
  if(lastlineWidth === -1) {
    return resultLineWidth;
  } 
  return lastlineWidth * 2 / 3 + resultLineWidth * 1 / 3;
}

// 求两点间距离
function calcDistance(loc1, loc2) {
  return Math.sqrt((loc1.x - loc2.x) ** 2 + (loc1.y - loc2.y) ** 2);
}

// 坐标转换
function windowToCanvas(x, y) {
  // 包围盒
  let bbox = canvas.getBoundingClientRect();
  return {
    x: Math.round(x - bbox.left),
    y: Math.round(y - bbox.top)
  };
}

// 绘制米字格
function drawGrid() {
  cxt.save();

  cxt.strokeStyle = 'rgb(230, 11, 9)';

  cxt.beginPath();
  cxt.moveTo(3, 3);
  cxt.lineTo(canvas.width - 3, 3);
  cxt.lineTo(canvas.width - 3, canvas.height - 3);
  cxt.lineTo(3, canvas.height - 3);
  cxt.closePath();

  cxt.lineWidth = 6;
  cxt.stroke();

  cxt.beginPath();
  cxt.moveTo(0, 0);
  cxt.lineTo(canvasWidth, canvasHeight);

  cxt.moveTo(0, canvasHeight);
  cxt.lineTo(canvasWidth, 0);

  cxt.moveTo(0, canvasHeight / 2);
  cxt.lineTo(canvasWidth, canvasHeight / 2);

  cxt.moveTo(canvasWidth / 2, 0);
  cxt.lineTo(canvasWidth / 2, canvasHeight);

  cxt.lineWidth = 1;
  // 画虚线，数组第一个元素表示虚线的每段实线的长度，数组第二个元素表示虚线的空格长度
  cxt.setLineDash([5, 2]);
  cxt.stroke();

  cxt.restore();
}
