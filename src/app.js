const itemArr = [];

function renderBoard() {
  const gameBoard = document.querySelector(".game-board");
  const WIDTHSPACE = 9;
  const HEIGHTSPACE = 9;

  for (let row = 0; row < HEIGHTSPACE; row++) {
    for (let column = 0; column < WIDTHSPACE; column++) {
      const space = document.createElement("div");

      space.classList.add("item");
      space.dataset.row = row;
      space.dataset.column = column;

      gameBoard.appendChild(space);
    }
  }
}

renderBoard();

// 클릭한 칸 검사 > 지뢰 or 비지뢰
function checkItemValue(event) {
  const itemRow = event.target.dataset.row;
  const itemColumn = event.target.dataset.column;

  /*
  if (배열[itemRow][itemColumn] === 지뢰) {
    // 게임 종료
    console.log("지뢰 클릭, 게임 끝!");
  }
  
  if (배열[itemRow][itemColumn] === 숫자) {
    // 숫자 통과 시켜 주기
    
  }

  // 클릭 칸이 0인 경우
  argsArr.push([itemRow, itemColumn]); // [[1, 2], [2, 3]]
  checkItemBlank(argsArr);
  */
}

// 클릭한 칸 빈칸이면, -- 탐색 알고리즘
function checkItemBlank(array) {
  array.forEach(element => {
    const row = element[0][0];
    const column = element[0][1];
    const itemValue = itemArr[row][column];

    resovledArr.push([row, column]);

    if (itemValue === 0) { 
      checkItemBlank(getAroundIndex(row, column));
    }
  });
}

function getAroundIndex(row, column) {
  // 끄트머리(음수이거나 10) 케이스 제거.
  const aroundIndex = [];
  const aboveRow = row - 1;
  const preColumn = column - 1;
  const belowRow = row + 1;
  const nextColumn = column + 1;

  aroundIndex.push([aboveRow, preColumn], [aboveRow, column], [aboveRow, nextColumn]);
  aroundIndex.push([row, preColumn], [row, nextColumn]);
  aroundIndex.push([belowRow, preColumn], [belowRow, column], [belowRow, nextColumn]);

  return aroundIndex;
}

const resovledArr = []; // map, set 객체 활용 필요 체크
const item = document.querySelector(".item");
item.addEventListener("click", (event) => checkItemValue(event));