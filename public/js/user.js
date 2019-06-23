const name = window.location.pathname.split('/')[2];

// eslint-disable-next-line no-undef
const socket = io({ query: { type: 'user', name } });
// eslint-disable-next-line no-undef
const timer = new Timer();

function buzz() {
  socket.emit('buzz', name.toLowerCase());
}

socket.on('buzz', (nameBuzzed) => {
  const $hero = $('.hero');
  const $subtitle = $('.subtitle');
  if (nameBuzzed.localeCompare(name.toLowerCase()) === 0) {
    // noinspection JSCheckFunctionSignatures
    timer.start({ countdown: true, startValues: { seconds: 5 } });
    $hero.removeClass('is-primary');
    $hero.addClass('is-warning');
    $subtitle.text('answer now - 5 seconds left');
    timer.addEventListener(['secondsUpdated'], () => {
      $subtitle.text(`answer now - ${timer.getTimeValues().seconds} seconds left`);
    });
    timer.addEventListener(['targetAchieved'], () => {
      $hero.removeClass('is-warning');
      $hero.addClass('is-danger');
      $subtitle.text('you ran out of time');
    });
  } else {
    $hero.removeClass('is-primary');
    $hero.addClass('is-light');
    $subtitle.text(`${nameBuzzed.charAt(0).toUpperCase() + nameBuzzed.slice(1)} buzzed - you were to late...`);
  }
});

socket.on('reset', () => {
  timer.stop();
  const $hero = $('.hero');
  $hero.removeClass('is-warning');
  $hero.removeClass('is-light');
  $hero.removeClass('is-danger');
  $hero.addClass('is-primary');
  $('.subtitle').text('tap anywhere to buzz');
});

$(document).ready(() => {
  $('#name').text(name);
  $('.hero').click(() => {
    buzz();
  });
});
