const socket = io({ query: { type: 'live' } });

let locked = false;
let connectedUsers = new Map();
let lastBuzzed;

socket.emit('getUsers');

function generateUserHTML(id, name) {
  return `<div class="level-item has-text-centered is-marginless" id=${id}><p class="title is-1">${name}</p></div>`;
}

function updateUsers(userArray) {
  connectedUsers = new Map(userArray);
  $('.level').empty();
  connectedUsers.forEach((value, key) => {
    $('.level').append(generateUserHTML(key, value));
  });
}

socket.on('buzzed', (id) => {
  if (!locked) {
    locked = true;
    $(`#${id}`).addClass('has-background-success');
    lastBuzzed = id;
  }
});

socket.on('getUsers', (userArray) => { updateUsers(userArray); });

socket.on('userUpdate', (userArray) => { updateUsers(userArray); });

socket.on('reset', () => {
  locked = false;
  $(`#${lastBuzzed}`).removeClass('has-background-success');
});
