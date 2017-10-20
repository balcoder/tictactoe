var scores = {
  player: "0",
  computer: "0"
};
var player;
// hold a reference to each click event listener for removal later
var listeners = {};
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
// array to keep track of what squares are empty
var squares = ['row1col1','row1col2','row1col3','row2col1','row2col2','row2col3','row3col1','row3col2','row3col3'];
//get all square elements
var allSquares = document.querySelectorAll(".square");
// keep track of win
var win = 0;
//reset scores to zero and clear squares
document.getElementById("reset").addEventListener("click", reset);
// the main game
startGame();
function startGame() {
  scores.player = "0";
  scores.computer = "0";
  win = 0;
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
  // loop through each square adding click event if empty
  function setupPlayer(player){
    //var squareState = {};
    for (i = 0; i < allSquares.length; i++) {
        if(allSquares[i].innerHTML === "") {
          // store listener for later removal
          listeners[i] = clickSquare(i);
          //listeners[allSquares[i].id] = clickSquare(i);
          // set up a click event for each square
          allSquares[i].addEventListener('click', listeners[i]);
            //allSquares[i].addEventListener('click', listeners[allSquares[i].id]);
        }
      }
  }

  function computerPlay(player){
    //wait one second before computer plays, nicer effect
    setTimeout(function(){
    let computer;
    let markedSquares = [];
    let found = 0;
    if(player === 'X'){
      computer = 'O';
    } else {
      computer = 'X';
    }
      //prevent player from winning if two marks already on winning row
    if (computerMarker(computer, player, 'save')){
      return;
      // try to win by looking for 2 computer marks on winning row
    } else if(computerMarker(computer, player, 'win')){

      return;
    } else  {
      // put mark in best position for win next go
      var idToMarkComp = checkForOne(computer);
      var idToMarkPly = checkForOne(player);
      if(idToMarkComp){
        document.getElementById(idToMarkComp).innerHTML = computer;
        squares = remove(squares,idToMarkComp);
        --gameState;
        return;
      } else if(idToMarkPly){
          document.getElementById(idToMarkPly).innerHTML = computer;
          squares = remove(squares,idToMarkPly);
          --gameState;
          return;
        }

      else {
        if(squares.lenght != 0 && gameState != 0){
        var item = squares[Math.floor(Math.random()*squares.length)];
        document.getElementById(item).innerHTML = computer;
        --gameState;
        }
      }
      return;
    }

    function computerMarkWIn(mark, arr) {
      // return id to mark for computer win
      winningRows.forEach(function(row){
        if(row.filter(function(el){
          return document.getElementById(el).innerHTML === mark}).length === 2) {
            var id = row.filter(function(el){ return document.getElementById(el).innerHTML === ''})
            if(id.length === 1) {
              return id;
            }
          }
      });

    }

    //Find out where to mark
    function computerMarker(computer, player, check){
      var checkMark =''
      var markSaved = 0;
      found = 0;
      if(check === 'win'){
        checkMark = computer;
      } else {
        checkMark = player;
      }
      for(var j = 0; j < winningRows.length; j++){
        let counter= 0;
        markedSquares.sort();
        if(found === 1){
          // markedSquares has 2 id's, mark the third missing one
          if(markedSquares[0] != 0){
            var id = winningRows[j-1][0];
            if(document.getElementById(id).innerHTML ==='') {
              document.getElementById(id).innerHTML = computer;
              squares = remove(squares,id);
              --gameState;
              markedSquares = [];
              if(check === "win"){
                win = 1;
              }
              if(check === "save"){
                markSaved = 1;
              }
              //return true;
            }
          } else if (markedSquares[1] != 1) {
            var id = winningRows[j-1][1];
            if(document.getElementById(id).innerHTML === '') {
              document.getElementById(id).innerHTML = computer;
              squares = remove(squares,id);
              --gameState;
              markedSquares = [];
              if(check === "win"){
                win = 1;
              }
              if(check === "save"){
                markSaved = 1;
              }
              //return true;
            }
          } else {
            var id = winningRows[j-1][2];
            if(document.getElementById(id).innerHTML === ''){
              document.getElementById(id).innerHTML = computer;
              squares = remove(squares,id);
              --gameState;
              markedSquares = [];
              if(check === "win"){
                win = 1;
              }
              if(check === "save"){
                markSaved = 1;
              }
              //return true;
            }
          }
          markedSquares = [];
          if(win === 1){
            checkForWin(computer);
            document.getElementById('message').innerHTML= "Computer Wins!";

            return true;
          }
          // check for save and no win
          if(check === 'save' && markSaved === 1){
            return true;
          }
          // check for draw
          if(win === 0 && gameState === 0){
            document.getElementById('message').innerHTML= "It's a Draw";
            return;
          }
          return false;
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
    }, 1000);
  }
