// 引入全局 css 方式操作
// import './popup.css'; 

// 引入模块化的 css 的 webpack 的操作方式
// let styles = require('./popup.css');

// ts 方式引入 css
import styles from './popup.css';

// 组件参数规范
interface Ipopup {
  width?: string;
  height?: string;
  title?: string;
  pos?: string;
  mask?: boolean;
  content?: (content: HTMLElement) => void
}

// 组件规范
interface Icomponent {
  tempContainer: HTMLElement;
  init: () => void;
  template: () => void;
  handle: () => void;
}

function popup(options: Ipopup) {
  return new Popup(options); 
}

class Popup implements Icomponent {
  tempContainer: any;
  mask: any;
  constructor(private settings: Ipopup) {
    // 设置默认值
    this.settings = Object.assign({
      width: '100%',
      height: '100%',
      title: '',
      pos: 'center',
      mask: true,
      content: function () {}
    }, this.settings);
    this.init();
  }
  // 初始化 
  init() {
    this.template();
    this.settings.mask && this.createMask();
    this.handle();
    this.contentCallback();
  }
  // 创建模板
  template() {
    this.tempContainer = document.createElement('div');
    this.tempContainer.style.width = this.settings.width;
    this.tempContainer.style.height = this.settings.height;
    this.tempContainer.className = styles.popup;
    this.tempContainer.innerHTML = `
      <div class="${styles['popup-title']}">
        <h3>${this.settings.title}</h3>
        <i class="iconfont icon-iconfontguanbi"></i>
      </div>
      <div class="${styles['popup-content']}"></div>
    `;
    document.body.appendChild(this.tempContainer);
    // 位置
    this.tempContainer.style.top = (window.innerHeight - this.tempContainer.offsetHeight) / 2 + 'px';

    if(this.settings.pos === 'left') {
      // 居左
      this.tempContainer.style.left = 0;
    } else if (this.settings.pos === 'right') {
      // 居右
      this.tempContainer.style.right = 0;
    } else {
      // 居中
      this.tempContainer.style.left = (window.innerWidth - this.tempContainer.offsetWidth) / 2 + 'px';
    }
  }

  // 创建遮罩
  createMask() {
    this.mask = document.createElement('div');
    this.mask.className = styles.mask;
    this.mask.style.width = '100%';
    this.mask.style.height = document.body.offsetHeight + 'px';
    document.body.appendChild(this.mask);
  }

  // 事件操作
  handle() {
    let popupClose = this.tempContainer.querySelector(`.${styles['popup-title']} i`);
    popupClose.addEventListener('click', () => {
      document.body.removeChild(this.tempContainer);
      this.settings.mask && document.body.removeChild(this.mask);
    });
  }
  // 容器的回调
  contentCallback() {
    let popupContent = this.tempContainer.querySelector(`.${styles['popup-content']}`);
    this.settings.content && this.settings.content(popupContent);
  }
}

export default popup;