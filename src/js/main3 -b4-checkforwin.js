$(document).ready(function () {
  // object to keep account of games won
  var scores = {
    player: "0",
    computer: "0"
  };
  //reset scores to zero and clear squares
document.getElementById("reset").addEventListener("click", reset);

startGame();

// the main game
function startGame() {
  reset();
  //set up initial player config
  var x = 1;
  var o = 0;
  //setup winning lines in object
  var winningRows = {
    row1:['row1col1','row1col2','row1col3'],
    row2:['row2col1','row2col2','row2col3'],
    row3:['row3col1','row3col2','row3col3'],
    col1:['row1col1','row2col1','row3col1'],
    col2:['row1col2','row2col2','row3col2'],
    col3:['row1col3','row2col3','row3col3'],
    diag1:['row1col1','row2col2','row3col3'],
    diag2:['row1col3','row2col2','row3col1']
  };
  //add listeners to x and o to set the marker for duration of the game
  document.getElementById("x").addEventListener("click",function () {
    chooseMark(x);
    setupBoard(x);
    checkForWin();

  });
  document.getElementById("o").addEventListener("click",function () {
    chooseMark(o);
    setupBoard(o);
  });
}

//add clickevent listeners to all empty squares on the board and set marker to
// whos turn it is
function setupBoard(marker) {
  var x = document.querySelectorAll(".square");
  var squareState = {};
  var i;

  //loop through each square adding to array if empty

  for (i = 0; i < x.length; i++) {
      if(x[i].innerHTML === "") {
        document.getElementById(x[i].getAttribute('id')).addEventListener('click', (function(){
        console.log(x[i].getAttribute('id'));
        var num = i;
        return function() {
            document.getElementById(x[num].getAttribute('id')).innerHTML='X';
            var nextId = x[num].getAttribute('id');
            squareState[nextId] = "x";
            // check for win here
            console.log(squareState);
            messagePlayer('Your');

        }
        })());
      }
  }
}

function checkForWin() {
  // winning logic here

}
// Choose marker and change message
function chooseMark(mark){
  if(mark === 1){
    o = 0;
    x = 1;
    document.getElementById('message').innerHTML= 'You are X and Computer is O';
  } else {
    o = 1;
    x = 0;
    document.getElementById('message').innerHTML= 'You are O and Computer is X';
  }
}
function messagePlayer (player) {
  document.getElementById("yourTurn").innerHTML = player + 'turn'
}
function addMark () {
  var squares = document.querySelectorAll('div.board .square');
}


function clearSquares() {
  //select all elements with class of square
  var x = document.querySelectorAll(".square");
  var i;
  //set each square to blank
  for (i = 0; i < x.length; i++) {
      x[i].innerHTML = "";
  }
}

function reset() {
  scores.player = "0";
  scores.computer = "0";
  clearSquares();

}
});
