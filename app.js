const express = require('express');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = 80;

const connectedUsers = new Map();
const liveClients = [];

app.use('/public', express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.get('/user/:username', (req, res) => {
  res.sendFile(`${__dirname}/user.html`);
});

app.get('/live', (req, res) => {
  res.sendFile(`${__dirname}/live.html`);
});

app.get('/manage', (req, res) => {
  res.sendFile(`${__dirname}/manage.html`);
});

io.on('connection', (socket) => {
  socket.on('user', (msg) => {
    io.emit('user', msg);
  });

  socket.on('buzzed', (id) => {
    io.emit('buzzed', id);
  });

  socket.on('reset', () => {
    console.log('reset');
    io.emit('reset');
  });

  socket.on('disconnect', () => {
    connectedUsers.delete(socket.id);
    io.emit('userUpdate', Array.from(connectedUsers));
  });
});

io.use((socket, next) => {
  if (socket.handshake.query.type === 'live') {
    liveClients.push(socket);
    return next();
  }
  if (socket.handshake.query.type === 'user') {
    connectedUsers.set(socket.id, socket.handshake.query.name);
    connectedUsers.forEach((value, key) => {
      console.log(`${key} = ${value}`);
    });
    console.log('============');
    io.emit('userUpdate', Array.from(connectedUsers));
    return next();
  }
  return next();
});

http.listen(port, () => {
  console.log(`quiz.io is up and running at localhost: ${port}`);
});
