const name = window.location.pathname.split('/')[2];

const socket = io({ query: { type: 'user', name } });

function buzz() {
  console.log('buzzed');
  socket.emit('buzzed', socket.id);
}

$('.hero-body').click(() => {
  buzz();
});
