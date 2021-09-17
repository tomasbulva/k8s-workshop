var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var apiRouter = require('./routes/index');

var app = express();

// app.use(function(req, res, next){
//   res.socket = socket;
//   next();
// });

// socket.on("connect", () => {
//   console.log(socket.id); // x8WIv7-mJelg7on_ALbx
//   socket.on("catch", (data) => {
//     console.log("catch: ", data);
//   });
// });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/api', apiRouter);

app.use((req, res) => {
  res.status(404).json({
    errorMessage: "Route not found or missing resource.....",
  });
});

module.exports = app;
