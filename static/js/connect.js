// Aiden Hoopes, Karthik Thota, Justin Barros
var tokens = 0;// Total tokens on the board
var playing = true;
var won = false;// If someone has won this is true
var winnermessage = false;// After someone has won, this gets set
var maxHeight = 6;// Height of the gameboard. Default: 6
var maxWidth  = 7;// Number of buttons along the bottom.
var columns = gameArray(maxWidth, maxHeight);// Virtual representation of board
var aimove = [0,0,''];// [# of matches, position, button type l/r/b]

class Move {
  constructor(matches, index, type) {
    this.matches = matches; // How many tokens in a row this move netted.
    this.index   = index;   // Which button index was pressed
    this.type    = type;    // Which set of buttons was pressed. Left/Right/Bottom
  }
}

// First thing that runs, this creates the buttons around the board.
$(document).ready(function() {
    for (var i = 0; i < maxWidth; i++) {
        $('.game').append($('<div/>', {
            class: 'column', id: 'col' + i
        }))
    }

    for (var i = 0; i < maxWidth; i++) {
        $('.bottom').append($('<div/>', {
            class: 'button', id: 'b' + i
        }))
    }

    for (var i = 0; i < maxHeight; i++) {
        $('.leftclicker').append($('<div/>', {
            class: 'lbutton', id: 'lb' + i
        }))
    }

    for (var i = 0; i < maxHeight; i++) {
        $('.rightclicker').append($('<div/>', {
            class: 'rbutton', id: 'rb' + i
        }))
    }

    $(".button, .lbutton,  .rbutton").mouseenter(function() {
        $(this).addClass("green");
    });

    $(".button, .lbutton, .rbutton").mouseleave(function() {
        $(this).removeClass("green");
    });

    $(".btn-group").click(restartgame);
});

// Initializes the virtual representation of the board. A 2D array.
function gameArray(cols, height) {
    var columns = [];
    for(var i = 0; i < cols; i++){
      columns.push([]);
      for(var j = 0; j < height; j++)
        columns[i].push(0);
    }
    return columns;
}

// A debug function that logs the board to the console.
function printboard(){
  var fullstring= "";
  for(var i = maxHeight - 1; i >= 0; i--){
    var astring="";
    for(var j = 0; j < columns.length; j++){
      var spot = columns[j][i];
      spot == undefined ? astring += "|x| " : astring += "|" + spot + "| ";
    }
    fullstring += astring + "\n";
  }
    console.log(fullstring);
}

// Helper for winner(). Checks what type of token is on a board
var check = function(type, x, y, colly) {
    if( (x < 0) || (x > colly.length-1) ){return false; console.log("Check(): x axis error")}
    if( (y < 0) || (y > maxHeight - 1) ){return false; console.log("Check(): y axis error")}
    if( colly[x].length < (y + 1) ){return false; console.log("Check(): length error")}
    return (colly[x][y] === type);
};

// Winner function that checks all 8 directions for 4 matches
var winner = function(type, x, y, columns1) {
    var matches = temp = 0;//Temp stores the max number of matches
    for(var i=1; i < 4; i++) if(check(type, x-i, y,columns1)) matches++;
      else break;
    for(var i=1; i < 4; i++) if(check(type, x+i, y,columns1)) matches++;
      else break;
    if(matches > 2) return [true,4]; else{if(matches > temp) temp = matches; matches = 0;}

    for(var i=1; i < 4; i++) if(check(type, x, y-i,columns1)) matches++;
      else break;
    for(var i=1; i < 4; i++) if(check(type, x, y+i,columns1)) matches++;
      else break;
    if(matches > 2) return [true,4]; else{if(matches > temp) temp = matches; matches = 0;}

    for(var i=1; i < 4; i++) if(check(type, x-i, y-i,columns1)) matches++;
      else break;
    for(var i=1; i < 4; i++) if(check(type, x+i, y+i,columns1)) matches++;
      else break;
    if(matches > 2) return [true,4]; else{if(matches > temp) temp = matches; matches = 0;}

    for(var i=1; i < 4; i++) if(check(type, x+i, y-i,columns1)) matches++;
      else break;
    for(var i=1; i < 4; i++) if(check(type, x-i, y+i,columns1)) matches++;
      else break;
    if(matches > 2) return [true,4]; else{if(matches > temp) temp = matches; matches = 0;}

    return [false, temp+1];//Return false if no winner
};

// Plays an AI move and records its position in aimove.
function AIstart(){
  aimove = [0,0,''];
  if(tokens % 2 == 1) aimove = AImove();
}

// Display a winning message after someone has won
function winMessage(){
  if(winnermessage){
    (tokens%2==0) ? name = "Blue" : name = "Red";
    alert(name + " player wins!");
    winnermessage = false;
  }
}

