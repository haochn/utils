# javascript常用代码库
+ 生成随机的字符串（包含数字，大小写字母）
``` javascript
const randomString = (len = 16) => {
    let result = '',
        str = 'abcefghijklmnopqrstuvwxyzABCEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < len; i++) {
        result += str.charAt(Math.floor(Math.random() * 60));
    }
    return result;
}
//randomString() ==>F8IrZ2joV4otC6zN(这只是个实例)
```
+ 获取当前的时间（类型1:2017-12-26，类型2:2017-12-26 18:00:00）
``` javascript 
const getNowTime = (type = 1) => {
    let date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth(),
        day = date.getDate(),
        time = '';
    month = month > 9 ? month : '0' + month;
    day = day > 9 ? day : '0' + day;
    if (type === 2) {
        let hours = date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds();
        hours = hours > 9 ? hours : '0' + hours;
        minutes = minutes > 9 ? minutes : '0' + minutes;
        seconds = seconds > 9 ? seconds : '0' + seconds;
        time = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    } else {
        time = year + '-' + month + '-' + day;
    }
    return time;
}
//getNowTime()=getNowTime(1)==>2017-12-26
//getNowTime(2)==>2017-12-26 18:00:00
```
+ 获取月份的总天数(默认30天)
``` javascript
const getDays = (year = 2017, month = 11) => {
    month = month > 12 ? 12 : month; //年份大于12
    month = month < 1 ? 1 : month; //年份小于1
    return new Date(year, month, 0).getDate();
}
//getDays()==>30
```
+ 对数组进行排序（类型1：增序，类型2:降序）
``` javascript
const sortArr = (arr = [], type = 1) => {
    let resultArr = [].concat(arr);//新的数组
    resultArr.sort(function(a, b) {
        if (type === 2) {
            return b - a;
        } else {
            return a - b;
        }
    });
    return resultArr;
}
//sortArr([1, 9, 2, 3, 2])==>[1, 2, 2, 3, 9] 增序
//sortArr([1, 9, 2, 3, 2]，2)==> [9, 3, 2, 2, 1] 降序
```
+ 数组去重
``` javascript
//方法一
const filterArr=(arr = [])=> {
    let result = [];
    result = arr.filter(function(item, index, self) {
        return index === self.indexOf(item);
    });
    return result;
}
//filterArr([2, 9, 6, 2, 5, 2])==>[2, 9, 6, 5]
```
``` javascript
//方法二
const filterArrSet = (arr = []) => {
    let result = [];
    result = Array.from(new Set(arr));
    return result;
}
//filterArrSet([2, 9, 6, 2, 5, 2])==>[2, 9, 6, 5]
```

+ 视频控件
    配置：options(默认)

    min: 滑块控件的 min 属性值(0),

    max: 回滑块控件的 max 属性值(1),

    step: 合法数字间隔(0.1),

    dom: 视频控制放置的位置,

    src: 视频地址,

    imgs: 自定义视频控制区图片
    
   
    使用：
    var videoCtrl=new VideoCtrl();
    1. 初始化dom组件
        videoCtrl.init()
    2. 播放/暂停
        videoCtrl.play()
    3. 播放进度控制/音量控制
        document.querySelector('input).rangeCtrl()



``` javascript
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
```
