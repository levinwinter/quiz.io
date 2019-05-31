$(document).ready(() => {
  $('#button-join').click(() => {
    window.location.href = `/user/${$('#input-name').val()}`;
  });
  $('#button-live').click(() => {
    window.location.href = '/live';
  });
  $('#button-manage').click(() => {
    window.location.href = '/manage';
  });
});
