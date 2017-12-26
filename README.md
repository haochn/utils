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

