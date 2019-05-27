const socket = io({ query: { type: 'live' } });

function reset() {
  socket.emit('reset');
}
