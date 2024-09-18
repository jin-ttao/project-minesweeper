const openSpace = Array.from(new Array(9), () => new Array(9).fill(0));
const blanks = [];

function openBoard(row, col) {
  openSpace[row][col] = 1;

  for (let i = row - 1; i <= row + 1; i++) {
    if (i >= 0 && i < 9) {
      for (let j = col - 1; j <= col + 1; j++) {
        if (
          !(i === row && j === col) &&
          j >= 0 &&
          j < 9 &&
          openSpace[i][j] === 0
        ) {
          console.log(
            `화면에 표시 row: ${i}, col: ${j}, value: ${testArray[i][j]}`
          );
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
