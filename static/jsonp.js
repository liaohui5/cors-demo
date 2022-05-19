/**
 * jsonp 跨域
 * @param {String} url 请求地址
 * @param {Function} success 请求成功后自动执行的回调函数
 */
function jsonp(url, success) {
  var randStr = Date.now() + Math.random().toString(16).slice(2);
  var callback = "jsonpCallback" + randStr;
  var url = String(url);
  if (url.indexOf("?") === -1) {
    url += "?_r=" + randStr;
  } else {
    url += "&_r=" + randStr;
  }

  // http://xxx.com/path?_r=12314sdfa&callback=jsonpCallback12314sdfa
  url += "&callback=" + callback;

  // use script tag send request
  var script = document.createElement("script");
  script.src = url;
  document.body.append(script);

  script.onload = function () {
    var callbackFunc = window[callback];
    typeof success === "function" &&
      typeof callbackFunc === "function" &&
      success(callbackFunc());
    script.remove();
  };
}
