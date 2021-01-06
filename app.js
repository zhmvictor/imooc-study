require('./style/index.scss');

// 获取html
let htmlDom = document.getElementsByTagName('html')[0];
// 获取基准值
function getHtmlFontSize() {
  // 获取屏幕宽度(viewport)
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  // 设置html的fontSize
  htmlDom.style.fontSize = htmlWidth / 10 + 'px';
}

getHtmlFontSize();

window.addEventListener('resize', (e) => {
  getHtmlFontSize();
});

