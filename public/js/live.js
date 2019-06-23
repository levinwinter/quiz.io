const green = 'rgb(0, 255, 0)';
const red = 'rgb(255, 0, 0)';
const black = 'rgb(0, 0, 0)';
const gray = 'rgb(225, 225, 225)';

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
  1: '',
  2: '',
  3: '',
  4: '',
  5: '',
  6: '',
  7: '',
  8: '',
};

function updateStatus() {
  let scoreSchacht = 0;
  let scoreLehrer = 0;
  for (let i = 1; i <= 8; i += 1) {
    const $status = $('#status');
    if (game[i].localeCompare('') === 0) {
      $status.contents().find(`#n${i}.Allgemein`).css('fill', gray);
      $status.contents().find(`#n${i}.Schacht`).css('fill', black);
      $status.contents().find(`#n${i}.Lehrer`).css('fill', black);
    } else if (game[i].localeCompare('Schacht') === 0) {
      scoreSchacht += i;
      $status.contents().find(`#n${i}.Allgemein`).css('fill', black);
      $status.contents().find(`#n${i}.Schacht`).css('fill', gray);
      $status.contents().find(`#n${i}.Lehrer`).css('fill', black);
    } else if (game[i].localeCompare('Lehrer') === 0) {
      scoreLehrer += i;
      $status.contents().find(`#n${i}.Allgemein`).css('fill', black);
      $status.contents().find(`#n${i}.Schacht`).css('fill', black);
      $status.contents().find(`#n${i}.Lehrer`).css('fill', gray);
    }
    $status.contents().find('#score.Schacht').text(scoreSchacht.toString());
    if (scoreSchacht > 18) {
      $status.contents().find('#bar.Schacht').attr('width', 284.32);
    } else {
      $status.contents().find('#bar.Schacht').attr('width', 284.32 * scoreSchacht / 18);
    }
    $status.contents().find('#score.Lehrer').text(scoreLehrer.toString());
    if (scoreLehrer > 18) {
      $status.contents().find('#bar.Lehrer').attr('width', 284.32);
    } else {
      $status.contents().find('#bar.Lehrer').attr('width', 284.32 * scoreLehrer / 18);
    }
  }
}

socket.on('sandbox', (a, b) => {
  console.log(a + b);
});

socket.on('winner', (gameNumber, winner) => {
  console.log(winner);
  game[gameNumber] = winner;
  updateStatus();
});

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