// Turns off the game after someone has won.
function win(){
  if(won){
    var name = '';
    winMessage();
    winnermessage = true;
    playing = false;
    won = false;
  }
}

// Checks if the game has come to a draw/tie.
var isDraw = function() {
  //Check if every outer perimeter spot is filled
  //This will also find if every spot is filled
  for(var q = 0; q < columns.length; q++){
    if(columns[q][maxHeight -1] == 0) return false;
    else continue;
  }
  if($.inArray(0, columns[0]) < 0 &&
     $.inArray(0, columns[columns.length -1]) < 0)
    return true;

  return false;
};

// These move functions are for the three types of buttons
// They find the correct position where the token should land
// Returns -1 if the row/column is full. else it returns where it landed
var bottomMove = function(columns1, type, row){
  if(columns1[row][maxHeight-1] != 0) return -1;
  for(var i = maxHeight -1; i >= 0; i--){
    if(columns1[row][i] == 0) continue;
    else break;
  }
  columns1[row][i+1] = type;
  return i+1;
}

var leftMove = function(columns1, type, row){
  if(columns1[0][row] != 0) return -1;
  for(var i = 0; i < columns1.length; i++){
    if(columns1[i][row] == 0) continue;
    else break;
  }
  columns1[i-1][row] = type;
  return i-1;
}

var rightMove = function(columns1, type, row){
  if(columns1[columns1.length-1][row] != 0) return -1;
  for(var i = columns1.length-1; i >= 0; i--){
    if(columns1[i][row] == 0) continue;
    else break;
  }
  columns1[i+1][row] = type;
  return i+1;
}

// Places the token, checks for winner, switches players
var updateGame = function(index, buttontype) {
    if(!playing) return false;
    tokens++;
    var type = (tokens % 2)+1;
    var y=-1;
    var x=-1;
    switch(buttontype){
      case 'r': if( (x = rightMove(columns,type,index)) < 0) return false; y = index; break;
      case 'l': if( (x = leftMove(columns,type,index))  < 0) return false; y = index; break;
      case 'b': if( (y = bottomMove(columns,type,index))< 0) return false; x = index; break;
      default: console.log("updateGame(): Wrong button type");
    }
    if(x == -1 || y == -1) return false;//Something went wrong if this happens
    var result = winner(type,x,y, columns);
    if(result[0]==true) {
      won = true;
    }
    return true;
};

// AI version of updateGame. It makes a dummy copy of the board
// and plays on that.
var AIupdateGame = function(index, buttontype, type) {
    if(!playing) return [false,0];
    var y=-1;
    var x=-1;
    var copy = JSON.parse(JSON.stringify(columns));//Make a test copy of the board
    switch(buttontype){
      case 'r': if( (x = rightMove(copy,type,index)) < 0) return [false,0]; y = index; break;
      case 'l': if( (x = leftMove(copy,type,index))  < 0) return [false,0]; y = index; break;
      case 'b': if( (y = bottomMove(copy,type,index))< 0) return [false,0]; x = index; break;
      default: console.log("AIupdateGame(): Wrong button type");
    }
    if(x == -1 || y == -1) return [false,0];//Something went wrong if this happens
    var result = winner(type,x,y, copy);

    return result;
};

// This function goes through each move and selects the best one
// It first checks if the enemy can win, then if it can win, then the move with most matches
var AImove = function(){
  var left = new Array(6);
  var right = new Array(6);
  var bottom = new Array(7);
  var leftresult; var rightresult; var bottomresult;
  var leftresult1;var rightresult1;var bottomresult1;
  var high = [0,0,'']; // [Matches, Index, Buttontype]
  var i = 0;

  // Check if AI can win (highest priority)
  for (i=0; i< left.length; i++){
    leftresult1 =  AIupdateGame(i,'l',1);// The 1 means the AI is trying its own moves
    if(leftresult1[0]) return [4,i,'l'];
    rightresult1 =  AIupdateGame(i,'r',1);
    if(rightresult1[0]) return [4,i,'r'];
    bottomresult1 =  AIupdateGame(i,'b',1);
    if(bottomresult1[0]) return [4,i,'b'];
  }

  // Check if player can win and block it
  for(i=0; i < left.length; i++){
    leftresult =  AIupdateGame(i,'l',2);// This returns a [Bool,Int]
    if(leftresult[0]) return [4,i,'l'];
    rightresult=  AIupdateGame(i,'r',2);
    if(rightresult[0]) return [4,i,'r'];
    bottomresult= AIupdateGame(i,'b',2);
    if(bottomresult[0]) return [4,i,'b'];
  }

  // Check if player can get 3 in a row
  for(i=0; i < left.length; i++){
    leftresult =  AIupdateGame(i,'l',2);// This returns a [Bool,Int]
    if(leftresult[1] > 2) return [4,i,'l'];
    rightresult=  AIupdateGame(i,'r',2);
    if(rightresult[1] > 2) return [4,i,'r'];
    bottomresult= AIupdateGame(i,'b',2);
    if(bottomresult[1] > 2) return [4,i,'b'];
  }

  // Else, pick a move that gives the most matches
  for(var i=0; i < left.length; i++){
    leftresult =  AIupdateGame(i,'l',1);// This returns a [Bool,Int]
    rightresult=  AIupdateGame(i,'r',1);
    bottomresult= AIupdateGame(i,'b',1);
    left[i] = leftresult[1];
    right[i] = rightresult[1];
    bottom[i]= bottomresult[1];

    var l = left[i]; var r = right[i]; var b = bottom[i];
    var t = ''; var tnum = 0;
    if(l >= r){t = 'l';tnum=l;} else{t = 'r';tnum=r;}
    if(b > tnum){t = 'b';tnum = b;}
    if(tnum > high[0]) high = [tnum, i, t];
  }

  bottomresult = AIupdateGame(i,'b',1);
  bottom[i] = bottomresult[1];
  if(bottom[i] > high) high = [bottom[i],i,'b'];

  return high;
}

