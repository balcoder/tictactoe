// object to keep account of games won
var scores = {
  player: '0',
  computer: '0',
};
var player;
// hold a reference to each click event listener for removal later
var listeners = {};
// counter to indicate draw
var gameState = 9;

var winningRows = [
  ['row1col1', 'row1col2', 'row1col3'],
  ['row2col1', 'row2col2', 'row2col3'],
  ['row3col1', 'row3col2', 'row3col3'],
  ['row1col1', 'row2col1', 'row3col1'],
  ['row1col2', 'row2col2', 'row3col2'],
  ['row1col3', 'row2col3', 'row3col3'],
  ['row1col1', 'row2col2', 'row3col3'],
  ['row1col3', 'row2col2', 'row3col1'],
];
// array to keep track of what squares are empty
var squares = [
  'row1col1',
  'row1col2',
  'row1col3',
  'row2col1',
  'row2col2',
  'row2col3',
  'row3col1',
  'row3col2',
  'row3col3',
];
//get all square elements
var allSquares = document.querySelectorAll('.square');
// keep track of win
var win = 0;
//reset scores to zero and clear squares
document.getElementById('reset').addEventListener('click', reset);
// the main game
startGame();
function startGame() {
  scores.player = '0';
  scores.computer = '0';
  win = 0;
  //set up initial player config
  var x = 1;
  var o = 0;
  //add listeners to x and o to set the marker for duration of the game
  document.getElementById('x').addEventListener('click', function() {
    chooseMark(x);
    setupPlayer(player);
  });
  document.getElementById('o').addEventListener('click', function() {
    chooseMark(o);
    setupPlayer(player);
  });
}
//Choose marker and change message
function chooseMark(mark) {
  if (mark === 1) {
    player = 'X';
    computer = 'O';
    document.getElementById('message').innerHTML =
      'You are X and Computer is O';
  } else {
    player = 'O';
    computer = 'X';
    document.getElementById('message').innerHTML =
      'You are O and Computer is X';
  }
}
// loop through each square adding click event if empty
function setupPlayer(player) {
  //var squareState = {};
  for (i = 0; i < allSquares.length; i++) {
    if (allSquares[i].innerHTML === '') {
      // store listener for later removal
      listeners[i] = clickSquare(i);
      //listeners[allSquares[i].id] = clickSquare(i);
      // set up a click event for each square
      allSquares[i].addEventListener('click', listeners[i]);
      //allSquares[i].addEventListener('click', listeners[allSquares[i].id]);
    }
  }
}

function clickSquare() {
  var num = i;
  return function() {
    //prevent user from clicking already clicked square using data
    // attributes
    //if(e.currentTarget.dataset.triggered) return;
    //e.currentTarget.dataset.triggered = true;
    // set marker for the square to the player mark
    allSquares[num].innerHTML = player;
    var nextId = allSquares[num].getAttribute('id');
    // keep list of empty square id's
    squares = remove(squares, nextId);
    // squareState[nextId] = player;
    //keeps track for draw
    --gameState;
    // check for win here
    checkForWin(player);
    if (win === 1) {
      document.getElementById('message').innerHTML = 'You Win!';
      scores.player = ++scores.player;
      document.getElementById('player').innerHTML = 'Player: ' + scores.player;
      document.getElementById('hidden').classList.remove('hidden');
      removeClickEvents();
      return;
      // check for draw
    } else if (win === 0 && gameState === 0) {
      document.getElementById('message').innerHTML = "It's a Draw";

      return;
    } else {
      // computers turn
      computerPlay(player);
    }
  };
}

function removeClickEvents() {
  for (var i = 0; i < allSquares.length; i++) {
    if (listeners[i]) {
      document
        .getElementById(allSquares[i].id)
        .removeEventListener('click', listeners[i]);
    }
  }
}

