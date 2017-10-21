function checkForWin(mark, array) {
  // checks for 3  marks on  winning Row and returns an array
  // with their id's or false
  array.forEach(function(row) {
    var markedRow = row.filter(function(id) {
      return document.getElementById(id).innerHTML === 'X';
    });
    if (markedRow.length === 3) {
      return markedRow;
    }
  });
}
function greenWinningRow() {
  row.forEach(function(id) {
    document.getElementById(id).style.color = 'green';
  });
}
function updateScore(winner) {
  scores[winner]++;
}

function fullReset() {
  location.reload();
}

function subReset() {
  scores.player = '0';
  scores.computer = '0';
  win = 0;
  removeClickEvents();
  listeners = [];
  setupPlayer(player);
}
