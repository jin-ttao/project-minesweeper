import { renderBoard, setGame, setNumber, landmineLocation, gameMap } from "./app.js";
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
}

const reset = function () {

}


// import {renderBoard} from './app.js'

// const gameBoard = [
//   [0,0,1,4,2,4,1,0,0],
//   [0,1,2,2,2,1,1,0,0],
//   [0,1,4,1,0,0,0,0,0],
//   [0,2,3,3,1,1,1,1,0],
//   [1,1,1,0,0,0,0,0,0],
//   [1,4,1,0,0,0,0,0,0],
//   [1,1,1,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0],
// ]
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
  } else {
    return console.log("끝");
  }
};

const confirmResolution = function (row, column) {
  const WIDTH_SPACE = 9; // import 해결 필요
  const index = row * WIDTH_SPACE + Number(column);

  item[index].classList.add("resolved-item");
  resolvedItem[row][column] = true;

  if (gameMap[row][column] !== 0) {
    item[index].textContent = gameMap[row][column];
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
