
window.onload = function(){

    var xAxis = 12;
    var yAxis = 12;
    var numMines = 15;
    var minesArr = [];
    var minesObj = {};
    var boardArr = [];
    var xQ = [];
    var yQ = [];
    var viewedCounter = 0;
    var totalSquares = xAxis * yAxis;

    var resetButton = document.getElementById("resetGame");
    resetButton.addEventListener("click",function(event){
        drawBoard();
    })

    drawBoard(10,10,5);

    var boardDiv = document.getElementById("gameBoard");

    boardDiv.addEventListener("contextmenu", function(event){
        event.preventDefault();
        console.log(event);
        var clickX = parseInt(event.target.id);
        var clickY = parseInt(event.target.id.substr(event.target.id.indexOf(",") + 1));
        console.log("bomb in", clickX, clickY);
    }, true);

    boardDiv.addEventListener("click", function(event){
        var clickX = parseInt(event.target.id);
        var clickY = parseInt(event.target.id.substr(event.target.id.indexOf(",") + 1));
        exposeSquares(clickX,clickY);
        //console.log("which button:", event.which);
    });

    function countMines(x,y){
        var counter = 0;
        for (var i=x-1; i < x+2; i++){
            for (var j=y-1; j< y+2; j++){
                if (!(i === x && j === y)){
                    if (!(i < 0 || i > xAxis-1 || j <0 || j > yAxis-1)){
                        if (isMine(i,j)){
                        counter ++;
                        } 
                    }
                    
                }
                
            }
        }
        return counter;
    }

    function drawBoard(){
        var boardDiv = document.getElementById("gameBoard");
        // Delete all Children useful for resetting the board
        while (boardDiv.firstChild){
            boardDiv.removeChild(boardDiv.firstChild);
        }

        boardArr = [];

        for (var i = 0; i < xAxis; i++){
            boardArr.push([]);
            var row = document.createElement("div");
            row.class = "row";
            row.id = i+"row";
            boardDiv.appendChild(row);

            for (var j = 0; j < yAxis; j++){
                 boardArr[i].push("");
                 //boardArr[i][j] = "";
                // write numbers out in rows
                var square = document.createElement("div");
                square.innerText = i + "," + j;
                square.id = i + "," + j;
                square.style.display = "inline-block";
                square.style.color = "gray";
                square.style.border="3px solid #000000"
                square.style.height= "25px";
                square.style.width= "25px";
                square.style.padding="1px";
                square.style.textAlign = "center";
                //square.style.background = "gray";
                square.classList.add("hidden");
                //square.style.background="blue";
                row.appendChild(square);
            }
        }
        plantMines();
        processBoard();
        //console.log(boardArr);
    }

    function exposeSquares(x,y){
        xQ.push(x);
        yQ.push(y);

        while (xQ.length > 0){
            var xx = xQ.shift();
            var yy = yQ.shift();


            var square = document.getElementById(xx + ',' + yy);

            // if square is already exposed, do nothing.
            // Or if square is a marked bomb, do nothing.
            if (square.className === "revealed" && square.className === "marked"){
                return true;
            }

            // If the square you just clicked on is a bomb, you lose.
            if (square.className === "hidden bomb"){
                // lose the game.
                alert("You Lose!");
                return true;
            }

            // Only remaining scenario is "hidden". None the less, let's assert that.
            if (square.className === "hidden"){
                // reveal the square.
                square.classList.remove("hidden");
                square.classList.add("revealed");
                square.innerText = countMines(xx,yy);

                if (square.innerText === "0"){
                    // if surrounding squares are valid, add them to the queue
                    // probably nested for loops.
                    for (var i = xx-1; i<xx+2; i++){
                        for (var j = yy-1; j<yy+2; j++){
                            if (!(i < 0 || j < 0 || i > xAxis-1 || j > yAxis-1 || (i === xx && j === yy))){
                                //console.log("popping",i,j, xx, yy);
                                xQ.push(i);
                                yQ.push(j);
                            }
                        }
                    }
                }
            }

            // calculate to see if the game has been won!
            // if the game is won, win
            if (numMines === totalSquares - document.querySelectorAll(".revealed").length){
                // clear the queue for processing, otherwise you win multiple times. AWKWARD!
                xQ = [];
                yQ = [];
                alert("Win!");
            }
        }
    }

    function exposeSquare(x,y){
        var square = document.getElementById(x + ',' + y);
        if (square.style.color !== "blue"){
            viewedCounter ++;
            square.style.color = "blue";
            square.style.background = "white";
        }
        if (viewedCounter + numMines === totalSquares){
            alert("win!");
        }
    }

    function processBoard(){
        for (var i=0;i<xAxis;i++){
            for (var j=0; j<yAxis; j++){
                // if It's a mine, keep the value at "B", otherwise no change needed;
                if (!isMine(i,j)){
                    var howMany = countMines(i,j);
                    var square = document.getElementById(i + "," + j);
                    square.innerText = howMany;
                }
            }
        }
    }

    function plantMines(){
        minesArr = [];
        for (var i =0; i < numMines; i++){
            //console.log(parseInt(Math.random()*xAxis), parseInt(Math.random()*yAxis));
            var xMine = parseInt(Math.random()*xAxis);
            var yMine = parseInt(Math.random()*yAxis);
            boardArr[xMine][yMine] = "B";
            var mine = document.getElementById(xMine+','+yMine);
            mine.classList.add("bomb");
            mine.innerText="B";
        }
    }

    function isMine(x,y){
        if (boardArr[x][y] === "B"){
            return true;
        }
        if (document.getElementById(x + "," + y).className === "bomb"){
            return true;
        }
        return false;

    }
}