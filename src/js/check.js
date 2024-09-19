// import {renderBoard} from './app.js'

const item = document.querySelectorAll(".item");
const itemArrForTest = [
  [0,0,1,4,2,4,1,0,0],
  [0,1,2,2,2,1,1,0,0],
  [0,1,4,1,0,0,0,0,0],
  [0,2,3,3,1,1,1,1,0],
  [1,1,1,0,0,0,0,0,0],
  [1,4,1,0,0,0,0,0,0],
  [1,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
]
const resolvedItem = Array.from(new Array(9), () => new Array(9).fill(false));
const blanksAfterClickBlank = [];
// const imgFlag = 
const flagRecord = {};

const checkItemValue = function (row, column) {
  if (itemArrForTest[row][column] === 4) {
    console.log('지뢰 클릭, 게임 끝!');
    return;
  }
  
  if (itemArrForTest[row][column] > 0 && itemArrForTest[row][column] < 4) {
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
};

const confirmResolution = function (row, column) {
  const WIDTH_SPACE = 9; // import 해결 필요
  const index = row * WIDTH_SPACE + Number(column);
  
  item[index].classList.add("resolved-item");
  resolvedItem[row][column] = true;

  if (itemArrForTest[row][column] !== 0) {
    item[index].textContent = itemArrForTest[row][column];
  }
};

const setFlag = function (row, column) {
  const WIDTH_SPACE = 9; // import 해결 필요
  const index = row * WIDTH_SPACE + Number(column);
  console.log("부모", item[index]);
  const imageExisted = item[index].querySelector("img-flag"); // 선택을 못해옴.
  console.log("자식", imageExisted);

  if (imageExisted) {
    console.log("지우자");
    imageExisted.remove();
    return;
  }

  const imgElementNew = new Image();

  imgElementNew.classList.add("img-flag");
  imgElementNew.src = 'src/img/flag.svg';

  item[index].appendChild(imgElementNew);
  // 좌클릭 불가
  // 우클릭 2번 하면 풀어주기
  // 깃발 숫자 카운트
  // 아이디어: 토글
};
 
item.forEach((element) => {
  element.addEventListener("mousedown", (event) => {
    console.log(event.button);
    console.log("좌클릭");

    const rowItemClicked = event.target.dataset.row;
    const columnItemClicked = event.target.dataset.column;
    // checkItemValue(rowItemClicked, columnItemClicked);
    setFlag(rowItemClicked, columnItemClicked);
    // if (event.button === 2) {
    //   console.log("우클릭");
    //   return;
    // }
  })
});
