const gameBoard = document.querySelector(".game-board");
export const WIDTH_SPACE = 9;
const HEIGHT_SPACE = 9;
export const countMine = 10;
export const landmineLocation = {};
export const gameMap = Array.from(Array(9), () => Array(9).fill(null));


export const renderBoard = function () {
  for (let row = 0; row < HEIGHT_SPACE; row++) {
    for (let column = 0; column < WIDTH_SPACE; column++) {
      const space = document.createElement("div");

      space.classList.add("item");
      space.dataset.row = row;
      space.dataset.column = column;

      gameBoard.appendChild(space);
    }
  }
};

export const setGame = function () {
  while (Object.keys(landmineLocation).length < countMine) {
    const randomArray = Array.from(new Array(2), () =>
      Math.floor(Math.random() * 9)
    );

    if (!landmineLocation.hasOwnProperty(randomArray)) {
      landmineLocation[randomArray] = 4;

      const [randomRow, randomColumn] = randomArray;
      gameMap[randomRow][randomColumn] = 4;
    }
  }

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      setNumber(i, j);
    }
  }
};

export const setNumber = function (row, column) {
  let count = 0;

  if (gameMap[row][column] === 4) {
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
        if (gameMap[row + i][column + j] === 4) {
          count++;
        }
      }
    }
  }
  gameMap[row][column] = count;
};
