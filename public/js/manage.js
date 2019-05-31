const socket = io({ query: { type: 'live' } });

function reset() {
  socket.emit('reset');
}

$(document).ready(() => {
  $('#reset').click(() => {
    reset();
  });
});