// Main function where it all starts with the click of a button
$(document).ready(function() {
    $(".columncontainer , .button , .lbutton , .rbutton , .column").click(function() {
        if(!playing) return;
        var column = $(this).attr("id");
        var type = column[0];
        var col = column[column.length -1];//Get the column number at end of id. Single digit
        //The row numbers are swapped for left/right buttons but normal for bottom
        var index = (type == 'b') ? parseInt(col) : (maxHeight -1 - parseInt(col));

        if(!updateGame(index, type)){//This is where the human player move starts
          tokens--;//It was a blocked move
          return;
        }

        var promy = new Promise(function(resolve, reject) {
          animate(index,type);
          win();
          resolve();
        });

        promy.then(function(){
          if(!playing) return;
          index = aimove[1];//Get the AI's move choices...
          type = aimove[2];//...

          //Wait for our animation to finish before playing the AI move
          setTimeout(function(){
            if(!playing) return;
            updateGame(index, type);
            win();
            animate(index,type);
          }, 300);//300 milliseconds is the animation time of coin dropping
        });

        if( isDraw() ){// Check if that game has come to a draw/tie.
          $("#score").text("Draw!");
          playing = false;
          alert("It's a draw");
        }
        if(!playing) return;
    });
});

function animate(index, type){
  var p = tokens%2 ? "player2" : "player1";
  var newToken = "<div class=\"token " + p + "\"></div>";
  var i; var y; var droplength;
  var col;
  (type == 'b') ? col = index.toString() : col = (maxHeight - 1 - index).toString();

  switch(type){//Animation switch... It's ugly, I know. 3 cases for b/l/r.
    case 'b':
      for(i = maxHeight -1; i >= 0; i--){
        if(columns[index][i] == 0) continue;
        else break;
      }
      droplength = (maxHeight + 0.15 - i-1) * 58 -5;
      var sel = '#col' + col;
      var colly = $(sel);
      colly.prepend(newToken);
      y = colly.children(".token:first-child").position().top;
      colly.children(".token:first-child").css("top", y);
      colly.children(".token:first-child").animate({top:"+="+droplength+"px"},{duration:300, complete: winMessage});
      break;

    case 'l':
      for(i = 0; i < columns.length; i++){
        if(columns[i][index] == 0) continue;
        else break;
      }
      droplength = (columns.length + .3 + i-5) * 68 -105;//Works initially: (columns.length + .6 + i-5) * 58;
      var lb = $('#lb' + col);
      $(lb).prepend(newToken);
      y = $(lb).children(".token:first-child").position().left;
      $(lb).children(".token:first-child").css("left", y).css("margin-left","5px").css("margin-right","5px");
      $(lb).children(".token:first-child").animate({left:"+="+droplength+"px"},{duration:300, complete: winMessage});
      break;

    case 'r':
      for(i = columns.length-1; i >= 0; i--){
        if(columns[i][index] == 0) continue;
        else break;
      }
      droplength = ((columns.length + .3 + (columns.length -1 -i)-5) * 68 -79)*-1;//Magic pixel length
      var rb = $('#rb'+col);
      $(rb).prepend(newToken);
      y = $(rb).children(".token:first-child").position().left;
      $(rb).children(".token:first-child").css("left", y).css("margin-left","5px").css("margin-right","5px");
      $(rb).children(".token:first-child").animate({left:"+="+droplength+"px"},{duration:300, complete: winMessage});
      break;
  }
  var prom = new Promise(AIstart);
  return prom;
}

function restartgame(){
    window.location.reload();
};

