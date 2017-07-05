$(document).ready(function () {

  //set up initial player config
  var playerMark = "x";
  var computreMark = "o";
  var haveWin = 0;

  //setup winning rows
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

  //  keep account of games won
  var scores = {
    player: "0",
    computer: "0"
  };

  // keep track of board squareState
  var squareState = {};

  // get node list of all squares
  var allSquares = document.querySelectorAll(".square");

  //clearSquares();
  document.getElementById("reset").addEventListener("click", reset);

  //add listeners to x and o to set the marker for duration of the game
  document.getElementById("x").addEventListener("click",function () {
    playerMark = "x";
    computreMark = "o";
    messagePlayer('Your');
    chooseMark(playerMark);
    playGame(playerMark);
  });
  document.getElementById("o").addEventListener("click",function () {
    playerMark = "o";
    computerMark = "x";
    messagePlayer('Your');
    chooseMark(playerMark);
    playGame(playerMark);
  });

//main game
function playGame(playerMark) {
  var turn = playerMark;
  setupBoard(turn);
  // var haveWin = 0;
  // //loop through each turn until we get a win or draw
  // while(haveWin === 0){
  //   setupBoard(turn);
  //   if(turn === "x"){
  //     turn = "o";
  //   } else {
  //     turn = "x";
  //   }
  // }
}

// message player
function messagePlayer(player) {
  document.getElementById("yourTurn").innerHTML = player + ' Turn';
}

//add clickevent listeners to all empty squares on the board and set marker to
// whos turn it is
function setupBoard(marker) {
  //var allSquares = document.querySelectorAll(".square");
  var i;
  var addMarkers = (function(){
  var num = i;
  return function() {
      document.getElementById(allSquares[num].getAttribute('id')).innerHTML= marker;
      var nextId = allSquares[num].getAttribute('id');
      //save players mark and square
      squareState[nextId] = marker;
  }
  })();

   //loop through each square adding click event if empty
  for (i = 0; i < allSquares.length; i++) {
      if(allSquares[i].innerHTML === "") {
        document.getElementById(allSquares[i].getAttribute('id')).addEventListener('click', addMarkers);
        document.getElementById(allSquares[i].getAttribute('id')).addEventListener("click", function(){
            if(testWin(marker)){
              document.getElementById("yourTurn").innerHTML = 'You Win';
              haveWin = 1;
            }
         });

      }
  }
}

// Choose marker and change message
function chooseMark(mark){
  if(mark === "x"){
    document.getElementById('message').innerHTML= 'You are X and Computer is O';
  } else {
    document.getElementById('message').innerHTML= 'You are O and Computer is X';
  }
}

function clearSquares() {
  var x = document.querySelectorAll(".square");
  var i;
  for (i = 0; i < x.length; i++) {
      x[i].innerHTML = "";
  }
}

function reset() {
  scores.player = "0";
  scores.computer = "0";
  clearSquares();

}

// check if added mark is part of winning line
function testWin(mark) {
  var testVar = "x";
  var winningLine = 0;
  //var squareState = {row1col1: "x", row1col2: "x", row1col3: "x"};
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
  for (var key in winningRows) {
    if (winningRows.hasOwnProperty(key)) {
      //reset winningLine for each row loop
      winningLine = 0;
      //console.log(key + " -> " + winningRows[key]);
      for(var id in winningRows[key]){
       //console.log(winningRows[key][id]);
       for(var rowid in squareState){
        if(rowid == winningRows[key][id] && squareState[rowid] === mark){
         winningLine += 1;
         if(winningLine === 3 ){
          return true;
          }
        }
       }
      }
    }
  }
}

function testPlay(marker) {
  var i;
   //loop through each square adding click event if empty
  for (i = 0; i < allSquares.length; i++) {
      if(allSquares[i].innerHTML === "") {
        document.getElementById(allSquares[i].getAttribute('id')).addEventListener('click', (function(){
        var num = i;
        return function() {
            document.getElementById(allSquares[num].getAttribute('id')).innerHTML= marker;
            var nextId = allSquares[num].getAttribute('id');
            //save players mark and square
            squareState[nextId] = marker;
        }
        })());
        document.getElementById(allSquares[i].getAttribute('id')).addEventListener("click", function(){
            if(testWin(marker)){
              document.getElementById("yourTurn").innerHTML = 'You Win';
              haveWin = 1;
            }
         });
      }
  }
}



//   // object to keep account of games won
//   var scores = {
//     player: "0",
//     computer: "0"
//   };
//   //clearSquares();
// document.getElementById("reset").addEventListener("click", reset);
//
// startGame();
//
// // the main game
// function startGame() {
//   reset();
//   //set up initial player config
//   var x = 1;
//   var o = 0;
//   //setup winning lines in object
//   var winningRows = {
//     row1:['row1col1','row1col2','row1col3'],
//     row2:['row2col1','row2col2','row2col3'],
//     row3:['row3col1','row3col2','row3col3'],
//     col1:['row1col1','row2col1','row3col1'],
//     col2:['row1col2','row2col2','row3col2'],
//     col3:['row1col3','row2col3','row3col3'],
//     diag1:['row1col1','row2col2','row3col3'],
//     diag2:['row1col3','row2col2','row3col1']
//   };
//   //add listeners to x and o to set the marker for duration of the game
//   document.getElementById("x").addEventListener("click",function () {
//   chooseMark(x);
//   setupBoard(x);
//   checkForWin();
//
//   });
//   document.getElementById("o").addEventListener("click",function () {
//   chooseMark(o);
//   setupBoard(o);
//   });
// }
//
// //add clickevent listeners to all empty squares on the board and set marker to
// // whos turn it is
// function setupBoard(marker) {
//   x = 1;
//   var x = document.querySelectorAll(".square");
//   var squareState = {};
//   var i;
//
//   //loop through each square adding to array if empty
//
//   for (i = 0; i < x.length; i++) {
//       if(x[i].innerHTML === "") {
//         document.getElementById(x[i].getAttribute('id')).addEventListener('click', (function(){
//         console.log(x[i].getAttribute('id'));
//         var num = i;
//         return function() {
//             document.getElementById(x[num].getAttribute('id')).innerHTML='X';
//             var nextId = x[num].getAttribute('id');
//             squareState[nextId] = "x";
//             messagePlayer('Your');
//
//         }
//         })());
//       }
//   }
// }
//
// function checkForWin() {
//
// }
// // Choose marker and change message
// function chooseMark(mark){
//   if(mark === 1){
//     o = 0;
//     x = 1;
//     document.getElementById('message').innerHTML= 'You are X and Computer is O';
//   } else {
//     o = 1;
//     x = 0;
//     document.getElementById('message').innerHTML= 'You are O and Computer is X';
//   }
// }
// function messagePlayer (player) {
//   document.getElementById("yourTurn").innerHTML = player + 'turn'
// }
// function addMark () {
//   var squares = document.querySelectorAll('div.board .square');
// }
//
//
// function clearSquares() {
//   var x = document.querySelectorAll(".square");
//   var i;
//   for (i = 0; i < x.length; i++) {
//       x[i].innerHTML = "";
//   }
// }
//
// function reset() {
//   scores.player = "0";
//   scores.computer = "0";
//   clearSquares();
//
// }
});
