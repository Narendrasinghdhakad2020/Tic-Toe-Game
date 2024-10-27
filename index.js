const gameInfo=document.querySelector(".gameInfo");
const boxes=document.querySelectorAll(".box");
const newGamebutn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//creating a function too initialize the game

function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        //reinitializing the css properties for boxes
        box.classList=`box box${index}`;
    });
    newGamebutn.classList.remove("active");
    
    gameInfo.innerText=`Playing Player - ${currentPlayer}`;
}
initGame();

function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X"
    }
    gameInfo.innerText=`Playing Player - ${currentPlayer}`;
}

//creating check function
function checkGameOver(){
    let ans="";
     winningPosition.forEach((position)=>{
        if( (gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="") 
        && (gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]])){

            if(gameGrid[position[0]]==="X"){
                ans="X";
            }
            else{
                ans ="O";
            }
            //disabling pointerr event
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");


        }
     });

     if(ans!==""){
        gameInfo.innerText=`Winner Player -${ans}`;
        newGamebutn.classList.add("active");
        
     }

     //checking for tied condition
     else{
     let fillCount=0;
     gameGrid.forEach((box)=>{
        if(box!==""){
            fillCount++;
        }
     });
     
     if(fillCount===9){
        gameInfo.innerText="Game Tied!";
        newGamebutn.classList.add("active");
     }
    }
    
}
function handleClick(index){
    if( gameGrid[index] === "" ){
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents="none";
        
        swapTurn();

        checkGameOver();
    }
}
boxes.forEach( (box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

//newgamebutton functioning

newGamebutn.addEventListener('click',initGame);
