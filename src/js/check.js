// test 용
const itemArr = [
  [0, 0, 0, 0, 1, 4, 2, 4, 1],
  [0, 0, 2, 1, 2, 1, 3, 2, 2],
  [0, 0, 2, 4, 2, 0, 1, 4, 1],
  [0, 0, 2, 4, 2, 0, 1, 1, 1],
  [1, 1, 2, 1, 1, 0, 0, 0, 0],
  [1, 4, 2, 1, 1, 0, 0, 0, 0],
  [2, 2, 2, 4, 1, 1, 1, 1, 0],
  [4, 1, 2, 2, 1, 1, 4, 1, 0],
  [1, 1, 1, 4, 1, 1, 1, 1, 0]
];

const resovledSet = new Set();

function checkItemValue(event) {
  const rowItemClicked = event.target.dataset.row;
  const columnItemClicked = event.target.dataset.column;
  console.log(rowItemClicked);
  console.log(columnItemClicked);
  console.log("클릭 칸의 row, column", itemArr[rowItemClicked][columnItemClicked]);

  if (itemArr[rowItemClicked][columnItemClicked] === 4) {
    console.log('지뢰 클릭, 게임 끝!');
  }
  
  if (itemArr[rowItemClicked][columnItemClicked] !== 4 && itemArr[rowItemClicked][columnItemClicked] !== 0) {
    console.log('숫자 클릭');
    resovledSet.add([row, column]);
  }
  const arg = [rowItemClicked, columnItemClicked].map(Number);
  checkItemBlank([arg]);
}

function checkItemBlank(arrayToCheck) {
  // 언제 멈출지 구체화
  if (arrayToCheck.length === 0) {
    return;
  }

  arrayToCheck.forEach(element => {
    const row = element[0];
    const column = element[1];

    resovledSet.add([row, column]);
    console.log('resovledSet', resovledSet);

    if (itemArr[row][column] === 0) {
      const aroundIndexArr = getAroundIndex(row, column);

      checkItemBlank(aroundIndexArr);
    }
  });
}

function getAroundIndex(row, column) {
  // 8방 중 인자로 get 하지 않을 것: 이미 돈 곳, 끄트머리(0 보다 작거나 9+1 보다 클 때) 케이스 제거.
  const aboveRow = row - 1;
  const belowRow = row + 1;
  const preColumn = column - 1;
  const nextColumn = column + 1;
  let aroundIndex = [[aboveRow, preColumn], [aboveRow, column], [aboveRow, nextColumn], [row, preColumn], [row, nextColumn], [belowRow, preColumn], [belowRow, column], [belowRow, nextColumn]];
  let aroundSet = new Set();

  aroundIndex.forEach((el) => {
    aroundSet.add(el);
  });
  aroundSet = aroundSet.difference(resovledSet);

  const aroundIndexArr = Array.from(aroundSet).filter((el) => {
    return 0 <= el[0] && el[0] <= 8 && 0 <= el[1] && el[1] <= 8
  });
  console.log("주변 index", aroundIndexArr);

  return aroundIndexArr;
}

const item = document.querySelectorAll(".item");
item.forEach((item) => {
  item.addEventListener("click", (event) => {
    console.log(event);
    checkItemValue(event);
  })
});
