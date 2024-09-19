import { renderBoard, setGame, landmineLocation, gameMap } from "./app.js";
renderBoard();
setGame();

const item = document.querySelectorAll(".item");
const resetButton = document.querySelector(".reset-button");
const resolvedItem = Array.from(new Array(9), () => new Array(9).fill(false));
const blanksAfterClickBlank = [];


const clickMine = function () {
  for (const key of Object.keys(landmineLocation)) {
    const [row, column] = key.split(",");

    item.forEach((target) => {
      if (target.dataset.row === row && target.dataset.column === column) {
        target.classList.add("landmine");
      }
    });
  }
  document.querySelector(".game-board").classList.add("block-click");
  document.querySelector("#messageForUser").textContent = "게임 종료! 재시작 버튼을 눌러주세요";
  resetButton.classList.add("lose-game");
}

const reset = function () {
  item.forEach((element) => {
    element.classList.remove("resolved-item", "landmine");
    element.textContent = "";
  });
  resetButton.classList.remove("lose-game");
  document.querySelector(".game-board").classList.remove("block-click");
  document.querySelector("#messageForUser").textContent = "";

  Object.keys(landmineLocation).forEach((key) => delete landmineLocation[key]);
  gameMap.forEach((array) => array.fill(null));
  resolvedItem.forEach((array) => array.fill(false));
  setGame();
}


// import {renderBoard} from './app.js'
// const imgFlag = 
const flagRecord = {};

const checkItemValue = function (row, column) {
  if (gameMap[row][column] === 4) {
    clickMine();
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
  }
  return;
};

const confirmResolution = function (row, column) {
  const WIDTH_SPACE = 9; // import 해결 필요
  const index = row * WIDTH_SPACE + Number(column);

  item[index].classList.add("resolved-item");
  resolvedItem[row][column] = true;

  if (gameMap[row][column] !== 0) {
    item[index].textContent = gameMap[row][column];
  }

  const count = resolvedItem.reduce((falseCount, array) => {
    return falseCount + array.filter((element) => element === false).length;
  }, 0);
  if (count === 10) {
    document.querySelector(".game-board").classList.add("block-click");
    document.querySelector("#messageForUser").textContent = "게임 종료! 승리하였습니다. 재시작 버튼을 눌러주세요";
    return;
  }
};

const setFlag = function (row, column) {
  const WIDTH_SPACE = 9; // import 해결 필요
  const index = row * WIDTH_SPACE + Number(column);
  const imgElement = new Image();

  imgElement.classList.add("img-flag");
  imgElement.src = 'src/img/flag.svg';

  item[index].appendChild(imgElement);
  // 좌클릭 불가
  // 우클릭 2번 하면 풀어주기
  // 깃발 숫자 카운트
  // 아이디어: 토글
};

item.forEach((element) => {
  element.addEventListener("mousedown", (event) => {
    // console.log(event.button);
    // console.log("좌클릭");

    const rowItemClicked = event.target.dataset.row;
    const columnItemClicked = event.target.dataset.column;
    checkItemValue(parseInt(rowItemClicked), parseInt(columnItemClicked));
    // setFlag(rowItemClicked, columnItemClicked);
    // if (event.button === 2) {
    //   console.log("우클릭");
    //   return;
    // }
  });
});

resetButton.addEventListener("click", reset);
