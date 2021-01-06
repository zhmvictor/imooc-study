// canvas 宽高
let WINDOW_WIDTH = 1024;
let WINDOW_HEIGHT = 768;
// 圆半径
let RADIUS = 8;
// 距离画布的上边距和左边距
let MARGIN_TOP = 60;
let MARGIN_LEFT = 30;
// 倒计时截止时间，截止系统当前时间一个小时
// let endTime = new Date();
// endTime.setTime(endTime.getTime() + 3600 * 1000);
// 现在为止倒计时需要多少秒，单位：秒
let curShowTimeSeconds = 0;
// 画布刷新时间间隔，单位：毫秒
const timer = 50;
// 运动小球
let balls = [];
const colors = ['#33B5E5', '#0099CC', '#AA66CC', '#9933CC', '#99CC00', '#669900', '#FFBB33', '#FF8800', '#FF4444', '#CC0000'];

window.onload = function () {
  // 屏幕自适应
  // 加上 document.documentElement.clientWidth 解决了body 呈现半屏问题
  WINDOW_WIDTH = document.documentElement.clientWidth || document.body.clientWidth;
  WINDOW_HEIGHT = document.documentElement.clientHeight || document.body.clientHeight;
  // 两侧空白占屏幕的 1/5，左侧空白占整个屏幕的 1/10
  MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
  // 时钟占屏幕的 4/5，时钟总共有 108 个小正方形（radius + 1）
  // 108 = 93 + (7 * 2 + 1)
  // 7 *2 + 1 表示时钟的最后一个数字所占空间，参考 3-2 章节每个数字的计算方式
  RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1;

  MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5);

  // 根据id获取画布元素
  const canvas = document.getElementById('canvas');
  // 获取context对象
  const cxt = canvas.getContext('2d');
  // 设置画布宽高
  canvas.width = WINDOW_WIDTH;
  canvas.height = WINDOW_HEIGHT;
  // 现在为止倒计时需要多少秒，单位：秒
  curShowTimeSeconds = getCurrentShowTimeSeconds();
  // 刷新
  setInterval(() => {
    render(cxt);
    update();
  }, timer);
};

// 计算倒计时时间
function getCurrentShowTimeSeconds() {
  // 当前时间
  const curTime = new Date();
  // // 计算时间差
  // let ret = endTime.getTime() - curTime.getTime();
  // // 由于 getTime 返回 1970 年 1 月 1 日至今的毫秒数，所以需要将毫秒转换为秒
  // // 并将计算得到的秒数四舍五入取整
  // ret = Math.round(ret / 1000);
  // 当前时间秒数
  let ret = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();
  // 秒
  return ret >= 0 ? ret : 0;
}
// 动画
function update() {
  // 下一次显示的时间
  let nextShowTimeSeconds = getCurrentShowTimeSeconds();

  const nextHours = parseInt(nextShowTimeSeconds / 3600);
  const nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60);
  const nextSeconds = nextShowTimeSeconds % 60;

  const curHours = parseInt(curShowTimeSeconds / 3600);
  const curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60);
  const curSeconds = curShowTimeSeconds % 60;

  if (nextSeconds !== curSeconds) {
    // 每次时间变化，都添加小球
    // 时
    if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {
      addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(curHours / 10));
    }
    if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
      addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curHours / 10));
    }
    // 分
    if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)) {
      addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes / 10));
    }
    if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)) {
      addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes % 10));
    }
    // 秒
    if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {
      addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds / 10));
    }
    if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {
      addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(nextSeconds % 10));
    }
    curShowTimeSeconds = nextShowTimeSeconds;
  }
  updateBalls();
}
function addBalls(x, y, num) {
  for (let i = 0; i < digit[num].length; i++) {
    for (let j = 0; j < digit[num][i].length; j++) {
      if (digit[num][i][j] == 1) {
        let aBall = {
          x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
          y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
          g: 1.5 + Math.random(),
          vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
          vy: -5,
          color: colors[Math.floor(Math.random() * colors.length)],
        };
        balls.push(aBall);
      }
    }
  }
}
function updateBalls() {
  for (let i = 0; i < balls.length; i++) {
    balls[i].x += balls[i].vx;
    balls[i].y += balls[i].vy;
    balls[i].vy += balls[i].g;
    // 碰撞检测，如果小球碰撞到地板，则反弹
    // 摩擦系数 0.75，呈现能量损耗的效果
    if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
      balls[i].y = WINDOW_HEIGHT - RADIUS;
      balls[i].vy = -balls[i].vy * 0.75;
    }
  }
  // 当前屏幕里的小球
  let cnt = 0;
  for(let i = 0; i < balls.length; i++) {
    // 检测小球是否仍有部分在画布内，条件：球右边界 > 0 且 球左边界 < 画布宽
    if(balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH) {
      balls[cnt++] = balls[i];
    }
  }
  // 性能优化
  // 当前屏幕里的小球 <= 300
  while(balls.length > Math.min(300, cnt)) {
    balls.pop();
  }
  console.log(balls.length);
}
// 渲染时钟图像
function render(cxt) {
  // 清空画布内元素，避免每次刷新动画叠加
  cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
  // 计算时间
  const hours = parseInt(curShowTimeSeconds / 3600);
  const minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60);
  // 不足一分钟的剩余秒数
  const seconds = curShowTimeSeconds % 60;
  // 绘制时钟图像
  renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), cxt);
  renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), cxt);
  renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt);
  renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), cxt);
  renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), cxt);
  renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt);
  renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), cxt);
  renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), cxt);
  // 绘制小球
  renderBalls(cxt);
}
// 绘制单个数字图像
function renderDigit(x, y, num, cxt) {
  cxt.fillStyle = 'rgb(0,102,153)';
  for (let i = 0; i < digit[num].length; i++) {
    for (let j = 0; j < digit[num][i].length; j++) {
      if (digit[num][i][j] == 1) {
        cxt.beginPath();
        cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI);
        cxt.closePath();
        cxt.fill();
      }
    }
  }
}
// 绘制小球
function renderBalls(cxt) {
  for (let i = 0; i < balls.length; i++) {
    cxt.fillStyle = balls[i].color;
    cxt.beginPath();
    cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI, true);
    cxt.closePath();
    cxt.fill();
  }
}
