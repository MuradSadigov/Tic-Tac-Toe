"use strict";
//Variables
let grid = ["", "", "", "", "", "", "", "", ""];
let scoreX = 0;
let scoreO = 0;
let isGameOver = false;
let isSign = true;

const reset_button = document.querySelector(".reset");
const boxes = document.getElementsByClassName("box");
const turn = document.querySelector(".turn");
const xScore = document.querySelector(".X-player");
const oScore = document.querySelector(".O-player");
const mainGameBoard = document.querySelector(".main");
const start = document.querySelector(".start");
const start_button = document.querySelector(".start-button");
const nextRound = document.querySelector(".next-round");
const x_Win = document.querySelector(".x-win");
const o_Win = document.querySelector(".o-win");
const draw_button = document.querySelector(".draw");

//Event Listeners
reset_button.addEventListener("click", reset);
start_button.addEventListener("click", startBT);
nextRound.addEventListener("click", nextR);
x_Win.addEventListener("click", exit);
o_Win.addEventListener("click", exit);
draw_button.addEventListener("click", exit);

for (let i = 0; i < boxes.length; i++)
{
    boxes[i].addEventListener("click", main);
}

//Functions

function exit()
{
    draw_button.style.display = "none";
    o_Win.style.display = "none";
    x_Win.style.display = "none";
    nextR();
}

function drawFun()
{
    draw_button.style.display = "flex";
}

function oWin()
{
    o_Win.style.display = "flex";
}

function xWin()
{
    x_Win.style.display = "flex";
}

function nextR()
{
    isGameOver = false;
    isSign = true;
    grid = ["", "", "", "", "", "", "", "", ""];
    display();
}

function startBT()
{
    start.style.display = "none";
    mainGameBoard.style.display = "flex";
}


function reset()
{
    grid = ["", "", "", "", "", "", "", "", ""];
    scoreX = 0;
    scoreO = 0;
    isGameOver = false;
    isSign = true;
    display();
}

function sign(e)
{
    let index = parseInt(e.target.className[4]);
    if(isSign === true && grid[index] === "")
    {
        isSign = false;
        grid[index] = "x";
    }
    else if(isSign === false && grid[index] === "")
    {
        isSign = true;
        grid[index] = "o";
    }
}

function gameBrain()
{
    if( isGameOver === false &&
        (grid[0] === "x" && grid[1] === "x" && grid[2] === "x")
        ||
        (grid[3] === "x" && grid[4] === "x" && grid[5] === "x")
        ||
        (grid[6] === "x" && grid[7] === "x" && grid[8] === "x")
        ||
        (grid[0] === "x" && grid[3] === "x" && grid[6] === "x")
        ||
        (grid[1] === "x" && grid[4] === "x" && grid[7] === "x")
        ||
        (grid[2] === "x" && grid[5] === "x" && grid[8] === "x")
        ||
        (grid[0] === "x" && grid[4] === "x" && grid[8] === "x")
        ||
        (grid[2] === "x" && grid[4] === "x" && grid[6] === "x")

    )
    {
        scoreX++;
        isGameOver = true;
        xWin();
    }
    else if( isGameOver === false &&
        (grid[0] === "o" && grid[1] === "o" && grid[2] === "o")
        ||
        (grid[3] === "o" && grid[4] === "o" && grid[5] === "o")
        ||
        (grid[6] === "o" && grid[7] === "o" && grid[8] === "o")
        ||
        (grid[0] === "o" && grid[3] === "o" && grid[6] === "o")
        ||
        (grid[1] === "o" && grid[4] === "o" && grid[7] === "o")
        ||
        (grid[2] === "o" && grid[5] === "o" && grid[8] === "o")
        ||
        (grid[0] === "o" && grid[4] === "o" && grid[8] === "o")
        ||
        (grid[2] === "o" && grid[4] === "o" && grid[6] === "o")
    )
    {
        scoreO++;
        isGameOver = true;
        oWin();
    }
    if(isDraw() && isGameOver === false)
    {
        isGameOver = true;
        drawFun();
    }
}

function isDraw()
{
    for(let i = 0; i < grid.length; i++)
    {
        if(grid[i] === "") return 0;
    }
    return 1;
}

function display()
{
    for(let i = 0; i < grid.length; i++)
    {
        boxes[i].textContent = `${grid[i]}`;
    }
    
    xScore.textContent = `X: ${scoreX}`;
    oScore.textContent = `O: ${scoreO}`;

    if(isSign === true) turn.textContent = `TURN: X`;
    else turn.textContent = `TURN: O`;
}


function main(e)
{
    if(isGameOver === false)
    {
        sign(e);
        gameBrain();
        display();
    }
}