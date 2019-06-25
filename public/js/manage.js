const socket = io({ query: { type: 'live' } });

$(document).ready(() => {
  $('.schacht').click((event) => {
    socket.emit('winner', Number($(event.target).closest('section').attr('id')), 'Schacht');
  });
  $('.x').click((event) => {
    socket.emit('winner', Number($(event.target).closest('section').attr('id')), '');
  });
  $('.lehrer').click((event) => {
    socket.emit('winner', Number($(event.target).closest('section').attr('id')), 'Lehrer');
  });
  $('#reset').click(() => {
    socket.emit('reset');
  });
  $('#input-timerDuration').change(() => {
    socket.emit('setTimerDuration', $('#input-timerDuration').val());
  });
  $('#overlay').click(() => {
    socket.emit('live-view', 'overlay');
  });
  $('#score').click(() => {
    socket.emit('live-view', 'score');
  });
  $('#score4').click(() => {
    socket.emit('live-view', 'score4');
  });
  $('#score5').click(() => {
    socket.emit('live-view', 'score5');
  });
  $('#hideAll').click(() => {
    socket.emit('live-view', 'none');
  });
  $('.showTimer').click(() => {
    socket.emit('live-view', 'showTimer');
  });
  $('.hideTimer').click(() => {
    socket.emit('live-view', 'hideTimer');
  });
  $('.resetTimer90s').click(() => {
    socket.emit('timerDuration', 90);
    socket.emit('timerControl', 'reset');
  });
  $('.startTimer').click(() => {
    socket.emit('timerControl', 'start');
  });
  $('#status').click(() => {
    socket.emit('live-view', 'status');
  });
  $('.punkteSchacht').change((event) => {
    console.log(event);
    socket.emit('score', 'schacht', event.target.value);
  });
  $('.punkteLehrer').change((event) => {
    socket.emit('score', 'lehrer', event.target.value);
  });
});
