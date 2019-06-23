const express = require('express');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

let buzzed = false;

app.set('view engine', 'pug');

app.use('/public', express.static(`${__dirname}/public`));
app.get('/scripts/jquery.min.js', (req, res) => {
  res.sendFile(`${__dirname}/node_modules/jquery/dist/jquery.min.js`);
});
app.get('/scripts/easytimer.min.js', (req, res) => {
  res.sendFile(`${__dirname}/node_modules/easytimer/dist/easytimer.min.js`);
});

app.get('/', (req, res) => { res.render('index'); });
app.get('/user/:username', (req, res) => { res.render('user'); });
app.get('/live', (req, res) => { res.render('live'); });
app.get('/manage', (req, res) => { res.render('manage'); });
app.get('/sandbox', (req, res) => { res.render('sandbox'); });

io.on('connection', (socket) => {
  socket.on('user', (msg) => { io.emit('user', msg); });
  socket.on('buzz', (name) => {
    if (!buzzed) {
      buzzed = true;
      io.emit('buzz', name);
    }
  });
  socket.on('reset', () => {
    buzzed = false;
    io.emit('reset');
  });
  socket.on('sandbox', (msg) => { io.emit('sandbox', msg); });
  socket.on('live-view', (msg) => { io.emit('live-view', msg); });
  socket.on('score', (name, score) => { io.emit('score', name, score); });
});

http.listen('80');
