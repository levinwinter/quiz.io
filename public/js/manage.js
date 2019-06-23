const socket = io({ query: { type: 'live' } });

$(document).ready(() => {
  $('#reset').click(() => {
    socket.emit('reset');
  });
  $('#input-timerDuration').change(() => {
    socket.emit('setTimerDuration', $('#input-timerDuration').val());
  });
  $('#sandbox').click(() => {
    socket.emit('sandbox');
  });
  $('#live-view').change(() => {
    socket.emit('live-view', $('#live-view').val()[0]);
  });
  $('#input-scoreSchacht').change(() => {
    socket.emit('score', 'schacht', $('#input-scoreSchacht').val());
  });
});
