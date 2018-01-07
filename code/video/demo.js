function VideoCtrl(options) {
    this.videoComponent = function(dom, src, imgs) {
        //生成dom结构
        const _html = `<div class="vedioWrap rl">
        <video src="` + src + `"id="video""></video>
        <div class="playStart ab"><img src="` + imgs.playbig + `"></div>
        <div class="controlsWrap ab">
            <div class="controlsWrapContent">
                <div class="iconItems">
                    <img src="` + imgs.back + `" data-type="back">
                    <img src="` + imgs.playSmall + `" data-type="play">
                    <img src="` + imgs.next + `" data-type="next">
                </div>
                <div class="rangeItem">
                    <input type="range" name="loading" class="loadingControl" id="loading_switch" value='0'>
                </div>
                <div class="playTime">
                    <span class="currentTime">00:00</span>/<span class="totalTime">00:00</span>
                </div>
                <div class="iconItems">
                    <img src="` + imgs.volumn + `" data-type="volumn">
                    <input type="range" name="sound" id="volumn" class="soundControl" id="sound_switch">
                    <img src="` + imgs.setting + `" data-type="setting">
                    <img src="` + imgs.fullscreen + `" data-type="fullscreen">
                </div>
            </div>
        </div>
    </div>`;
        const cssStyle = `
* {
    padding: 0;
    margin: 0;
}

.rl {
    position: relative;
}

.ab {
    position: absolute;
}
.vedioWrap {
    width: 100%;
    min-height: 400px;
}

.controlsWrapContent {
    width: 100%;

    display: flex;
    align-items: center;
}

#video {
    width: 100%;
    /* height: 100%;*/
    /*bottom: 0;*/
    margin: auto;
    cursor: pointer;
}

.playStart {
    width: 50px;
    height: 50px;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    cursor: pointer;
}

.playStart>img {
    width: 100%;
    display: block;
}

.soundControl {}

.controlsWrap {
    width: 100%;
    padding: 5px;
    background-color: #ff00b3;
    bottom: 0;
    cursor: pointer;
}

.controlsWrap>div {
    float: left;
}

.iconItems {
    display: flex;
    float: left;
    padding: 0 5px;
}

.iconItems>img {
    padding: 0 3px;
}


.playTime {
   
    padding: 0 20px 0 20px;
}

.loadingControl {
    margin-left: 30px;
}

/*range效果*/

input {
    outline: none;
}

input[type=range]:focus {
    outline: none;
}

.rangeItem>input[type=range] {
    -webkit-appearance: none;
    width: 300px;
    display: inline-block;
    border-radius: 10px;
    /*这个属性设置使填充进度条时的图形为圆角*/
    margin-top: 8px;
    vertical-align: top;
}

.iconItems>input[type=range] {
    -webkit-appearance: none;
    width: 86px;
    height: 5px;
    display: inline-block;
    border-radius: 10px;
    /*这个属性设置使填充进度条时的图形为圆角*/
    margin: 8px 5px 0 5px;
    vertical-align: top;
}

input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
}

input[type=range]::-webkit-slider-runnable-track {
    height: 5px;
    /*background-color: #f00;*/
}

input[type=range]:nth-of-type(2)::-webkit-slider-runnable-track {
    /* background-color: #000;*/
}

input[type=range]:focus {
    outline: none;
}

input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 15px;
    width: 15px;
    margin-top: -5px;
    /*使滑块超出轨道部分的偏移量相等*/
    background: #ffffff;
    border-radius: 50%;
    /*外观设置为圆形*/
    border: solid 0.125em rgba(205, 224, 230, 0.5);
    /*设置边框*/
    box-shadow: 0 .125em .125em #3b4547;
    /*添加底部阴影*/
    ;
}
        `
        dom.innerHTML = _html;
        const cssStyleDom = document.createElement('style');
        cssStyleDom.innerHTML = cssStyle;
        const head = document.querySelector('head');
        head.appendChild(cssStyleDom);

    }
    this.changeHandle = function(inputDom, _this) {

        if (inputDom.id === 'volumn') {
            //控制音量
            _this.videoDom.volume = inputDom.value;

            //缓存音量
            _this.tempSound = _this.videoDom.volume;

        } else {
            //控制播放进度
            const val = inputDom.value * _this.videoTotalTime;

            if (!isNaN(_this.videoTotalTime)) {
                _this.videoDom.currentTime = val;
            }

        }

    }

    this.formatVideoTime = function(t) {
        const _t = Math.ceil(t);
        let _minutes = parseInt(_t / 60, 10),
            _seconds = _t % 60;
        _minutes = _minutes > 9 ? _minutes : '0' + _minutes;
        _seconds = _seconds > 9 ? _seconds : '0' + _seconds;
        return _minutes + ':' + _seconds;
    }
    this.options = (function(options) {

        let _options = options || {},
            min = _options.min || 0,
            max = _options.max || 1,
            step = _options.step || 0.1,
            dom = _options.dom || document.body,
            src = _options.src || "http://osupg2zn7.bkt.clouddn.com/github/video/1.mp4",
            imgs = _options.imgs || {
                back: 'http://osupg2zn7.bkt.clouddn.com/github/video/back.png',
                playSmall: 'http://osupg2zn7.bkt.clouddn.com/github/video/play.png',
                playbig: 'http://osupg2zn7.bkt.clouddn.com/github/video/playbig.png',
                next: 'http://osupg2zn7.bkt.clouddn.com/github/video/next.png',
                volumn: 'http://osupg2zn7.bkt.clouddn.com/github/video/volumn.png',
                setting: 'http://osupg2zn7.bkt.clouddn.com/github/video/set-btn.png',
                fullscreen: 'http://osupg2zn7.bkt.clouddn.com/github/video/fullscreen.png'
            },
            callback = _options.callback || 'changeHandle';

        return {
            min,
            max,
            step,
            dom,
            src,
            imgs,
            callback
        }
    })(options);

    this.flag = true;
    this.flagS = false;
    this.tempSound = 1;
}

