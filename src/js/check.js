import { renderBoard, setGame, landmineLocation, gameMap } from "./app.js";
renderBoard();
setGame();

const WIDTH_SPACE = 9;
const item = document.querySelectorAll(".item");
const resetButton = document.querySelector(".reset-button");
const panelCountFlag = document.querySelector("#panelCountFlag");
const resolvedItem = Array.from(new Array(9), () => new Array(9).fill(false));
const blanksAfterClickBlank = [];
let countFlags = 10;

panelCountFlag.textContent = countFlags;

const clickMine = function (rowClicked, columnClicked) {
  const index = (rowClicked * WIDTH_SPACE) + columnClicked;

  for (const key of Object.keys(landmineLocation)) {
    const [row, column] = key.split(",");

    item.forEach((element) => {
      if (element.dataset.row === row && element.dataset.column === column) {
        const flagExisted = element.querySelector(".img-flag");

        if (!flagExisted) {
          element.classList.add("landmine");
        }

        if (flagExisted) {
          element.classList.add("landmine-with-flag");
        }
      }
    });
  }

  item[index].classList.add("mine-clicked");
  document.querySelector(".game-board").classList.add("block-click");
  document.querySelector("#messageForUser").textContent = "🫠 아쉽군요! 위 가운데 버튼을 눌러 다시 시작해보세요!";
  resetButton.classList.add("lose-game");
}

const reset = function () {
  item.forEach((element) => {
    element.classList.remove("resolved-item", "landmine", "landmine-with-flag", "mine-clicked");
    element.textContent = "";
  });

  resetButton.classList.remove("lose-game");

  document.querySelector(".game-board").classList.remove("block-click");
  document.querySelector("#messageForUser").textContent = "";

  Object.keys(landmineLocation).forEach((key) => delete landmineLocation[key]);
  gameMap.forEach((array) => array.fill(null));
  resolvedItem.forEach((array) => array.fill(false));

  countFlags = 10;
  panelCountFlag.textContent = countFlags;

  setGame();
};

const checkItemValue = function (row, column) {
  if (gameMap[row][column] === 4) {
    clickMine(row, column);
    return;
  }

  if (gameMap[row][column] > 0 && gameMap[row][column] < 4) {
    confirmResolution(row, column);
    return;
  }

  resolveItemBlank(row, column);
};

const resolveItemBlank = function (row, column) {
  const aboveRow = row - 1;
  const belowRow = row + 1;
  const preColumn = column - 1;
  const nextColumn = column + 1;

  confirmResolution(row, column);

  for (let i = aboveRow; i <= belowRow; i++) {
    const isInRangeRow = i >= 0 && i < 9;

    if (isInRangeRow) {
      for (let j = preColumn; j <= nextColumn; j++) {
        const isInRangeColumn = j >= 0 && j < 9;

        if (isInRangeColumn && !(i === row && j === column) && (resolvedItem[i][j] === false)) {
          confirmResolution(i, j);

          if (gameMap[i][j] === 0) {
            blanksAfterClickBlank.push(i, j);
          }
        }
      }
    }
  }

  if (blanksAfterClickBlank.length > 0) {
    const blankRow = blanksAfterClickBlank.shift();
    const blankColumn = blanksAfterClickBlank.shift();

    resolveItemBlank(blankRow, blankColumn);
  }
  return;
};

const confirmResolution = function (row, column) {
  const index = (row * WIDTH_SPACE) + column;
  const flagExisted = item[index].querySelector(".img-flag");

  item[index].classList.add("resolved-item");
  resolvedItem[row][column] = true;

  if (flagExisted) {
    countFlags++;
    flagExisted.remove();
    panelCountFlag.textContent = countFlags; 
  }

  if (gameMap[row][column] !== 0) {
    item[index].textContent = gameMap[row][column];
  }
};

const setFlag = function (index, flagExisted) {
  if (flagExisted) {
    countFlags++;
    flagExisted.remove();
    panelCountFlag.textContent = countFlags;
    return;
  }

  const imgElementNew = new Image();

  countFlags--;
  panelCountFlag.textContent = countFlags;
  imgElementNew.classList.add("img-flag");
  imgElementNew.src = 'src/img/flag.svg';
  item[index].appendChild(imgElementNew);
};

item.forEach((element) => {
  element.addEventListener("mousedown", (event) => {
    const rowItemClicked = parseInt(event.currentTarget.dataset.row);
    const columnItemClicked = parseInt(event.currentTarget.dataset.column);
    const indexElementCliked = (rowItemClicked * WIDTH_SPACE) + columnItemClicked;
    const flagExisted = item[indexElementCliked].querySelector(".img-flag");

    if (event.button === 0 && flagExisted === null) {
      checkItemValue(rowItemClicked, columnItemClicked);
      return;
    }

    if (event.button === 2) {
      setFlag(indexElementCliked, flagExisted);
      return;
    }
  });
});

item.forEach((element) => {
  element.addEventListener("contextmenu", (event) => event.preventDefault());
});

resetButton.addEventListener("click", reset);
