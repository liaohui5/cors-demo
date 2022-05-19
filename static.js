const express = require("express");
const app = express();
const port = 9999;

app.use(express.static("./static"));

app.listen(port, () => console.log("server started on http://localhost:" + port));