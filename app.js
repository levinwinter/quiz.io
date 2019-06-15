const express = require('express');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const connectedUsers = new Map();
let timerDurtaion = 5;

app.set('view engine', 'pug');

app.use('/public', express.static(`${__dirname}/public`));

app.get('/', (req, res) => { res.render('index'); });
app.get('/user/:username', (req, res) => { res.render('user'); });
app.get('/live', (req, res) => { res.render('live'); });
app.get('/manage', (req, res) => { res.render('manage'); });
app.get('/sandbox', (req, res) => { res.render('sandbox'); });

io.use((socket, next) => {
  if (socket.handshake.query.type === 'user') {
    connectedUsers.set(socket.id, socket.handshake.query.name);
    io.emit('userUpdate', Array.from(connectedUsers));
  }
  return next();
});

io.on('connection', (socket) => {
  socket.on('user', (msg) => { io.emit('user', msg); });
  socket.on('buzzed', (id) => { io.emit('buzzed', id); });
  socket.on('reset', () => { io.emit('reset'); });
  socket.on('score', (msg) => { io.emit('score', msg); });
  socket.on('live-view', (msg) => { io.emit('live-view', msg); });

  socket.on('setTimerDuration', (duration) => { timerDurtaion = duration; });

  socket.on('getUsers', () => { io.emit('getUsers', Array.from(connectedUsers)); });

  socket.on('disconnect', () => {
    connectedUsers.delete(socket.id);
    io.emit('userUpdate', Array.from(connectedUsers));
  });
});

http.listen('80');
