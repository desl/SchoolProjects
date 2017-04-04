window.onload = function(){

    var xAxis = 12;
    var yAxis = 12;
    var numMines = 15;
    var minesArr = [];
    var minesObj = {};
    var boardArr = [];
    var viewedCounter = 0;
    var totalSquares = xAxis * yAxis;

    drawBoard(10,10,5);

    var boardDiv = document.getElementById("gameBoard");


    boardDiv.addEventListener("contextmenu", function(event){
        var clickX = parseInt(event.target.id);
        var clickY = parseInt(event.target.id.substr(event.target.id.indexOf(",") + 1));
        console.log("bomb in", clickX, clickY);
    });

    boardDiv.addEventListener("click", function(event){
        var clickX = parseInt(event.target.id);
        var clickY = parseInt(event.target.id.substr(event.target.id.indexOf(",") + 1));
        console.log("which button", event.which);
        //console.log(clickX,clickY, isMine(clickX,clickY));
        //console.log(countMines(clickX, clickY));
        // If it's a mine, explode. lose game.
        if (isMine(clickX, clickY)){
            alert("Mine Exploded. you lose");
        } else {
            var howMany = countMines(clickX,clickY);
            if (howMany === 0){
                // If it's a zero, expose all squares adjacent
                for (var i = clickX -1; i< clickX+2; i++){
                    for (var j = clickY -1; j < clickY+2; j++){
                        if(!(i<0 || i > xAxis-1 || j<0 || j > yAxis-1 )){
                            exposeSquare(i,j);
                        }
                    }
                }
            } else{ 
                // if it's a number, expose just that square.
                console.log("exposing",clickX,clickY);
                exposeSquare(clickX, clickY);  
            }

           // if all squares but bombs are exposed, game win  
        }

    });

    function drawBoard(){
        var boardDiv = document.getElementById("gameBoard");

        for (var i = 0; i < xAxis; i++){
            boardArr.push([]);
            var row = document.createElement("div");
            row.class = "row";
            row.id = i+"row";
            boardDiv.appendChild(row);

            for (var j = 0; j < yAxis; j++){
                 boardArr[i].push("");
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
                square.style.background = "gray";
                //square.style.background="blue";

                row.appendChild(square);

            }
        }
        //console.log(boardArr);
        plantMines();
        processBoard();
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
            //minesArr.push([xMine, yMine]);
            boardArr[xMine][yMine] = "B";
            //console.log(minesArr);
            var mine = document.getElementById(xMine+','+yMine);
            mine.innerText="B";
            //mine.style.color="red";
        }
        for (var i=0;i<numMines;i++){
            //console.log(minesArr[i]);
        }

    }

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

    function isMine(x,y){
        //console.log(minesArr.indexOf([x,y]));
        if (boardArr[x][y] === "B"){
            return true;
        }
        return false;

    }
}