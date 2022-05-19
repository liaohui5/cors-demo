const ws = require("ws");
const port = 8889;

// ws://localhost:8889
const wss = new ws.WebSocketServer({ port });

const mockDatas = require("./mock.json");

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    console.log("Server onmessage:", data.toString());
    ws.send(JSON.stringify(mockDatas));
  });
  ws.send(JSON.stringify({ msg: "server connected!" }));
});

console.log("WebSocket Server started on ws://localhost:" + port);