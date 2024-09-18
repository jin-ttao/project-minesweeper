export function renderBoard() {
  const gameBoard = document.querySelector(".game-board");
  const WIDTH_SPACE = 9;
  const HEIGHT_SPACE = 9;

  for (let row = 0; row < HEIGHT_SPACE; row++) {
    for (let column = 0; column < WIDTH_SPACE; column++) {
      const space = document.createElement("div");

      space.classList.add("item");
      space.dataset.row = row;
      space.dataset.column = column;

      gameBoard.appendChild(space);
    }
  }
}

renderBoard();
