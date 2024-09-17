const WIDTH_SPACE = 9;
const HEIGHT_SPACE = 9;
const shownCells = Array.from(Array(HEIGHT_SPACE), () => Array(WIDTH_SPACE).fill(false));
const map = Array.from(Array(HEIGHT_SPACE), () => Array(WIDTH_SPACE).fill(null));

function searchBlank(startPosition) {
  const stack = [startPosition];
  const [startRow, startColumn] = startPosition;
  shownCells[startRow][startColumn] = true;
  openCell(startRow, startColumn);
  
  while (stack.length) {
    const [row, column] = stack.pop()

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const [sideRow, sideColumn] = [i + row, j + column];
        
        if (shownCells[sideRow][sideColumn] === false) {
          shownCells[sideRow][sideColumn] = true;
          openCell(sideRow, sideColumn);

          if (map[sideRow][sideColumn] === 0) {
            stack.push((sideRow, sideColumn));
          }
        }
      }
    }
  }
}

function openCell(row, column) {
  //해당칸 공개
}
