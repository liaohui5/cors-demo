## 说明

各种跨域方式学习+测试代码

## 安装

```sh
git clone https://gitee.com/liaohui5/cors-demo
cd cors-demo
npm i
```

## 启动

```sh
# localhost:8888
npm run start

# localhost:9999
npm run static

# websocket, 如果不用测试这个可以不启动它
npm run wss
```

## 查看效果

> http://localhost:9999 -> http://localhost:8888

浏览器打开 http://localhost:9999

## 其他说明

一些无法用代码来演示效果的, 请查看对应的文件笔记, 比如 nginx 反向代理就在 `nginx.conf` 中
