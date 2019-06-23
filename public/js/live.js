const green = 'rgb(0, 255, 0)';
const red = 'rgb(255, 0, 0)';

// eslint-disable-next-line no-undef
const socket = io({ query: { type: 'sandbox' } });

const buzz = new Audio('/public/sound/buzz.mp3');
const beep = new Audio('/public/sound/beep.mp3');
const fail = new Audio('/public/sound/fail.mp3');

function Player(name) {
  this.name = name;
  // eslint-disable-next-line no-undef
  const timer = new Timer();
  this.setScore = (score) => {
    const $overlay = $('#overlay');
    $overlay.contents().find(`#point7.${this.name}`).hide();
    $overlay.contents().find(`#point6.${this.name}`).hide();
    $overlay.contents().find(`#point5.${this.name}`).hide();
    $overlay.contents().find(`#point4.${this.name}`).hide();
    $overlay.contents().find(`#point3.${this.name}`).hide();
    $overlay.contents().find(`#point2.${this.name}`).hide();
    $overlay.contents().find(`#point1.${this.name}`).hide();
    switch (Number(score)) {
      case 7:
        $overlay.contents().find(`#point7.${this.name}`).show();
        // falls through
      case 6:
        $overlay.contents().find(`#point6.${this.name}`).show();
        // falls through
      case 5:
        $overlay.contents().find(`#point5.${this.name}`).show();
        // falls through
      case 4:
        $overlay.contents().find(`#point4.${this.name}`).show();
        // falls through
      case 3:
        $overlay.contents().find(`#point3.${this.name}`).show();
        // falls through
      case 2:
        $overlay.contents().find(`#point2.${this.name}`).show();
        // falls through
      case 1:
        $overlay.contents().find(`#point1.${this.name}`).show();
        // no default
    }
  };
  this.startCountdown = () => {
    const $overlay = $('#overlay');
    timer.start({ precision: 'seconds', startValues: { seconds: 0 }, target: { seconds: 5 } });
    $overlay.contents().find(`#time5.${this.name}`).css('fill', green)
      .hide();
    $overlay.contents().find(`#time4.${this.name}`).css('fill', green)
      .hide();
    $overlay.contents().find(`#time3.${this.name}`).css('fill', green)
      .hide();
    $overlay.contents().find(`#time2.${this.name}`).css('fill', green)
      .hide();
    $overlay.contents().find(`#time1.${this.name}`).css('fill', green)
      .hide();
    buzz.play();
    timer.addEventListener(['secondsUpdated'], () => {
      const { seconds } = timer.getTimeValues();
      if (seconds !== 5) {
        beep.play();
        $overlay.contents().find(`#time${timer.getTimeValues().seconds}.${this.name}`).show();
      }
    });
    timer.addEventListener(['targetAchieved'], () => {
      fail.play();
      $overlay.contents().find(`#time5.${this.name}`).css('fill', red)
        .show();
      $overlay.contents().find(`#time4.${this.name}`).css('fill', red)
        .show();
      $overlay.contents().find(`#time3.${this.name}`).css('fill', red)
        .show();
      $overlay.contents().find(`#time2.${this.name}`).css('fill', red)
        .show();
      $overlay.contents().find(`#time1.${this.name}`).css('fill', red)
        .show();
    });
  };
  this.stopCountdown = () => {
    timer.stop();
    const $overlay = $('#overlay');
    $overlay.contents().find(`#time5.${this.name}`).hide();
    $overlay.contents().find(`#time4.${this.name}`).hide();
    $overlay.contents().find(`#time3.${this.name}`).hide();
    $overlay.contents().find(`#time2.${this.name}`).hide();
    $overlay.contents().find(`#time1.${this.name}`).hide();
  };
}

const game = {
  schacht: new Player('Schacht'),
  lehrer: new Player('Lehrer'),
};

socket.on('score', (name, score) => {
  game[name].setScore(score);
});

socket.on('buzz', (name) => {
  game[name].startCountdown(name);
});

socket.on('reset', () => {
  game.schacht.stopCountdown();
  game.lehrer.stopCountdown();
});

socket.on('live-view', (view) => {
  const $overlay = $('#overlay');
  const $status = $('#status');
  $overlay.hide();
  $status.hide();
  switch (view) {
    case 'overlay':
      $overlay.show();
      break;
    case 'status':
      $status.show();
      break;
      // no default
  }
});

$(document).ready(() => {
  game.schacht.setScore(0);
  game.lehrer.setScore(0);
});
