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
  // array to keep track of what squares are empty
  var squares = ['row1col1','row1col2','row1col3','row2col1','row2col2','row2col3','row3col1','row3col2','row3col3'];
  //get all square elements
  var allSquares = document.querySelectorAll(".square");
  // keep track of win
  var win = 0;

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
function clickSquare(){
  var num = i;
  return function() {
      document.getElementById(allSquares[num].getAttribute('id')).innerHTML=player;
      var nextId = allSquares[num].getAttribute('id');
      squares = remove(squares,nextId);
      squareState[nextId] = player;
      --gameState;
      // check for win here
      checkForWin(player)
      // check for draw
      if(gameState === 0){
        document.getElementById('message').innerHTML= "It's a Draw";
      }
      // computers turn
      computerPlay(player);
      checkForWin(computer);
      //message player its their turn
      messagePlayer('Your');

      if(win = 1){
        //removeClickEvents();
        return;
      }
  }
}

function removeClickEvents(){
  for (let i = 0; i < allSquares.length; i++) {
    document.getElementById(allSquares[i].getAttribute('id')).removeEventListener('click', clickSquare());
  }
}

// loop through each square adding click event if empty
function setupPlayer(player){
  var squareState = {};
  for (i = 0; i < allSquares.length; i++) {
      if(allSquares[i].innerHTML === "") {
        // set up a click event for each square
         document.getElementById(allSquares[i].getAttribute('id')).addEventListener('click', (clickSquare
        // function(){
        //   var num = i;
        //   return function() {
        //       document.getElementById(allSquares[num].getAttribute('id')).innerHTML=player;
        //       var nextId = allSquares[num].getAttribute('id');
        //       squares = remove(squares,nextId);
        //       squareState[nextId] = player;
        //       --gameState;
        //       // check for win here
        //       checkForWin(player)
        //       // check for draw
        //       if(gameState === 0){
        //         document.getElementById('message').innerHTML= "It's a Draw";
        //       }
        //       // computers turn
        //       computerPlay(player);
        //       checkForWin(computer);
        //       //message player its their turn
        //       messagePlayer('Your');
        //       if(win = 1) return;
        //   }
        //  }
       )());
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
  // try to win by looking for 2 computer marks on winning row
  if (computerMarker(computer, player, 'win')){
    return;
    //prevent player from winning if two marks already on winning row
  }else if(computerMarker(computer, player, 'save')) {
    return;
  } else  {
    // put mark in best position for win next go
    var idToMarkComp = checkForOne(computer);
    var idToMarkPly = checkForOne(player);
    if(idToMarkComp){
      document.getElementById(idToMarkComp).innerHTML = computer;
      squares = remove(squares,idToMarkComp);
      return;
    } else if(idToMarkPly){
        document.getElementById(idToMarkPly).innerHTML = computer;
        squares = remove(squares,idToMarkPly);
        return;
      }

    else {
      if(squares.lenght != 0){
      var item = squares[Math.floor(Math.random()*squares.length)];
      document.getElementById(item).innerHTML = computer;
      }
    }
    return;
  }
  //Find out where to mark
  function computerMarker(computer, player, check){
    var checkMark =''
    found = 0;
    // if 3rd arg is win then computer tries to win
    // if(check = 'win'){
    //   checkMark = computer;
    // } else checkMark = player;
    if(arguments[2] === 'win'){
      checkMark = computer;
    }
    // if arg 3 is save then computer tries to stop player winning
    if(arguments[2] === 'save'){
      checkMark = player;
    }
    for(var j = 0; j < winningRows.length; j++){
      let counter= 0;
      markedSquares.sort();
      if(found === 1){
        // markedSquares has 2 id's, mark the third missing one and return
        if(markedSquares[0] != 0){
          var id = winningRows[j-1][0];
          if(document.getElementById(id).innerHTML ===''){
          document.getElementById(id).innerHTML = computer;
          squares = remove(squares,id);
          markedSquares = [];
           return true;
          }
        }else if (markedSquares[1] != 1){
          var id = winningRows[j-1][1];
          if(document.getElementById(id).innerHTML === ''){
          document.getElementById(id).innerHTML = computer;
          squares = remove(squares,id);
          markedSquares = [];
           return true;
          }
        } else {
          var id = winningRows[j-1][2];
          if(document.getElementById(id).innerHTML === ''){
          document.getElementById(id).innerHTML = computer;
          squares = remove(squares,id);
          markedSquares = [];
           return true;
          }
        }
        // for(let i = 0; i < winningRows[j-1].length; i++){
        //   document.getElementById(winningRows[j-1][i]).style.color = 'green';
        //}
        markedSquares = [];
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
}// end of computerPlay()
for (var square in squareState) {
  if (object.hasOwnProperty(square)) {
    if(squareState[square] === 'X'){}
  }
}

function checkForWin(player) {
  // var win = 0;
  var greenIds = [];
  //check each winning combo
  //winningRows.forEach(function(winningRow){
  for(var i = 0; i < winningRows.length; i++){
    if(greenIds.length === 3){
      win = 1;
      for(var j = 0; j < 3; j++){
        document.getElementById(greenIds[j]).style.color = 'green';
      }
      break;
    }
    greenIds = [];
    win = 0;
    for(let k = 0; k < 3; k++){
      // look for player mark in winningrow combos
      if( player === document.getElementById(winningRows[i][k]).innerHTML){
        greenIds.push(winningRows[i][k]);
      }
      //return player === document.getElementById(square).innerHTML;

    }

  //});
}
  // if(win === 1){
  //   return true;
  // }
  if(win === 1){
    document.getElementById("yourTurn").innerHTML = 'We have a winner';
    removeClickEvents();
    return;
  }
}



function checkForOne(player) {
  for(let i = 0; i < winningRows.length; i++){
    var row = winningRows[i];
    var twoEmpty = 0;
    var emptySlots = [];
    var haveOne = 0;
    for (let j = 0; j < row.length; j++){
      if(document.getElementById(row[j]).innerHTML === '' ){
        ++twoEmpty;
        emptySlots.push(row[j]);
      }
      else if(document.getElementById(row[j]).innerHTML === player ){
        ++haveOne;
      }
    }
    if(twoEmpty === 2 && haveOne === 1){
       var item = emptySlots[Math.floor(Math.random()*emptySlots.length)];
      // document.getElementById(item).innerHTML = player;
       squares = remove(squares,item);
      return item;
    }
  }


}


//Change the message
function messagePlayer (player) {
  document.getElementById("yourTurn").innerHTML = player + 'turn';
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
  win = 0;
  clearSquares();
}
function remove(array, element) {
    return array.filter(e => e !== element);
}
});