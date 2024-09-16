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

const testArray = [
  [0, 0, 1, "X", 2, "X", 1, 0, 0],
  [0, 1, 2, 2, 2, 1, 1, 0, 0],
  [0, 1, "X", 1, 0, 0, 0, 0, 0],
  [0, 2, 3, 3, 1, 1, 1, 1, 0],
  [0, 1, "X", "X", 2, 2, "X", 2, 1],
  [0, 1, 2, 3, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

// openSpace : 이미 열린 칸 표시 (1: 열렸음을 표시)
// blanks : 3x3 크기를 확인했을 때 나오는 빈 칸의 위치를 넣는다.
const openSpace = Array.from(new Array(9), () => new Array(9).fill(0));
const blanks = [];

// 지뢰: X, 나머지: 0,1,2,3
// 빈 칸을 선택했을 경우 실행할 함수
function openBoard(row, col) {
  openSpace[row][col] = 1;

  for (let i = row - 1; i <= row + 1; i++) {
    if (i >= 0 && i < 9) {
      for (let j = col - 1; j <= col + 1; j++) {
        if (!(i === row && j === col) && j >= 0 && j < 9 && openSpace[i][j] === 0) {
          console.log(`화면에 표시 row: ${i}, col: ${j}, value: ${testArray[i][j]}`);
          openSpace[i][j] = 1;

          if (testArray[i][j] === 0) {
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

openBoard(0, 8);