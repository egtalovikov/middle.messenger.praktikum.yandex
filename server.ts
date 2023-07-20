const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('./build'));

app.get('/*', (res: { sendFile: (arg0: unknown) => void; }) => {
  res.sendFile(path.join(__dirname, './build/index.html'));
});

app.listen(PORT);
