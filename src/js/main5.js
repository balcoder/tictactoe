function checkForWin(mark, array) {
  // checks for 3  marks on  winning Row and returns an array
  // with their id's or false
  array.forEach(function(row) {
    var markedRow = row.filter(function(id) {
      return document.getElementById(id).innerHTML === 'X';
    });
    if (markedRow.length === 3) {
      return row;
    }
  });
  return false;
}
function greenWinningRow(row) {
  // takes an array of id's and changes color to green
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
  // soft reset clears squares and resets click events
  scores.player = '0';
  scores.computer = '0';
  win = 0;
  removeClickEvents();
  listeners = [];
  setupPlayer(player);
}

function computerPlay() {
  // returns id to play for computer
  var idToMarkComp = checkForTwo(computer, winningRows);
  if (idToMarkComp) {
    document.getElementById(idToMarkComp).innerHTML = computer;
    return;
  }
  var idToMarkPly = checkForTwo(player, winningRows);
  if (idToMarkPly) {
    document.getElementById(idToMarkPly).innerHTML = computer;
    return;
  }
  var idForOne = checkForOne(computer, winningRows);
  if (idForOne) {
    document.getElementById(idForOne).innerHTML = computer;
    return;
  }
}

function checkForTwo(mark, arr) {
  // checks for two same marks in array of 3 id's and returns
  // third empty id
  arr.forEach(function(row) {
    var rowCopy = row.slice();
    rowCopy.forEach(function(id, index) {
      if (document.getElementById(id).innerHTML === mark) {
        rowCopy.splice(index, 1);
      }
    });
    if (rowCopy.length === 1 && document.getElementById(id).innerHTML === '') {
      return rowCopy[0];
    }
  });
  return false;
}

function checkForOne(mark, arr) {
  // checks for only one mark on a row of id's and returns
  // one of the remaining id's
  arr.forEach(function(row) {
    var rowCopy = row.filter(function(id) {
      return document.getElementById(id).innerHTML === mark;
    });
    if (rowCopy.length === 1) {
      var rnd = Math.random() * (row.length - 1) + 1;
      var rndId = row.filter(function(item) {
        return document.getElementById(id).innerHTML !== mark;
      });
      return rndId[rnd];
    }
  });
  return false;
}

function removeClickEvents() {
  allSquares.forEach(function(node) {
    if (listeners[i]) {
      document
        .getElementById(node.id)
        .removeEventListener('click', listeners[i]);
    }
  });
}
