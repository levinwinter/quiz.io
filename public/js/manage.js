const socket = io({ query: { type: 'live' } });

$(document).ready(() => {
  $('.schacht').click((event) => {
    socket.emit('winner', Number($(event.target).closest('.field').attr('id')), 'Schacht');
  });
  $('.x').click((event) => {
    socket.emit('winner', Number($(event.target).closest('.field').attr('id')), '');
  });
  $('.lehrer').click((event) => {
    socket.emit('winner', Number($(event.target).closest('.field').attr('id')), 'Lehrer');
  });
  $('#reset').click(() => {
    socket.emit('reset');
  });
  $('#input-timerDuration').change(() => {
    socket.emit('setTimerDuration', $('#input-timerDuration').val());
  });
  $('#sandbox').click(() => {
    socket.emit('sandbox', 2, 'Schacht');
  });
  $('#live-view').change(() => {
    socket.emit('live-view', $('#live-view').val()[0]);
  });
  $('#input-scoreSchacht').change(() => {
    socket.emit('score', 'schacht', $('#input-scoreSchacht').val());
  });
});