//初始化
VideoCtrl.prototype.init = function() {
    //缓存this
    var _this = this;
    //初始化dom组件
    _this.videoComponent(_this.options.dom, _this.options.src, _this.options.imgs);

    _this.videoDom = document.querySelector('#video');
    _this.playControl = document.querySelector('.playStart');
    _this.videoIcon = _this.playControl.querySelector('img');
    _this.currentTimeDom = document.querySelector('.currentTime');
    _this.totalTimeDom = document.querySelector('.totalTime');
    _this.videoTotalTime = _this.videoDom.duration;
    _this.videoCurrentTime = 0;
    console.log(_this)
    //当元数据（比如分辨率和时长）被加载时运行的脚本。
    _this.videoDom.onloadedmetadata = function() {

        //设置播放总时间,初始播放时间
        _this.videoTotalTime = this.duration;
        console.log(_this.totalTimeDom)
        _this.totalTimeDom.innerText = _this.formatVideoTime(_this.videoTotalTime);

        _this.videoCurrentTime = this.currentTime;
        _this.currentTimeDom.innerText = _this.formatVideoTime(_this.videoCurrentTime);
    }
}
//播放
VideoCtrl.prototype.play = function() {
    if (this.flag) {
        this.videoDom.play();
        this.videoIcon.style.display = 'none';
        this.flag = false;
    } else {
        this.videoDom.pause();
        this.videoIcon.style.display = 'block';
        this.flag = true;
    }
}
// 暂停
VideoCtrl.prototype.pause = function() {

}

//滑块控制
VideoCtrl.prototype.rangeCtrl = function(inputDom) {
    //处理滑块
    const _this = this,
        _options = _this.options,
        _inputDom = inputDom || _this.inputDom,
        _videoDom = _this.videoDom,
        _min = _options.min,
        _max = _options.max,
        _step = _options.step,
        _callback = _this[_options.callback];

    _inputDom.setAttribute('min', _min);
    _inputDom.setAttribute('max', _max);
    _inputDom.setAttribute('step', _step);

    _inputDom.addEventListener('input', function(e) {

        _inputDom.setAttribute('value', _inputDom.value);
        _inputDom.style.background = 'linear-gradient(to right, #784607 ' + this.value * 100 + '%, white ' + ((1 - this.value) * 100) + '%)';
        if (typeof(_callback) === 'function') {
            _callback(_inputDom, _this)
        }
    })

}
//静音控制
VideoCtrl.prototype.mute = function() {
    if (!this.flagS) {
        this.videoDom.volume = 0;
        this.flagS = true;
    } else {
        this.videoDom.volume = this.tempSound;
        this.flagS = false;
    }
}