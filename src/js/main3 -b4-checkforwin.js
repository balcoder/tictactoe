$(document).ready(function () {
  // object to keep account of games won
  var scores = {
    player: "0",
    computer: "0"
  };
  var winningRows = [
    ['row1col1','row1col2','row1col3'],
    ['row2col1','row2col2','row2col3'],
    ['row3col1','row3col2','row3col3'],
    ['row1col1','row2col1','row3col1'],
    ['row1col2','row2col2','row3col2'],
    ['row1col3','row2col3','row3col3'],
    ['row1col1','row2col2','row3col3'],
    ['row1col3','row2col2','row3col1']
  ];

  // var computerCheck = [
  //   ['row1col2','row1col3'],
  //   ['row1col1','row1col2'],
  //   ['row2col2','row2col3'],
  //   ['row2col1','row2col2'],
  //   ['row3col2','row3col3'],
  //   ['row3col1','row3col2'],
  //   ['row2col1','row3col1'],
  //   ['row1col1','row2col1'],
  //   ['row2col2','row3col2'],
  //   ['row1col2','row2col2'],
  //   ['row2col3','row3col3'],
  //   ['row1col3','row2col3'],
  //   ['row2col2','row3col3'],
  //   ['row1col1','row2col2'],
  //   ['row2col2','row3col1'],
  //   ['row1col3','row2col2']
  // ];

  var squareState = {};
  //reset scores to zero and clear squares
document.getElementById("reset").addEventListener("click", reset);

startGame();

// the main game
function startGame() {
  reset();
  //set up initial player config
  var x = 1;
  var o = 0;
  //add listeners to x and o to set the marker for duration of the game
  document.getElementById("x").addEventListener("click",function () {
    chooseMark(x);
    setupBoard(x);
  });
  document.getElementById("o").addEventListener("click",function () {
    chooseMark(o);
    setupBoard(o);
  });
}

//add clickevent listeners to all empty squares on the board and set marker to
// whos turn it is
function setupBoard(marker) {
  var i;
  var gameState;
  if (marker ===1){
    player = 'X';
  } else{
    player = 'O'
  }
  setupPlayer(player);



}
//loop through each square adding to array if empty
function setupPlayer(player){
  var squareState = {};
  var gameState = 9;
  var computerCheck = winningRows
  var allSquares = document.querySelectorAll(".square");
  for (i = 0; i < allSquares.length; i++) {
      if(allSquares[i].innerHTML === "") {
        document.getElementById(allSquares[i].getAttribute('id')).addEventListener('click', (function(){
        console.log(allSquares[i].getAttribute('id'));
        var num = i;
        //var winners = winningRows;
        return function() {
            document.getElementById(allSquares[num].getAttribute('id')).innerHTML=player;
            var nextId = allSquares[num].getAttribute('id');
            squareState[nextId] = player;
            console.log(player);
            --gameState;
            // check for win here
             if(checkForWin(player)){console.log ("WIN")}
            console.log('This id it: ' + squareState);
            console.log(gameState);
            messagePlayer('Your');
            if(gameState === 0){
              document.getElementById('message').innerHTML= "It's a Draw";
            }

        }
        })());
      }
  }
}

function computer(player){
  player = 'X';
  //find best place to mark
  winningRows.forEach(function(winningRow){
    let markedSquares = [];
    let counter;
    let found = 0;
    for(let i = 0; i < winningRow.length; i++){
      if(winningRow[i] === player) {
        markedSquares.push(i);
        ++ counter;
        if(counter === 2) {
          found = 1;
          return;
        }
      }
    }
  });
}
for (var square in squareState) {
  if (object.hasOwnProperty(square)) {
    if(squareState[square] === 'X'){}
  }
}




function checkForWin(player) {
  var win = 0;
  //check each winning combo
  winningRows.forEach(function(winningRow){
    if(winningRow.every(function(square){
      // look for player mark in winningrow combos
      return player === document.getElementById(square).innerHTML;

    })){win = 1;}
  });
  if(win === 1) return true;
}
//Choose marker and change message
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

//Change the message
function messagePlayer (player) {
  document.getElementById("yourTurn").innerHTML = player + 'turn'
}

// function addMark () {
//   var squares = document.querySelectorAll('div.board .square');
// }


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
