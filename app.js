"use strict";
const express = require("express");
const proxy = require("express-http-proxy");

const app = express();
const port = 8888;
const mockDatas = require("./mock.json");

app.use(express.static("./static"));

app.get("/", (req, res) => {
  res.send(
    "建议运行 npm run static, 然后用 http://localhost:9999 来访问 http://localhost:8888 来查看跨域效果"
  );
});

// >>>>> jsonp 跨域
app.get("/jsonp", (req, res) => {
  const { callback = "jsonpCallback" } = req.query;
  const response = JSON.stringify(mockDatas);
  res.send(`function ${callback} () {return ${response}}`); // jsonpCallback() { return response; }
});

// >>>>> proxy 跨域(webpack 的 devServer 用的就是这种方式来实现跨越的)
app.use("/proxy", proxy("http://musicapi.liaohui5.cn:8080"));

// >>>>> cors 跨域(因为会发送预检请求, 所以必须用use才能匹配到)
app.use("/cors", (_req, res) => {
  // 允许的地址, 如果 * 就不支持 cookie
  res.setHeader("Access-Control-Allow-Origin", "*");

  // 允许的请求方式
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS,GET,POST,PUT,DELETE,PATCH"
  );

  // 允许携带cookie
  res.setHeader("Access-Control-Allow-Crendentials", "true");

  // 允许的请求头 自定义的请求头:(Access-Token,Refresh-Token,Client-Signature)
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization,Access-Token,Refresh-Token,Client-Signature"
  );

  // 暴露头信息(默认浏览器是无法获取这些自定义响应头的)
  res.setHeader("Access-Control-Expose-Headers", "*");

  res.send(mockDatas);
});

app.listen(port, () => console.log("server started on port " + port));
