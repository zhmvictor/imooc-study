let styles = require('./video.css');

interface Ivideo {
  url: string;
  elem: string | HTMLElement;
  width?: string;
  height?: string;
  autoplay?: boolean
}

// 组件规范
interface Icomponent {
  tempContainer: HTMLElement;
  init: () => void;
  template: () => void;
  handle: () => void;
}

function video(options: Ivideo) {
  return new Video(options);
}

class Video implements Icomponent {
  tempContainer: any;
  constructor(private settings: Ivideo) {
    this.settings = Object.assign({
      width: '100%',
      height: '100%',
      autoplay: false,
    }, this.settings);
    this.init();
  }

  // 初始化 
  init() {
    this.template();
    this.handle();
  }
  // 创建模板
  template() {
    this.tempContainer = document.createElement('div');
    this.tempContainer.className = styles.default.video;
    this.tempContainer.style.width = styles.default.width;
    this.tempContainer.style.height = styles.default.height;
    this.tempContainer.innerHTML = `
      <video class="${styles.default['video-content']}" src="${this.settings.url}"></video>
      <div class="${styles.default['video-controls']}">
        <div class="${styles.default['video-progress']}">
          <div class="${styles.default['video-progress-now']}"></div>
          <div class="${styles.default['video-progress-success']}"></div>
          <div class="${styles.default['video-progress-bar']}"></div>
        </div>
        <div class="${styles.default['video-play']}">
          <i class="iconfont icon-bofang"></i>
        </div>
        <div class="${styles.default['video-time']}">
          <span>00:00</span> / <span>00:00</span>
        </div>
        <div class="${styles.default['video-full']}">
          <i class="iconfont icon-fullscreen-expand"></i>
        </div>
        <div class="${styles.default['video-volume']}">
          <i class="iconfont icon-duomeitiicon-"></i>
          <div class="${styles.default['video-volprogress']}">
            <div class="${styles.default['video-volprogress-now']}"></div>
            <div class="${styles.default['video-volprogress-bar']}"></div>
          </div>
        </div>
      </div>
    `;
    if(typeof this.settings.elem === 'object') {
      this.settings.elem.appendChild(this.tempContainer);
    } else {
      let dom = document.querySelector(`${this.settings.elem}`);
      dom && dom.appendChild(this.tempContainer);
    }
  }

  // 事件操作
  handle() {
    let videoContent: HTMLVideoElement = this.tempContainer.querySelector(`.${styles.default['video-content']}`);
    let videoControls = this.tempContainer.querySelector(`.${styles.default['video-controls']}`);
    let videoPlay = this.tempContainer.querySelector(`.${styles.default['video-play']} i`);
    let videoTimes = this.tempContainer.querySelectorAll(`.${styles.default['video-time']} span`);
    let videoFull = this.tempContainer.querySelector(`.${styles.default['video-full']} i`);
    let videoProgress = this.tempContainer.querySelectorAll(`.${styles.default['video-progress']} div`);
    let videoVolume = this.tempContainer.querySelectorAll(`.${styles.default['video-volprogress']} div`);
    let timer;
    // 设置播放控件的显示隐藏
    this.tempContainer.addEventListener('mouseenter', function() {
      videoControls.style.bottom = 0;
    });
    this.tempContainer.addEventListener('mouseleave', function() {
      videoControls.style.bottom = '-50px';
    });
    // 视频音量
    videoContent.volume = 0.5;
    // 视频自动播放
    if (this.settings.autoplay) {
      videoContent.autoplay = this.settings.autoplay;
    }
    // 视频是否加载完毕
    videoContent.addEventListener('canplay', () => {
      // duration 以秒为单位
      videoTimes[1].innerHTML = formatTime(videoContent.duration);
    });
    // 播放
    videoContent.addEventListener('play', () => {
      videoPlay.className = 'iconfont icon-ai07';
      timer = setInterval(playing, 1000);
    });
    // 暂停
    videoContent.addEventListener('pause', () => {
      videoPlay.className = 'iconfont icon-bofang';
      clearInterval(timer);
    });
    // 播放暂停
    videoPlay.addEventListener('click', () => {
      if(videoContent.paused) {
        videoContent.play();
      } else {
        videoContent.pause();
      }
    });
    // 全屏
    videoFull.addEventListener('click', () => {
      videoContent.requestFullscreen();
    });
    // 播放拖拽
    videoProgress[2].addEventListener('mousedown', function (evt: MouseEvent) {
      let downX = evt.pageX;
      let downL = this.offsetLeft;
      document.onmousemove = (e: MouseEvent) => {
        let scale = (e.pageX - downX + downL + 8) / this.parentNode.offsetWidth;
        if(scale < 0) {
          scale = 0;
        }
        if(scale > 1) {
          scale = 1;
        }
        videoProgress[0].style.width = scale * 100 + '%';
        videoProgress[1].style.width = scale * 100 + '%';
        this.style.left = scale * 100 + '%';
        // 更改播放时间内容才实际生效
        videoContent.currentTime = scale * videoContent.duration;
      }
      document.onmouseup = () => {
        document.onmousemove = document.onmouseup = null;
      }
      evt.preventDefault();
    });
    // 音量控制
    videoVolume[1].addEventListener('mousedown', function (evt: MouseEvent) {
      let downX = evt.pageX;
      let downL = this.offsetLeft;
      document.onmousemove = (e: MouseEvent) => {
        let scale = (e.pageX - downX + downL + 8) / this.parentNode.offsetWidth;
        if (scale < 0) {
          scale = 0;
        }
        if (scale > 1) {
          scale = 1;
        }
        videoVolume[0].style.width = scale * 100 + '%';
        this.style.left = scale * 100 + '%';
        // 更改音量
        videoContent.volume = scale;
      }
      document.onmouseup = () => {
        document.onmousemove = document.onmouseup = null;
      }
      evt.preventDefault();
    });

    // 正在播放中
    function playing() {
      // 视频播放进度
      let scale = videoContent.currentTime / videoContent.duration;
      // 视频缓冲进度
      let scaleSuc = videoContent.buffered.end(0) / videoContent.duration;
      videoTimes[0].innerHTML = formatTime(videoContent.currentTime);
      videoProgress[0].style.width = scale * 100 + '%';
      videoProgress[1].style.width = scaleSuc * 100 + '%';
      videoProgress[2].style.left = scale * 100 + '%';
    }

    function formatTime(number: number): string {
      let hour = Math.floor(number / 3600);
      let min = Math.floor((number - hour * 3600) / 60);
      let sec = Math.floor(number % 60);
      if(hour) {
        return setZero(hour) + ':' + setZero(min) + ':' + setZero(sec);
      }
      return setZero(min) + ':' + setZero(sec);
    }

    function setZero(number: number): string {
      if(number < 10) {
        return '0' + number;
      }
      return number + '';
    }
  }
}

export default video;