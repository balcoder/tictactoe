$(document).ready(function () {
  // object to keep account of games won
  var scores = {
    player: "0",
    computer: "0"
  };
  // counter to indicate draw
  var gameState = 9;
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

  var squares = ['row1col1','row1col2','row1col3','row2col1','row2col2','row2col3''row3col1','row3col2','row3col3'];
  //get all square elements
  var allSquares = document.querySelectorAll(".square");

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
    setupPlayer(player);
  });
  document.getElementById("o").addEventListener("click",function () {
    chooseMark(o);
    setupPlayer(player);
  });
}

//Choose marker and change message
function chooseMark(mark){
  if (mark ===1){
    player = 'X';
    computer = 'O';
    document.getElementById('message').innerHTML= 'You are X and Computer is O';
  } else {
    player = 'O';
    computer = 'X';
    document.getElementById('message').innerHTML= 'You are O and Computer is X';
  }
}

//loop through each square adding click event if empty
function setupPlayer(player){
  var squareState = {};
  for (i = 0; i < allSquares.length; i++) {
      if(allSquares[i].innerHTML === "") {
        document.getElementById(allSquares[i].getAttribute('id')).addEventListener('click', (function(){
          var num = i;
          return function() {
              document.getElementById(allSquares[num].getAttribute('id')).innerHTML=player;
              var nextId = allSquares[num].getAttribute('id');
              squares = remove(squares,nextId);
              squareState[nextId] = player;
              --gameState;
              // check for win here
              if(checkForWin(player)){console.log ("WIN")}
              messagePlayer('Your');
              if(gameState === 0){
                document.getElementById('message').innerHTML= "It's a Draw";
              }
              computerPlay(player);
          }
        })());
      }
    }
}

function computerPlay(player){
  let computer;
  let markedSquares = [];
  let found = 0;
  if(player === 'X'){
    computer = 'O';
  } else {
    computer = 'X';
  }
  //var check = 'win'
  // try to win
  if (computerMarker(computer, player, 'win')){
    return;
    //prevent player from winning if two marks already
  }else if(computerMarker(computer, player, 'save')) {
    return;
  } else {
    // put mark in best position for win next go
    return;
  }
  //Find out where to mark
  function computerMarker(computer, player, check){
    var checkMark =''
    if(arguments[2] === 'win'){
      checkMark = computer;
    }
    if(arguments[2] === 'save'){
      checkMark = player;
    }
    for(var j = 0; j < winningRows.length; j++){
      let counter= 0;
      markedSquares.sort();
      if(found === 1){
        // markedSquares has 2 id's, mark the third missing one
        if(!markedSquares === 0){
          var id = winningRows[j-1][0];
          document.getElementById(id).innerHTML = computer;
          squares = remove(squares,id);
        }else if (!markedSquares[1] === 1){
          var id = winningRows[j-1][1];
          document.getElementById(id).innerHTML = computer;
          squares = remove(squares,id);
        } else {
          var id = winningRows[j-1][2];
          document.getElementById(id).innerHTML = computer;
          squares = remove(squares,id);
        }
        for(let i = 0; i < winningRows[j-1].length; i++){
          document.getElementById(winningRows[j-1][i]).style.color = 'green';
        }
        return true;
      }
      //empty the array before looping through each winningRow
      markedSquares = [];
      for(var i = 0; i < winningRows[j].length; i++){
        if(document.getElementById(winningRows[j][i]).innerHTML === checkMark) {
          markedSquares.push(i);
          ++ counter;
          if(counter === 2) {
            found = 1;
            break;
          }
        }
      }
    }
}
}// end of computerPlay()
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
function remove(array, element) {
    return array.filter(e => e !== element);
}
});
