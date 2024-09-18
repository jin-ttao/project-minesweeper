// import {renderBoard} from './app.js'

const itemArrForTest = [
  [0,0,1,4,2,4,1,0,0],
  [0,1,2,2,2,1,1,0,0],
  [0,1,4,1,0,0,0,0,0],
  [0,2,3,3,1,1,1,1,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
]
const resolvedItem = Array.from(new Array(9), () => new Array(9).fill(false));
const blanksAfterClickBlank = [];

function checkItemValue(event) {
  const rowItemClicked = event.target.dataset.row;
  const columnItemClicked = event.target.dataset.column;

  if (itemArrForTest[rowItemClicked][columnItemClicked] === 4) {
    console.log('지뢰 클릭, 게임 끝!');
    return;
  }
  
  if (itemArrForTest[rowItemClicked][columnItemClicked] > 0 && itemArrForTest[rowItemClicked][columnItemClicked] < 4) {
    console.log('숫자 클릭');
    confirmResolution(rowItemClicked, columnItemClicked);
    return;
  }

  resolveItemBlank(rowItemClicked, columnItemClicked);
}

function resolveItemBlank(row, column) {
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
          console.log(`화면에 표시 row: ${i}, col: ${j}, value: ${itemArrForTest[i][j]}`);
          confirmResolution(i, j);

          if (itemArrForTest[i][j] === 0) {
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
}

function confirmResolution(row, column) {
  const WIDTH_SPACE = 9; // import 해결 필요
  const index = row * WIDTH_SPACE + Number(column);
  const item = document.querySelectorAll(".item")[index];

  item.classList.add("resolved-item");
  resolvedItem[row][column] = true;

  if (itemArrForTest[row][column] !== 0) {
    item.textContent = itemArrForTest[row][column];
  }
}

const item = document.querySelectorAll(".item");
item.forEach((item) => {
  item.addEventListener("click", (event) => {
    checkItemValue(event);
  })
});
