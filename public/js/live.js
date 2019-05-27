const socket = io({ query: { type: 'live' } });

let locked = false;
let connectedUsers = new Map();
let lastBuzzed;

function generateUserHTML(id, name) {
  return `<div class="level-item has-text-centered is-marginless" id=${id}><p class="title is-1">${name}</p></div>`;
}

socket.on('buzzed', (id) => {
  console.log('buzzed');
  if (!locked) {
    locked = true;
    $(`#${id}`).addClass('has-background-success');
    lastBuzzed = id;
  }
});

socket.on('userUpdate', (msg) => {
  connectedUsers = new Map(msg);
  $('.level').empty();
  connectedUsers.forEach((value, key) => {
    $('.level').append(generateUserHTML(key, value));
  });
});

socket.on('reset', () => {
  locked = false;
  $(`#${lastBuzzed}`).removeClass('has-background-success');
});
