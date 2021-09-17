var express = require('express');
var router = express.Router();
const io = require("socket.io-client");
const socket = io("http://socketserver:3001", { transports: ['websocket'] });

socket.on("connect_error", console.error);
socket.on("connect", () => {
  console.log('connect', socket.id);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('hello world')
});

router.post('/', function (req, res) {
  if (!socket) {
    console.log('no socket');
    socket.connect();
    return;
  }

  console.log("socket.id", socket.id);
  
  if (req.body.catch) {
    console.log('req.body', req.body.catch);
    socket.emit("catch", req.body.catch);
    res.send('done');
  } else {
    res.send('POST missing proper object catch')
  }
});

module.exports = router;
