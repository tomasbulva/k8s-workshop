var express = require('express');
var router = express.Router();
const io = require("socket.io-client");
const socket = io("http://localhost:3001");
socket.connect();

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

  console.log("socket.id", socket);
  
  if (req.body.catch) {
    console.log('req.body', req.body.catch);
    socket.emit("catch", req.body.catch);
    res.send('done');
  } else {
    res.send('POST missing proper object catch')
  }
});

module.exports = router;
