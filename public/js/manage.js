const socket = io({ query: { type: 'live' } });

function reset() {
  socket.emit('reset');
}

$(document).ready(() => {
  $('#reset').click(() => {
    reset();
  });
  $('#input-timerDuration').change(() => {
    socket.emit('setTimerDuration', $('#input-timerDuration').val());
  });
  $('#sandbox').click(() => {
    socket.emit('score', { name: 'Lehrer', score: 3 });
  });
  $('#live-view').change(() => {
    socket.emit('live-view', $('#live-view').val()[0]);
  });
});
