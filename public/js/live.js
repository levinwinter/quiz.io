const gray = 'rgb(238, 238, 238)';
const red = 'rgb(255, 0, 0)';

// eslint-disable-next-line no-undef
const socket = io({ query: { type: 'sandbox' } });

function setScore(player, score) {
  $('#overlay').contents().find(`#point7.${player}`).hide();
  $('#overlay').contents().find(`#point6.${player}`).hide();
  $('#overlay').contents().find(`#point5.${player}`).hide();
  $('#overlay').contents().find(`#point4.${player}`).hide();
  $('#overlay').contents().find(`#point3.${player}`).hide();
  $('#overlay').contents().find(`#point2.${player}`).hide();
  $('#overlay').contents().find(`#point1.${player}`).hide();
  switch (score) {
    case 7:
      $('#overlay').contents().find(`#point7.${player}`).show();
      // falls through
    case 6:
      $('#overlay').contents().find(`#point6.${player}`).show();
      // falls through
    case 5:
      $('#overlay').contents().find(`#point5.${player}`).show();
      // falls through
    case 4:
      $('#overlay').contents().find(`#point4.${player}`).show();
      // falls through
    case 3:
      $('#overlay').contents().find(`#point3.${player}`).show();
      // falls through
    case 2:
      $('#overlay').contents().find(`#point2.${player}`).show();
      // falls through
    case 1:
      $('#overlay').contents().find(`#point1.${player}`).show();
      // no default
  }
}

function setTimer(player, time) {
  $('#overlay').contents().find(`#time5.${player}`).css('fill', gray);
  $('#overlay').contents().find(`#time4.${player}`).css('fill', gray);
  $('#overlay').contents().find(`#time3.${player}`).css('fill', gray);
  $('#overlay').contents().find(`#time2.${player}`).css('fill', gray);
  $('#overlay').contents().find(`#time1.${player}`).css('fill', gray);
  switch (time) {
    case 5:
      $('#overlay').contents().find(`#time5.${player}`).css('fill', red);
      $('#overlay').contents().find(`#time4.${player}`).css('fill', red);
      $('#overlay').contents().find(`#time3.${player}`).css('fill', red);
      $('#overlay').contents().find(`#time2.${player}`).css('fill', red);
      $('#overlay').contents().find(`#time1.${player}`).css('fill', red);
      break;
    case 4:
      $('#overlay').contents().find(`#time4.${player}`).hide();
      // falls through
    case 3:
      $('#overlay').contents().find(`#time3.${player}`).hide();
      // falls through
    case 2:
      $('#overlay').contents().find(`#time2.${player}`).hide();
      // falls through
    case 1:
      $('#overlay').contents().find(`#time1.${player}`).hide();
      // no default
  }
}

socket.on('score', (msg) => {
  setScore(msg.name, msg.score);
});

socket.on('live-view', (view) => {
  console.log(view);
  $('#overlay').hide();
  $('#status').hide();
  switch (view) {
    case 'overlay':
      $('#overlay').show();
      break;
    case 'status':
      $('#status').show();
      break;
      // no default
  }
});

$(document).ready(() => {
  setTimer('Schacht', 5);
  setScore('Schacht', 3);
  setTimer('Lehrer', 3);
  setScore('Lehrer', 6);
});
