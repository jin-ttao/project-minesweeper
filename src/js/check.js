import { renderBoard } from "./app.js";



renderBoard();

const openSpace = Array.from(new Array(9), () => new Array(9).fill(0));
const blanks = [];
const item = document.querySelectorAll(".item");
const resetButton = document.querySelector(".reset-button");
const gameBoard = Array.from(Array(9), () => Array(9).fill(null));
const landmineLocation = {};

item.forEach((item) => {
  item.addEventListener("click", (event) => {
    // checkItemValue(event);
    console.log(item);
  });
});
resetButton.addEventListener("click", reset);

setGame();

function setGame() {
  while (Object.keys(landmineLocation).length < 10) {
    const randomArray = Array.from(new Array(2), () =>
      Math.floor(Math.random() * 9)
    );

    if (!landmineLocation.hasOwnProperty(randomArray)) {
      landmineLocation[randomArray] = 4;

      const [randomRow, randomColumn] = randomArray;
      gameBoard[randomRow][randomColumn] = 4;
    }
  }

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      setNumber(i, j);
    }
  }
  console.log("f", gameBoard);
}

function setNumber(row, column) {
  let count = 0;

  if (gameBoard[row][column] === 4) {
    return;
  }
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (
        row + i >= 0 &&
        row + i <= 8 &&
        column + j >= 0 &&
        column + j <= 8 &&
        !(row + i === row && column + j === column)
      ) {
        if (gameBoard[row + i][column + j] === 4) {
          count++;
        }
      }
    }
  }
  gameBoard[row][column] = count;
}

function clickMine() {
  for (const key of Object.keys(landmineLocation)) {
    const [row, column] = key.split(",");

    item.forEach((target) => {
      if (target.dataset.row === row && target.dataset.column === column) {
        // target.style.backgroundColor = "green";
        target.classList.add("landmine");
      }
    });
  }
  document.querySelector(".game-board").classList.add("block-click");
  document.querySelector("#messageForUser").textContent = "게임 종료! 재시작 버튼을 눌러주세요";
}

function reset() {
  // setGame();
}

export function openBoard(row, col) {
  openSpace[row][col] = 1;

  for (let i = row - 1; i <= row + 1; i++) {
    if (i >= 0 && i < 9) {
      for (let j = col - 1; j <= col + 1; j++) {
        if (
          !(i === row && j === col) &&
          j >= 0 &&
          j < 9 &&
          openSpace[i][j] === 0
        ) {
          console.log(
            `화면에 표시 row: ${i}, col: ${j}, value: ${gameBoard[i][j]}`
          );
          openSpace[i][j] = 1;

          if (gameBoard[i][j] === 0) {
            blanks.push(i, j);
          }
        }
      }
    }
  }

  if (blanks.length > 0) {
    const blanksRow = blanks.shift();
    const blanksColumn = blanks.shift();

    openBoard(blanksRow, blanksColumn);
  } else {
    return console.log("끝");
  }
}
