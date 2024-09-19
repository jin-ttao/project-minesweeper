import { renderBoard, setGame, setNumber, landmineLocation, gameMap } from "./app.js";
renderBoard();
setGame();

const item = document.querySelectorAll(".item");
const resetButton = document.querySelector(".reset-button");
const panelCountFlag = document.querySelector("#panelCountFlag");
const resolvedItem = Array.from(new Array(9), () => new Array(9).fill(false));
const blanksAfterClickBlank = [];
let countFlags = 10;

panelCountFlag.textContent = countFlags;

const clickMine = function (rowClicked, columnClicked) {
  const WIDTH_SPACE = 9; // import 해결 필요
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
  document.querySelector("#messageForUser").textContent = "게임 종료! 재시작 버튼을 눌러주세요";
}

const reset = function () {

};

const checkItemValue = function (row, column) {
  if (gameMap[row][column] === 4) {
    clickMine(row, column);
    console.log('지뢰 클릭, 게임 끝!');
    return;
  }

  if (gameMap[row][column] > 0 && gameMap[row][column] < 4) {
    console.log('숫자 클릭');
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
  } else {
    return console.log("끝");
  }
};

const confirmResolution = function (row, column) {
  const WIDTH_SPACE = 9; // import 해결 필요
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
    const WIDTH_SPACE = 9; // import 해결 필요
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
