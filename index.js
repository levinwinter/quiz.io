const express = require('express');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = 80;

const clients = {};

app.use('/public', express.static(`${__dirname}/public`));

function index(req, res) {
  res.sendFile(`${__dirname}/index.html`);
}

app.get('/', index);

app.get('/user/:username', (req, res) => {
  res.sendFile(`${__dirname}/user.html`);
});

app.get('/live', (req, res) => {
  res.sendFile(`${__dirname}/live.html`);
});

io.on('connection', (socket) => {
  clients[socket.id] = '';
  io.emit('clients', clients);

  socket.on('user', (msg) => {
    io.emit('user', msg);
  });

  socket.on('buzzed', (name) => {
    io.emit('buzzed', name);
  });
});

io.use((socket, next) => {
  console.log('Query: ', socket.handshake.query);
  if (socket.handshake.query.type === 'live') {
    console.log('live');
    return next();
  }
  if (socket.handshake.query.type === 'user') {
    console.log('user');
    return next();
  }
  next(new Error('Authentication error'));
});

http.listen(port, () => {
  console.log(`quiz.io is up and running at localhost: ${port}`);
});
