'use-strict';

const gameTable = document.querySelector('#gameTable');

createGame();

function createGame(){

    gameTable.innerHTML = "";
    for (let i=0; i < 10; i++){
        let row = gameTable.insertRow(i);
        for (let j = 0; j < 10; j++) {
            let cell = row.insertCell(j);
            cell.setAttribute("class", "btn btn-default")
            cell.addEventListener("click",function() {clickButton(this);});
            cell.innerHTML='&nbsp&nbsp';
            let mine = document.createAttribute("data-mine");
            mine.value= "false";
             cell.setAttributeNode(mine);
        }
    }    
    addMines();
}

function addMines(){
    let mines = 0;

    while (mines < 20) {
        let row = Math.floor(Math.random() *10);
        let col = Math.floor(Math.random() *10);
        let cell = gameTable.rows[row].cells[col];
        if (cell.getAttribute("data-mine") == "true"){
            continue;
        }
        else{
            cell.setAttribute("data-mine", "true");
            mines++;
        }

    }
}

function clickButton(currentBtn){
    if (currentBtn.getAttribute("data-mine") == "true" ){
        alert("Game Over", showMines());

        for (let i=0; i < 10; i++){
            for (let j = 0; j < 10; j++) {
                let cell = gameTable.rows[i].cells[j];      
                
                // have to delete eventlistener after losing to stop being able to play, following line not works properly
                // cell.removeEventListener("click", clickButton);
            }
        }
    }
    else {
        currentBtn.setAttribute("class", "btn btn-info");
        let mineCount = 0;
        let currentBtnRow = currentBtn.parentNode.rowIndex;
        let currentBtnCol = currentBtn.cellIndex;

        for (let i = Math.max(currentBtnRow-1,0); i <= Math.min(currentBtnRow+1, 9); i++){
            for (let j = Math.max(currentBtnCol-1,0); j <= Math.min(currentBtnCol+1, 9); j++){
                if (gameTable.rows[i].cells[j].getAttribute("data-mine") == "true"){
                    mineCount++;
                }
            }
        }
        currentBtn.innerHTML=mineCount;
        
       if(mineCount == 0){
            for (let i = Math.max(currentBtnRow-1,0); i <= Math.min(currentBtnRow+1, 9); i++){
                for (let j = Math.max(currentBtnCol-1,0); j <= Math.min(currentBtnCol+1, 9); j++){
                    if (gameTable.rows[i].cells[j].innerHTML == '&nbsp;&nbsp;') {
                        clickButton(gameTable.rows[i].cells[j]);
                    }
                }
            }
        }
    }
}

function showMines(){
    for (let i = 0; i < 10 ; i++){
        for (let j = 0; j < 10 ; j++){
            if (gameTable.rows[i].cells[j].getAttribute("data-mine") == "true"){
                gameTable.rows[i].cells[j].setAttribute("class", "btn btn-danger");
            }
        }
    }    
}