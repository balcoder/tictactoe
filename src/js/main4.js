//Tic Tac Toe game that uses npm scripts as build tool
'use strict';

document.addEventListener('DOMContentLoaded', function() {
  var scores = {
    player: '0',
    computer: '0',
  };
  var player;
  var computer;
  // hold a reference to each click event listener for removal later
  var listeners = {};
  //get id's of sounds
  var winSound = document.getElementById('winSound');
  var looseSound = document.getElementById('looseSound');

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
  var squaresCopy = [];
  //get all square elements
  var allSquares = document.querySelectorAll('.square');
  // keep track of win
  var win = 0;
  // full reset
  document.getElementById('reset').addEventListener('click', fullReset);
  // clear board and play another
  document.getElementById('hidden').addEventListener('click', subReset);
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
    squaresCopy = squares.slice();
    for (var i = 0; i < allSquares.length; i++) {
      if (allSquares[i].innerHTML === '') {
        // store listener for later removal
        listeners[i] = clickSquare(i);

        // set up a click event for each square
        allSquares[i].addEventListener('click', listeners[i]);
      }
    }
    document.getElementById('hidden').className = 'hidden';
  }

  function clickSquare(i) {
    var num = i;
    return function() {
      // set marker for the square to the player mark
      allSquares[num].innerHTML = player;
      var nextId = allSquares[num].getAttribute('id');
      // keep list of empty square id's
      squaresCopy = remove(squaresCopy, nextId);
      // remove click event
      removeClick(nextId);
      // check for win here
      var markWinArr = checkForWin(player, winningRows);
      if (markWinArr) {
        winSound.play();
        scores.player = ++scores.player;
        document.getElementById('player').innerHTML =
          'Player : ' + scores.player;
        runWinTask(markWinArr, player);
      } else if (squaresCopy.length === 0) {
        // check for draw
        document.getElementById('message').innerHTML = "It's a Draw";
        document.getElementById('hidden').classList.remove('hidden');
        setTimeout(subReset, 3000);
      } else {
        // computers turn
        computerPlay(player);
      }
    };
  }

  function checkForWin(mark, array) {
    // checks for 3  marks on  winning Row and returns an array
    // with their id's or false
    for (var i = 0; i < array.length; i++) {
      //array.forEach(function(row) {
      var markedRow = array[i].filter(function(id) {
        return document.getElementById(id).innerHTML === mark;
      });
      if (markedRow.length === 3) {
        return markedRow;
      }
    }
    //});
    return false;
  }

  function runWinTask(winningArr, player) {
    // tasks to run after win
    greenWinningRow(winningArr);
    removeClickEvents();
    document.getElementById('message').innerHTML = player + ' Wins!';
    document.getElementById('hidden').classList.remove('hidden');
    setTimeout(subReset, 3000);
  }
  function greenWinningRow(row) {
    // takes an array of id's and changes color to green
    row.forEach(function(id) {
      document.getElementById(id).style.color = 'green';
    });
  }

  function computerPlay() {
    // returns id to play for computer
    setTimeout(function() {
      var idToMarkComp = checkForTwo(computer, winningRows);
      if (idToMarkComp) {
        looseSound.play();
        document.getElementById(idToMarkComp).innerHTML = computer;
        removeClick(idToMarkComp);
        squaresCopy = remove(squaresCopy, idToMarkComp);
        var testCompWin = checkForWin(computer, winningRows);
        if (testCompWin) {
          runWinTask(testCompWin, computer);
          scores.computer = ++scores.computer;
          document.getElementById('computer').innerHTML =
            'Computer : ' + scores.computer;
        }
        return;
      }
      var idToMarkPly = checkForTwo(player, winningRows);
      if (idToMarkPly) {
        document.getElementById(idToMarkPly).innerHTML = computer;
        removeClick(idToMarkPly);
        squaresCopy = remove(squaresCopy, idToMarkPly);
        return;
      }
      var idForOne = checkForOne(computer, winningRows);
      if (idForOne) {
        document.getElementById(idForOne).innerHTML = computer;
        removeClick(idForOne);
        squaresCopy = remove(squaresCopy, idForOne);
        return;
      }
      var rndSquareId =
        squaresCopy[Math.floor(Math.random() * squaresCopy.length)];
      document.getElementById(rndSquareId).innerHTML = computer;
      removeClick(rndSquareId);
      squaresCopy = remove(squaresCopy, rndSquareId);
    }, 500);
  } // end of computerPlay()

  function fullReset() {
    location.reload();
  }

  function subReset() {
    // soft reset clears squares and resets click events
    // scores.player = '0';
    // scores.computer = '0';
    document.getElementById('message').innerHTML =
      'You are ' + player + ' and Computer is ' + computer;
    win = 0;
    removeClickEvents();
    listeners = [];
    cleanSquares();
    setupPlayer(player);
  }

  function cleanSquares() {
    for (var i = 0; i < allSquares.length; i++) {
      allSquares[i].innerHTML = '';
      allSquares[i].style.color = 'white';
    }
  }
  function checkForTwo(mark, arr) {
    // checks for two same marks in array of 3 id's and returns
    // third empty id
    for (var i = 0; i < arr.length; i++) {
      var rowCopy = arr[i].slice();
      arr[i].forEach(function(id, index) {
        if (document.getElementById(id).innerHTML === mark) {
          var indexToSplice = rowCopy.indexOf(id);
          rowCopy.splice(indexToSplice, 1);
        }
      });
      if (
        rowCopy.length === 1 &&
        document.getElementById(rowCopy[0]).innerHTML === ''
      ) {
        var myId = rowCopy[0];
        return myId;
      }
    }
    return false;
  }

  function checkForOne(mark, arr) {
    // checks for only one mark on a row of id's and returns
    // one of the remaining id's
    //arr.forEach(function(row) {
    for (var i = 0; i < arr.length; i++) {
      var rowCopy = arr[i].filter(function(id) {
        return document.getElementById(id).innerHTML === '';
      });
      if (rowCopy.length === 2) {
        // rowCopy has two empty squares
        var markedIndex = arr[i].filter(function(id) {
          return document.getElementById(id).innerHTML === mark;
        });
        if (markedIndex.length === 1) {
          var rnd = Math.floor(Math.random() * rowCopy.length);
          return rowCopy[rnd];
        }
      }
    }
    //});
    return false;
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

  // remove click event
  function removeClick(id) {
    for (var i = 0; i < allSquares.length; i++) {
      if (allSquares[i].id === id) {
        document.getElementById(id).removeEventListener('click', listeners[i]);
      }
    }
  }

  function remove(array, element) {
    return array.filter(function(e) {
      return e !== element;
    });
  }
});
