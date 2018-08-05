const express = require('express');
const app = express();

app.use(express.static('client'));

app.listen(3000, () => console.log('People\'s choice server listening on port 3000!'));