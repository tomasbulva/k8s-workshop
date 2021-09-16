var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var server = require("http").Server(app);
var io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log("a client connected", socket.id);
  socket.on("catch", (data) => {
    console.log('data', data);
    socket.broadcast.emit("updated-catch", `O=> ${data}`);
  });
});

// app.use(function (req, res, next) {
//   res.io = io;
//   next();
// });



module.exports = { app: app, server: server };
