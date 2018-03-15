/* eslint-disable */
import md5 from 'blueimp-md5'
function getNowTime() {
  return parseInt(new Date().getTime())
}
function getSign(time) {
  return md5('fungoa8sport' + time)
}

function isIOS() {
  var ua = navigator.userAgent || navigator.vendor || window.opera
  return /ip(hone|od|ad)/i.test(ua)
}

function isAndroid() {
  var ua = (navigator.userAgent || navigator.vendor || window.opera)
  return /android/i.test(ua)
}

function getPara(name) {
  if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.href)) {
    return decodeURIComponent(name[1])
  }
}

function isWeiXin() {
  return (/MicroMessenger/i).test(window.navigator.userAgent)
}

function isEmptyObj(obj) {
  let prop;
  for(prop in obj)
    return !1
  return !0
}

function loadScript(src, id, callback) {
  var confirmScrript = document.getElementById(id)
  if(confirmScrript) {
    callback()
    return
  }
  var body = document.body || document.getElementsByName('body')[0]
  var myscript = document.createElement('script')
  myscript.id = id
  myscript.src = src
  body.appendChild(myscript)
  myscript.onload = function () {
    callback()
  }
}

function cpost(v, cdata) {
  let nwtime = getNowTime()
  let sign = getSign(nwtime)
  let param = {
    time: nwtime,
    sign: sign
  }
  // let test = true
  let test = false;
  let positiveName = '//api.v.a8sport.com/cgi-bin/activity/cover/';
  let testName = '//test.zhibo.a8tiyu.com/cgi-bin/activity/cover/';
  // 正式服务器
  let HOST = (test ? testName : positiveName) + cdata.url
  for (let key in cdata.postData) {
    param[key] = cdata.postData[key]
  }
  v.$http.post(HOST, param)
    .then(response => {
    response = response.body
    cdata.callback(response);
}, response => {
    console.log('网络错误！')
  })
}
export {
  isIOS,
  isAndroid,
  getPara,
  isWeiXin,
  isEmptyObj,
  cpost,
  loadScript
}
