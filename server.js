const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static("./build"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

app.listen(PORT, function () {
  console.log(`Сервер запущен на порте ${PORT}!`);
});
