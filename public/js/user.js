const name = window.location.pathname.split('/')[2];

const socket = io({ query: { type: 'user', name } });

function buzz() {
  socket.emit('buzz', name.toLowerCase());
}

$(document).ready(() => {
  $('#name').text(name);
  $('.hero').click(() => {
    buzz();
  });
});