function computerPlay(player) {
  //wait one second before computer plays, nicer effect
  setTimeout(function() {
    var computer;
    var markedSquares = [];
    var found = 0;
    if (player === 'X') {
      computer = 'O';
    } else {
      computer = 'X';
    }
    //prevent player from winning if two marks already on winning row
    if (computerMarker(computer, player, 'save')) {
      return;
      // try to win by looking for 2 computer marks on winning row
    } else if (computerMarker(computer, player, 'win')) {
      return;
    } else {
      // put mark in best position for win next go
      var idToMarkComp = checkForOne(computer);
      var idToMarkPly = checkForOne(player);
      if (idToMarkComp) {
        document.getElementById(idToMarkComp).innerHTML = computer;
        squares = remove(squares, idToMarkComp);
        --gameState;
        return;
      } else if (idToMarkPly) {
        document.getElementById(idToMarkPly).innerHTML = computer;
        squares = remove(squares, idToMarkPly);
        --gameState;
        return;
      } else {
        if (squares.lenght != 0 && gameState != 0) {
          var item = squares[Math.floor(Math.random() * squares.length)];
          document.getElementById(item).innerHTML = computer;
          --gameState;
        }
      }
      return;
    }

    //Find out where to mark
    function computerMarker(computer, player, check) {
      var checkMark = '';
      var markSaved = 0;
      found = 0;
      if (check === 'win') {
        checkMark = computer;
      } else {
        checkMark = player;
      }
      for (var j = 0; j < winningRows.length; j++) {
        var counter = 0;
        markedSquares.sort();
        if (found === 1) {
          // markedSquares has 2 id's, mark the third missing one
          if (markedSquares[0] != 0) {
            var id = winningRows[j - 1][0];
            if (document.getElementById(id).innerHTML === '') {
              document.getElementById(id).innerHTML = computer;
              squares = remove(squares, id);
              --gameState;
              markedSquares = [];
              if (check === 'win') {
                win = 1;
              }
              if (check === 'save') {
                markSaved = 1;
              }
              //return true;
            }
          } else if (markedSquares[1] != 1) {
            var id = winningRows[j - 1][1];
            if (document.getElementById(id).innerHTML === '') {
              document.getElementById(id).innerHTML = computer;
              squares = remove(squares, id);
              --gameState;
              markedSquares = [];
              if (check === 'win') {
                win = 1;
              }
              if (check === 'save') {
                markSaved = 1;
              }
              //return true;
            }
          } else {
            var id = winningRows[j - 1][2];
            if (document.getElementById(id).innerHTML === '') {
              document.getElementById(id).innerHTML = computer;
              squares = remove(squares, id);
              --gameState;
              markedSquares = [];
              if (check === 'win') {
                win = 1;
              }
              if (check === 'save') {
                markSaved = 1;
              }
              //return true;
            }
          }
          markedSquares = [];
          if (win === 1) {
            checkForWin(computer);
            document.getElementById('message').innerHTML = 'Computer Wins!';

            return true;
          }
          // check for save and no win
          if (check === 'save' && markSaved === 1) {
            return true;
          }
          // check for draw
          if (win === 0 && gameState === 0) {
            document.getElementById('message').innerHTML = "It's a Draw";
            return;
          }
          return false;
        }
        //empty the array before looping through each winningRow
        markedSquares = [];
        for (var i = 0; i < winningRows[j].length; i++) {
          if (
            document.getElementById(winningRows[j][i]).innerHTML === checkMark
          ) {
            markedSquares.push(i);
            ++counter;
            if (counter === 2) {
              found = 1;
              break;
            }
          }
        }
      }
    }
  }, 1000);
}

function checkForOne(player) {
  for (var i = 0; i < winningRows.length; i++) {
    var row = winningRows[i];
    var twoEmpty = 0;
    var emptySlots = [];
    var haveOne = 0;
    for (var j = 0; j < row.length; j++) {
      if (document.getElementById(row[j]).innerHTML === '') {
        ++twoEmpty;
        emptySlots.push(row[j]);
      } else if (document.getElementById(row[j]).innerHTML === player) {
        ++haveOne;
      }
    }
    if (twoEmpty === 2 && haveOne === 1) {
      var item = emptySlots[Math.floor(Math.random() * emptySlots.length)];
      // document.getElementById(item).innerHTML = player;
      squares = remove(squares, item);
      return item;
    }
  }
}
function checkForWin(player) {
  // store winnig id's here
  var greenIds = [];
  //check each winning combo
  for (var i = 0; i < winningRows.length; i++) {
    if (greenIds.length === 3) {
      win = 1;
      for (var j = 0; j < 3; j++) {
        document.getElementById(greenIds[j]).style.color = 'green';
      }
      //break;
      return;
    }
    greenIds = [];
    win = 0;
    for (var k = 0; k < 3; k++) {
      // look for player mark in winningrow combos
      if (player === document.getElementById(winningRows[i][k]).innerHTML) {
        greenIds.push(winningRows[i][k]);
      }
    }
  }
  if (win === 1) {
    document.getElementById('yourTurn').innerHTML = 'We have a winner';
    removeClickEvents();
    return;
  }
}
//Change the message
function messagePlayer(player) {
  document.getElementById('yourTurn').innerHTML = player + 'turn';
}

function clearSquares() {
  //select all elements with class of square
  var x = document.querySelectorAll('.square');
  var i;
  //set each square to blank
  for (i = 0; i < x.length; i++) {
    x[i].innerHTML = '';
  }
}

function reset() {
  clearSquares();
  removeClickEvents();
  startGame();
}
function remove(array, element) {
  return array.filter(function(e) {
    return e !== element;
  });
}
